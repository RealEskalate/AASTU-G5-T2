package repository

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"strings"

	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
)

const leetcodeAPI = "https://leetcode.com/graphql"

type ProblemRepository interface {
	GetDailyProblem() (*models.DailyResponse, *errors.CustomError)
	GetAllProblems(page, limit int) ([]models.Problem, *errors.CustomError)
	AddProblem(problem models.Problem) *errors.CustomError
	AddProblemToTrack(problemID int, trackID string) *errors.CustomError
	GetProblemById(id int) (models.Problem, *errors.CustomError)
}

type problemRepository struct {
	db *sql.DB
}

// GetDailyProblem implements ProblemRepository.
func (r *problemRepository) GetDailyProblem() (*models.DailyResponse, *errors.CustomError) {
	query := models.Query{
		Query: `
          query questionOfToday {
            activeDailyCodingChallengeQuestion {
              date
              link
              question {
                title
                titleSlug
                difficulty
              }
            }
          }
        `,
		OperationName: "questionOfToday",
	}

	body, _ := json.Marshal(query)
	resp, err := http.Post(leetcodeAPI, "application/json", bytes.NewBuffer(body))
	if err != nil {
		return nil, &errors.CustomError{
			Message:    "failed to fetch daily problem",
			StatusCode: 500,
			Error:      err,
		}
	}
	defer resp.Body.Close()

	var result models.DailyResponse
	json.NewDecoder(resp.Body).Decode(&result)
	return &result, nil
}

func NewProblemRepository(db *sql.DB) ProblemRepository {
	return &problemRepository{
		db: db,
	}
}

func (r *problemRepository) GetAllProblems(page, limit int) ([]models.Problem, *errors.CustomError) {
	offset := (page - 1) * limit // calculate the offset

	query := `
		SELECT id, name, contest_id, platform, link, created_at, updated_at, tag, track_id, difficulty
		FROM problems
		ORDER BY created_at DESC
		OFFSET $1 LIMIT $2;
	`
	rows, err := r.db.Query(query, offset, limit)
	if err != nil {
		log.Println("Error querying problems:", err)
		return nil, &errors.CustomError{
			Message:    "failed to query problems from the database",
			StatusCode: 500,
			Error:      err,
		}
	}
	defer rows.Close()

	log.Println("Executing query with offset", offset, "and limit", limit)

	problems := make([]models.Problem, 0)

	for rows.Next() {
		var problem models.Problem
		var tagsStr string

		err := rows.Scan(
			&problem.ID,
			&problem.Name,
			&problem.ContestID,
			&problem.Platform,
			&problem.Link,
			&problem.CreatedAt,
			&problem.UpdatedAt,
			&tagsStr,
			&problem.TrackID,
			&problem.Difficulty,
		)
		if err != nil {
			log.Println("Error scanning row:", err)
			continue
		}

		// Split and clean tags
		tags := strings.Split(tagsStr, ",")
		for i := range tags {
			tags[i] = strings.TrimSpace(tags[i])
		}
		problem.Tag = tags

		problems = append(problems, problem)
	}

	return problems, nil
}

func (r *problemRepository) AddProblem(problem models.Problem) *errors.CustomError {
	query := `
		INSERT INTO problems (name, platform, link, tag, difficulty, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
	`

	tagsStr := strings.Join(problem.Tag, ",") // convert []string to comma-separated string

	_, err := r.db.Exec(query,
		problem.Name,
		problem.Platform,
		problem.Link,
		tagsStr,
		problem.Difficulty,
	)

	if err != nil {
		log.Println("Error inserting problem:", err)
		return &errors.CustomError{
			Message:    "failed to insert problem into the database",
			StatusCode: 500,
			Error:      err,
		}
	}

	return nil
}

func (r *problemRepository) AddProblemToTrack(problemID int, trackID string) *errors.CustomError {
	query := `
		UPDATE problems
		SET track_id = $1, updated_at = NOW()
		WHERE id = $2
	`

	_, err := r.db.Exec(query, trackID, problemID)
	if err != nil {
		log.Println("Error updating problem's track_id:", err)
		return &errors.CustomError{
			Message:    "failed to update problem's track",
			StatusCode: 500,
			Error:      err,
		}
	}

	return nil
}

// GetProblemById retrieves a problem from the database by its ID.
func (r *problemRepository) GetProblemById(id int) (models.Problem, *errors.CustomError) {
	var problem models.Problem
	var tagsStr string // To store the JSON representation of the tags

	query := `SELECT id, contest_id, track_id, name, difficulty, tag, platform, link, created_at, updated_at 
              FROM problems 
              WHERE id = $1`

	err := r.db.QueryRow(query, id).Scan(
		&problem.ID, &problem.ContestID, &problem.TrackID, &problem.Name,
		&problem.Difficulty, &tagsStr, &problem.Platform, &problem.Link,
		&problem.CreatedAt, &problem.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return models.Problem{}, &errors.CustomError{StatusCode: 404, Message: "Problem not found"}
		}
		return models.Problem{}, &errors.CustomError{StatusCode: 500, Message: "Failed to retrieve problem", Error: err} // Use 500 for DB errors
	}

	tags := strings.Split(tagsStr, ",")
	for i := range tags {
		tags[i] = strings.TrimSpace(tags[i])
	}
	problem.Tag = tags

	return problem, nil
}
