package repository

import (
	"a2sv_hub/internal/models"
	"database/sql"
	"fmt"
	"strings"

	"github.com/lib/pq"
)

type TrackRepository interface {
	GetTrackByID(trackID int) (*models.Track, error)
	CreateTrack(track *models.Track) error
	UpdateTrack(trackID int, updatedTrack *models.Track) error
	DeleteTrack(trackID int) error
	GetTrackProgressList(trackId, groupId int) ([]models.TrackProgress, error)
	GetProblemsByDay(trackId int) (map[string]models.DayGroup, error)
}

type trackRepository struct {
	db *sql.DB // Assuming you're using sql.DB for database connection
}

func NewTrackRepository(db *sql.DB) TrackRepository {
	return &trackRepository{db: db}
}

func (r *trackRepository) CreateTrack(track *models.Track) error {
	query := `INSERT INTO tracks (name, created_at, updated_at, active) 
			  VALUES ($1, NOW(), NOW(), $2) RETURNING id, created_at, updated_at`

	err := r.db.QueryRow(query, track.Name, track.Active).Scan(&track.ID, &track.CreatedAt, &track.UpdatedAt)
	if err != nil {
		return err
	}
	return nil
}

func (r *trackRepository) UpdateTrack(trackID int, updatedTrack *models.Track) error {
	query := `UPDATE tracks 
			  SET name = $1,updated_at = NOW(), active = $2 
			  WHERE id = $3`

	_, err := r.db.Exec(query, updatedTrack.Name, updatedTrack.Active, trackID)
	return err
}

func (r *trackRepository) DeleteTrack(trackID int) error {
	query := `DELETE FROM tracks WHERE id = $1`

	_, err := r.db.Exec(query, trackID)
	return err
}

func (r *trackRepository) GetTrackByID(trackID int) (*models.Track, error) {
	query := `SELECT id, name, created_at, updated_at, active 
			  FROM tracks WHERE id = $1`

	var track models.Track
	err := r.db.QueryRow(query, trackID).Scan(
		&track.ID,
		&track.Name,
		&track.CreatedAt,
		&track.UpdatedAt,
		&track.Active,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // or return a custom error like ErrNotFound
		}
		return nil, err
	}
	return &track, nil
}

func (r *trackRepository) GetTrackProgressList(trackId, groupId int) ([]models.TrackProgress, error) {
	query := `
WITH total_problems AS (
            SELECT COUNT(*) as total
            FROM problems
            WHERE track_id = $1
        ), solved_counts AS (
            SELECT 
                s.user_id, 
                COUNT(DISTINCT s.problem_id) as solved
            FROM submissions s
            INNER JOIN problems p ON p.id = s.problem_id
            WHERE p.track_id = $1 AND s.verified = true
            GROUP BY s.user_id
        )
        SELECT 
            u.id as user_id,
            u.name as name,  
            COALESCE(sc.solved, 0) as solved,
            tp.total as exercises,
            (tp.total - COALESCE(sc.solved, 0)) as available,
            ROUND(((COALESCE(sc.solved, 0)::float / NULLIF(tp.total, 0)) * 100)::numeric, 2) as completion
        FROM users u
        LEFT JOIN solved_counts sc ON u.id = sc.user_id,
        total_problems tp
        WHERE u.group_id = $2 
        ORDER BY u.id;
	`

	fmt.Printf("Executing query with trackId: %d, groupId: %d\n", trackId, groupId)
	rows, err := r.db.Query(query, trackId, groupId)
	fmt.Printf("rows: %+v\n", rows)
	fmt.Printf("errorows: %+v\n", err)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var progressList []models.TrackProgress
	fmt.Printf("Progressrepo: %+v\n", progressList)
	for rows.Next() {
		var progress models.TrackProgress
		err := rows.Scan(
			&progress.UserID,
			&progress.Name,
			&progress.Solved,
			&progress.Exercises,
			&progress.Available,
			&progress.Completion,
		)
		fmt.Printf("errorrepo: %+v\n", err)
		if err != nil {
			return nil, err
		}
		progressList = append(progressList, progress)
	}
	fmt.Printf("Progressrepo: %+v\n", progressList)
	fmt.Printf("Fetched progressList: %+v\n", progressList)
	return progressList, nil
}

func (r *trackRepository) GetProblemsByDay(trackId int) (map[string]models.DayGroup, error) {
	query := `SELECT p.id, p.name, p.difficulty, p.platform, p.tag, p.link, 
			p.created_at::date as day,
			ARRAY_REMOVE(ARRAY_AGG(DISTINCT s.user_id), NULL) as users_solved
		FROM problems p
		LEFT JOIN submissions s ON p.id = s.problem_id AND s.verified = true
		WHERE p.track_id = $1
		GROUP BY p.id, day
		ORDER BY day;
	`

	rows, err := r.db.Query(query, trackId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	dayMap := make(map[string]models.DayGroup)

	for rows.Next() {
		var prob models.Problem
		var day string
		var usersSolved pq.Int64Array
		var tagsString string // This will hold the comma-separated tags
		var platform string   // Assuming you want to keep this field

		// Scan the query results
		err := rows.Scan(
			&prob.ID,
			&prob.Name,
			&prob.Difficulty,
			&tagsString, // Scan the comma-separated tags
			&prob.Link,
			&platform,
			&day,
			&usersSolved,
		)
		if err != nil {
			return nil, err
		}

		// Split the comma-separated tags into a slice
		prob.Tag = splitTags(tagsString)

		// Convert usersSolved (pq.Int64Array) to []int
		prob.UsersSolved = make([]int, len(usersSolved))
		for i, id := range usersSolved {
			prob.UsersSolved[i] = int(id)
		}

		// If the dayMap doesn't contain the current day, initialize it
		if _, ok := dayMap[day]; !ok {
			dayMap[day] = models.DayGroup{
				Tags:     []string{},
				Problems: []models.Problem{},
			}
		}

		// Add tags if they don't already exist
		group := dayMap[day]
		for _, tag := range prob.Tag {
			if !contains(group.Tags, tag) {
				group.Tags = append(group.Tags, tag)
			}
		}

		// Add the problem to the list of problems for the day
		group.Problems = append(group.Problems, prob)
		dayMap[day] = group
	}

	return dayMap, nil
}

// Function to split a comma-separated string into a slice of tags
func splitTags(tagsString string) []string {
	// Trim spaces and split by comma
	tags := strings.Split(tagsString, ",")
	for i := range tags {
		tags[i] = strings.TrimSpace(tags[i]) // Remove any extra spaces around tags
	}
	return tags
}

// Utility function to check if a tag exists in the slice
func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}
