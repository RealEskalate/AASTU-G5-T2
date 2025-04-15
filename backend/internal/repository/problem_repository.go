package repository

import (
	"database/sql"
	"log"

	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
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

func (r *problemRepository) GetAllProblems() ([]models.ProblemModel,  *errors.CustomError) {
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
			Error:        err,
		}
	}
	defer rows.Close()

	var problems []models.ProblemModel

	for rows.Next() {
		var problem models.ProblemModel
		err := rows.Scan(
			&problem.ID,
			&problem.Name,
			&problem.Contest_id,
			&problem.Platform,    
			&problem.Link,        
			&problem.Created_at,  
			&problem.UpdatedAt,   
			&problem.Tag,         
			&problem.Track_id,    
			&problem.Difficulty,  
		)
		
		
		if err != nil {
			log.Println("Error scanning row:", err)
			continue
		}
		problems = append(problems, problem)
	}

	return problems, nil
}