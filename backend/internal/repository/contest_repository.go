package repository

import (
	"a2sv_hub/config"
	"a2sv_hub/internal/models"
	"crypto/sha512"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"net/url"
	"sort"
	"strconv"
	"strings"
	"time"
)

type CodeforcesRepository interface {
	GetStandings(contestID int, asManager bool) (*models.StandingsResponse, error)
	GetSubmissions(contestID int, asManager bool, from, count int) (*models.StatusResponse, error)
	AddContest(contestName, contestLink string) (int, error)
	GetContestFromDB(contestID int) (*models.Contest, error)
	GetProblemsFromDB(contestID int) ([]models.Problem, error)
	GetAllContests() ([]models.Contest, error)
	GetUserContestProblems(userID int) (map[string][]models.ContestProblem, error)
}

type codeforcesRepository struct {
	config config.Config
	db     *sql.DB
}

func NewCodeforcesRepository(cfg config.Config, db *sql.DB) CodeforcesRepository {
	return &codeforcesRepository{config: cfg, db: db}
}

func (r *codeforcesRepository) generateSignature(method string, params map[string]string) string {
	rand.Seed(time.Now().UnixNano())
	randNum := fmt.Sprintf("%06d", rand.Intn(1000000))
	params["apiKey"] = r.config.APIKey
	params["time"] = fmt.Sprintf("%d", time.Now().Unix())

	var keys []string
	for k := range params {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	query := method + "?"
	for i, k := range keys {
		if i > 0 {
			query += "&"
		}
		query += fmt.Sprintf("%s=%s", k, url.QueryEscape(params[k]))
	}
	query += "#" + r.config.APISecret

	hash := sha512.Sum512([]byte(randNum + "/" + query))
	return randNum + hex.EncodeToString(hash[:])
}

func (r *codeforcesRepository) GetStandings(contestID int, asManager bool) (*models.StandingsResponse, error) {
	params := map[string]string{
		"contestId": fmt.Sprintf("%d", contestID),
		"asManager": fmt.Sprintf("%t", asManager),
	}
	signature := r.generateSignature("contest.standings", params)
	params["apiSig"] = signature

	baseURL := "https://codeforces.com/api/contest.standings"
	reqURL, _ := url.Parse(baseURL)
	query := reqURL.Query()
	for k, v := range params {
		query.Set(k, v)
	}
	reqURL.RawQuery = query.Encode()

	resp, err := http.Get(reqURL.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var standings models.StandingsResponse
	err = json.Unmarshal(body, &standings)
	if err != nil {
		return nil, err
	}
	return &standings, nil
}

func (r *codeforcesRepository) GetSubmissions(contestID int, asManager bool, from, count int) (*models.StatusResponse, error) {
	params := map[string]string{
		"contestId": fmt.Sprintf("%d", contestID),
		"asManager": fmt.Sprintf("%t", asManager),
		"from":      fmt.Sprintf("%d", from),
		"count":     fmt.Sprintf("%d", count),
	}
	signature := r.generateSignature("contest.status", params)
	params["apiSig"] = signature

	baseURL := "https://codeforces.com/api/contest.status"
	reqURL, _ := url.Parse(baseURL)
	query := reqURL.Query()
	for k, v := range params {
		query.Set(k, v)
	}
	reqURL.RawQuery = query.Encode()

	resp, err := http.Get(reqURL.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var status models.StatusResponse
	err = json.Unmarshal(body, &status)
	if err != nil {
		return nil, err
	}
	return &status, nil
}

func (r *codeforcesRepository) saveSubmissions(contestID int, problems []models.ContestProblem) error {
	// Fetch all group members' Codeforces handles
	rows, err := r.db.Query(`
        SELECT u.id, u.codeforces
        FROM users u
        JOIN groups g ON u.group_id = g.id
        WHERE u.codeforces IS NOT NULL
    `)
	if err != nil {
		return fmt.Errorf("failed to fetch users: %v", err)
	}
	defer rows.Close()

	userHandles := make(map[string]int)
	for rows.Next() {
		var userID int
		var handle string
		if err := rows.Scan(&userID, &handle); err != nil {
			return fmt.Errorf("failed to scan user: %v", err)
		}
		userHandles[strings.ToLower(handle)] = userID
	}

	problemMap := make(map[string]int)
	for _, p := range problems {
		if p.Index != nil {
			problemMap[*p.Index] = p.ID
		}
	}

	status, err := r.GetSubmissions(contestID, true, 1, 10000) // Adjust count as needed
	if err != nil {
		return fmt.Errorf("failed to fetch submissions: %v", err)
	}

	// Save accepted submissions
	for _, sub := range status.Result {
		if sub.Verdict != "OK" {
			continue
		}
		handle := strings.ToLower(sub.Author.Members[0].Handle)
		userID, exists := userHandles[handle]
		if !exists {
			continue // Skip users not in the database
		}
		problemID, exists := problemMap[sub.Problem.Index]
		if !exists {
			continue // Skip if problem not found
		}

		// Use gym format for submission link
		submissionLink := fmt.Sprintf("https://codeforces.com/gym/%d/submission/%d", contestID, sub.ID)
		_, err = r.db.Exec(`
            INSERT INTO contest_submissions (user_id, problem_id, contest_id, submission_id, verdict, submission_link, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (submission_id) DO NOTHING
        `, userID, problemID, contestID, sub.ID, sub.Verdict, submissionLink, time.Now(), time.Now())
		if err != nil {
			return fmt.Errorf("failed to save submission %d: %v", sub.ID, err)
		}
	}
	return nil
}

func (r *codeforcesRepository) AddContest(contestName, contestLink string) (int, error) {
	// Extract contest ID from link (e.g., "/gym/545013" -> 545013)
	parts := strings.Split(strings.TrimPrefix(contestLink, "/"), "/")
	if len(parts) < 2 || (parts[0] != "contest" && parts[0] != "gym") {
		return 0, fmt.Errorf("invalid contest link")
	}
	contestID, err := strconv.Atoi(parts[1])
	if err != nil {
		return 0, fmt.Errorf("invalid contest ID in link")
	}

	standings, err := r.GetStandings(contestID, true)
	if err != nil {
		return 0, fmt.Errorf("failed to fetch contest data: %v", err)
	}

	dbContest := models.Contest{
		ID:           contestID,
		Name:         contestName,
		Link:         contestLink,
		ProblemCount: len(standings.Result.Problems),
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
		Unrated:      standings.Result.Contest.Type == "IOI",
		Type:         standings.Result.Contest.Type,
		Link2:        nil,
		Link3:        nil,
	}

	_, err = r.db.Exec(`
        INSERT INTO contests (id, name, link, problem_count, created_at, updated_at, unrated, type, link2, link3)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO UPDATE
        SET name = $2, link = $3, problem_count = $4, updated_at = $6, unrated = $7, type = $8, link2 = $9, link3 = $10
    `, dbContest.ID, dbContest.Name, dbContest.Link, dbContest.ProblemCount, dbContest.CreatedAt, dbContest.UpdatedAt, dbContest.Unrated, dbContest.Type, dbContest.Link2, dbContest.Link3)
	if err != nil {
		return 0, fmt.Errorf("failed to save contest: %v", err)
	}

	// Save problems to database
	var savedProblems []models.ContestProblem
	for _, apiProblem := range standings.Result.Problems {
		problemLink := fmt.Sprintf("https://codeforces.com/gym/%d/problem/%s", contestID, apiProblem.Index)
		dbProblem := models.ContestProblem{
			ContestID:   &contestID,
			TrackID:     nil,
			Name:        apiProblem.Name,
			Difficulty:  "Unknown", // No Points field
			Tags:        apiProblem.Tag,
			Platform:    "Codeforces",
			Link:        problemLink,
			Index:       apiProblem.Index,
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
			UsersSolved: []models.UserSolved{},
		}

		var problemID int
		err = r.db.QueryRow(`
            INSERT INTO problems (contest_id, track_id, name, difficulty, tag, platform, link, index, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (contest_id, name) DO UPDATE
            SET difficulty = $4, tag = $5, platform = $6, link = $7, index = $8, updated_at = $10
            RETURNING id
        `, dbProblem.ContestID, dbProblem.TrackID, dbProblem.Name, dbProblem.Difficulty, strings.Join(dbProblem.Tags, ","), dbProblem.Platform, dbProblem.Link, dbProblem.Index, dbProblem.CreatedAt, dbProblem.UpdatedAt).Scan(&problemID)
		if err != nil {
			return contestID, fmt.Errorf("failed to save problem %s: %v", dbProblem.Name, err)
		}
		dbProblem.ID = problemID
		savedProblems = append(savedProblems, dbProblem)
	}

	// Save submissions
	if err := r.saveSubmissions(contestID, savedProblems); err != nil {
		return contestID, fmt.Errorf("failed to save submissions: %v", err)
	}

	return contestID, nil
}

func (r *codeforcesRepository) GetContestFromDB(contestID int) (*models.Contest, error) {
	var contest models.Contest
	err := r.db.QueryRow(`
        SELECT id, name, link, problem_count, created_at, updated_at, unrated, type, link2, link3
        FROM contests
        WHERE id = $1
    `, contestID).Scan(&contest.ID, &contest.Name, &contest.Link, &contest.ProblemCount, &contest.CreatedAt, &contest.UpdatedAt, &contest.Unrated, &contest.Type, &contest.Link2, &contest.Link3)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("contest not found")
	}
	if err != nil {
		return nil, fmt.Errorf("failed to fetch contest: %v", err)
	}
	return &contest, nil
}

func (r *codeforcesRepository) GetProblemsFromDB(contestID int) ([]models.Problem, error) {
	rows, err := r.db.Query(`
        SELECT id, contest_id, track_id, name, difficulty, tag, platform, link, index, created_at, updated_at
        FROM problems
        WHERE contest_id = $1
    `, contestID)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch problems: %v", err)
	}
	defer rows.Close()

	var problems []models.Problem
	for rows.Next() {
		var p models.Problem
		var tagString string
		err := rows.Scan(&p.ID, &p.ContestID, &p.TrackID, &p.Name, &p.Difficulty, &tagString, &p.Platform, &p.Link, &p.Index, &p.CreatedAt, &p.UpdatedAt)
		if err != nil {
			return nil, fmt.Errorf("failed to scan problem: %v", err)
		}
		if tagString != "" {
			p.Tag = strings.Split(tagString, ",")
		} else {
			p.Tag = []string{}
		}
		p.UsersSolved = []int{}
		problems = append(problems, p)
	}
	return problems, nil
}

func (r *codeforcesRepository) GetAllContests() ([]models.Contest, error) {
	rows, err := r.db.Query(`
        SELECT id, name, link, problem_count, created_at, updated_at, unrated, type, link2, link3
        FROM contests
        ORDER BY created_at DESC
    `)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch contests: %v", err)
	}
	defer rows.Close()

	var contests []models.Contest
	for rows.Next() {
		var c models.Contest
		err := rows.Scan(&c.ID, &c.Name, &c.Link, &c.ProblemCount, &c.CreatedAt, &c.UpdatedAt, &c.Unrated, &c.Type, &c.Link2, &c.Link3)
		if err != nil {
			return nil, fmt.Errorf("failed to scan contest: %v", err)
		}
		contests = append(contests, c)
	}
	return contests, nil
}

