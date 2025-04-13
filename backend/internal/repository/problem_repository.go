package repository

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"database/sql"
)

type ProblemRepository interface {
	GetAllProblems() ([]models.ProblemModel, *errors.CustomError)
}

type problemRepository struct {
	db *sql.DB
}

func NewProblemRepository(db *sql.DB) ProblemRepository {
	return &problemRepository{
		db: db,
	}
}

func (r *problemRepository) GetAllProblems() ([]models.ProblemModel, *errors.CustomError) {
	query := `
        SELECT 
            id, contest_id, track_id, name, difficulty, tag, platform, link
        FROM problems
    `

	rows, err := r.db.Query(query)

	if err != nil {
		return nil, &errors.CustomError{StatusCode: 400, Message: "failed to execute query: ", Error: err}
	}

	defer rows.Close()

	var problems []models.ProblemModel

	for rows.Next() {
		var p models.ProblemModel
		err := rows.Scan(
			&p.ID,
			&p.ContestID,
			&p.TrackID,
			&p.Name,
			&p.Difficulty,
			&p.Tag,
			&p.Platform,
			&p.Link,
		)
		if err != nil {
			return nil, &errors.CustomError{StatusCode: 400, Message: "Failed to scan group row", Error: err}
		}
		problems = append(problems, p)
	}

	if err := rows.Err(); err != nil {
		return nil, &errors.CustomError{StatusCode: 400, Message: "Error iterating over group rows", Error: err}
	}
	return problems, nil
}
