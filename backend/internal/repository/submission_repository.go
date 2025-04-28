package repository

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"database/sql"
	"log"
)

type SubmissionRepository interface {
	CreateSubmission(submission models.SubmissionModel) *errors.CustomError
	GetSubmissionById(id int) (models.SubmissionModel, *errors.CustomError)
}

type submissionRepository struct {
	db *sql.DB
}

func NewSubmissionRepository(db *sql.DB) SubmissionRepository {
	return &submissionRepository{db: db}
}

func (r *submissionRepository) CreateSubmission(sub models.SubmissionModel) *errors.CustomError {
	query := `INSERT INTO submissions (problem_id, user_id, time_spent, tries, code, language, created_at, updated_at, verified)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

	_, err := r.db.Exec(query,
		sub.ProblemID,
		sub.UserID,
		sub.TimeSpent,
		sub.Tries,
		sub.Code,
		sub.Language,
		sub.CreatedAt,
		sub.UpdatedAt,
		sub.Verified,
	)
	if err != nil {
		log.Println("Error inserting submission:", err)
		return &errors.CustomError{StatusCode: 400, Message: "Failed to insert submission", Error: err}
	}
	return nil
}

func (r *submissionRepository) GetSubmissionById(id int) (models.SubmissionModel, *errors.CustomError) {
	var submission models.SubmissionModel
	query := `SELECT * FROM submissions WHERE id = $1`
	err := r.db.QueryRow(query, id).Scan(&submission.ID, &submission.ProblemID,
		&submission.UserID, &submission.TimeSpent,
		&submission.Tries, &submission.Code,
		&submission.Language, &submission.CreatedAt,
		&submission.UpdatedAt, &submission.Verified,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return models.SubmissionModel{}, &errors.CustomError{StatusCode: 404, Message: "Submission not found"}
		}
		return models.SubmissionModel{}, &errors.CustomError{StatusCode: 400, Message: "Failed to retrieve submission", Error: err}
	}
	return submission, nil
}