func (r *codeforcesRepository) GetUserContestProblems(userID int) (map[string][]models.ContestProblem, error) {

	var groupID int
	err := r.db.QueryRow(`
        SELECT group_id
        FROM users
        WHERE id = $1
    `, userID).Scan(&groupID)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("user not found")
	}
	if err != nil {
		return nil, fmt.Errorf("failed to fetch user group: %v", err)
	}

	contests, err := r.GetAllContests()
	if err != nil {
		return nil, fmt.Errorf("failed to fetch contests: %v", err)
	}

	result := make(map[string][]models.ContestProblem)

	for _, contest := range contests {

		rows, err := r.db.Query(`
            SELECT p.id, p.name, p.index, p.link,
                   cs.user_id, u.name as user_name, cs.submission_link
            FROM problems p
            LEFT JOIN contest_submissions cs ON p.id = cs.problem_id AND cs.contest_id = p.contest_id AND cs.verdict = 'OK'
            LEFT JOIN users u ON cs.user_id = u.id AND u.group_id = $2
            WHERE p.contest_id = $1
            ORDER BY p.index
        `, contest.ID, groupID)
		if err != nil {
			return nil, fmt.Errorf("failed to fetch problems for contest %d: %v", contest.ID, err)
		}
		defer rows.Close()

		problemMap := make(map[int]*models.ContestProblem)
		for rows.Next() {
			var pID int
			var pName string
			var pIndex sql.NullString
			var pLink string
			var userID sql.NullInt64
			var userName sql.NullString
			var submissionLink sql.NullString

			err := rows.Scan(&pID, &pName, &pIndex, &pLink, &userID, &userName, &submissionLink)
			if err != nil {
				return nil, fmt.Errorf("failed to scan problem: %v", err)
			}

			indexPtr := &pIndex.String
			if !pIndex.Valid {
				indexPtr = nil
			}

			if _, exists := problemMap[pID]; !exists {
				problemMap[pID] = &models.ContestProblem{
					ID:          pID,
					ContestID:   &contest.ID,
					Name:        pName,
					Index:       indexPtr,
					Link:        pLink,
					UsersSolved: []models.UserSolved{},
					CreatedAt:   time.Now(),
					UpdatedAt:   time.Now(),
					Platform:    "Codeforces",
					Difficulty:  "Unknown",
					Tags:        []string{},
				}
			}

			if userID.Valid && userName.Valid && submissionLink.Valid {
				problemMap[pID].UsersSolved = append(problemMap[pID].UsersSolved, models.UserSolved{
					UserID:         int(userID.Int64),
					UserName:       userName.String,
					SubmissionLink: submissionLink.String,
				})
			}
		}

		var problems []models.ContestProblem
		for _, p := range problemMap {
			problems = append(problems, *p)
		}

		result[contest.Name] = problems
	}

	return result, nil
}
