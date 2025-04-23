package repository

import (
	"database/sql"
	"log"

	"strings"

	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
)

type ProblemRepository interface {
	GetAllProblems() ([]models.Problem, *errors.CustomError)
	AddProblem(problem models.Problem) *errors.CustomError
	AddProblemToTrack(problemID int, trackID string) *errors.CustomError
}

type problemRepository struct {
	db *sql.DB
}

func NewProblemRepository(db *sql.DB) ProblemRepository {
	return &problemRepository{
		db: db,
	}
}

func (r *problemRepository) GetAllProblems() ([]models.Problem, *errors.CustomError) {
	query := `
		SELECT id, name,contest_id , platform, link, created_at, updated_at, tag, track_id, difficulty
		FROM problems;
	`
	rows, err := r.db.Query(query)
	if err != nil {
		log.Println("Error querying problems:", err)
		return nil, &errors.CustomError{
			Message:    "failed to query problems from the database",
			StatusCode: 500,
			Error:      err,
		}
	}
	defer rows.Close()

	log.Println("Executing query:", rows)
	var problems []models.Problem

	for rows.Next() {
		var problem models.Problem
		var tagsStr string // scan into a string, not []string

		err := rows.Scan(
			&problem.ID,
			&problem.Name,
			&problem.ContestID,
			&problem.Platform,
			&problem.Link,
			&problem.CreatedAt,
			&problem.UpdatedAt,
			&tagsStr, // receive the string directly
			&problem.TrackID,
			&problem.Difficulty,
		)
		if err != nil {
			log.Println("Error scanning row:", err)
			continue
		}

		// Split the tags by comma and trim spaces
		tags := strings.Split(tagsStr, ",")
		for i := range tags {
			tags[i] = strings.TrimSpace(tags[i])
		}
		problem.Tags = tags

		problems = append(problems, problem)
	}

	return problems, nil
}

   
func (r *problemRepository) AddProblem(problem models.Problem) *errors.CustomError {
	query := `
		INSERT INTO problems (name, contest_id, platform, link, created_at, updated_at, tag, track_id, difficulty)
		VALUES ($1, $2, $3, $4, NOW(), NOW(), $5, $6, $7)
	`

	tagsStr := strings.Join(problem.Tags, ",") // convert []string to comma-separated string

	_, err := r.db.Exec(query,
		problem.Name,
		problem.ContestID,
		problem.Platform,
		problem.Link,
		tagsStr,
		problem.TrackID,
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
