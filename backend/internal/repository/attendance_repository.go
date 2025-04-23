package repository

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"database/sql"
	"log"
)

type AttendanceRepository interface {
	GetAttendanceForStudent(user_id int) ([]models.AttendanceModel, *errors.CustomError)
	GetAttendanceByGroupAndSession(group_short_name string, session_id int) ([]models.AttendanceModel, *errors.CustomError) // user_id -> {checkin -> status, checkout -> status}
	TakeAttendanceOfGroup(user_id int, session_id int, status string, attendance_type string, headId int) *errors.CustomError
	DeleteAttendanceOfStudent(user_id int, session_id int, attendance_type string) *errors.CustomError
}

//	check the session start time and current time
//
// take attendance only for the invited group
type attendanceRepo struct {
	db *sql.DB
}

// DeleteAttendanceOfStudent implements AttendanceRepository.
func (a *attendanceRepo) DeleteAttendanceOfStudent(user_id int, session_id int, attendance_type string) *errors.CustomError {
	deleteQuery := `
		DELETE FROM attendances 
		WHERE user_id = $1 AND session_id = $2 AND type = $3
	`
	result, err := a.db.Exec(deleteQuery, user_id, session_id, attendance_type)
	if err != nil {
		return &errors.CustomError{Message: "attendance does not found", Error: err, StatusCode: 500}
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return &errors.CustomError{Message: "failed to check affected rows", Error: err, StatusCode: 500}
	}

	if rowsAffected == 0 {
		return &errors.CustomError{Message: "attendance record not found", StatusCode: 404}
	}

	return nil
}

// GetAttendanceByGroupAndSession implements AttendanceRepository.
func (a *attendanceRepo) GetAttendanceByGroupAndSession(group_short_name string, session_id int) ([]models.AttendanceModel, *errors.CustomError) {
	query := `
		SELECT a.id, a.user_id, a.head_id, a.status, a.at, a.created_at, a.updated_at, a.session_id, a.type
		FROM attendances a
		INNER JOIN users u ON a.user_id = u.id
		INNER JOIN groups g ON u.group_id = g.id
		WHERE LOWER(g.short_name) = LOWER($1) AND a.session_id = $2
	`
	rows, err := a.db.Query(query, group_short_name, session_id)
	if err != nil {
		return nil, &errors.CustomError{Message: "failed to fetch attendance by group and session", Error: err, StatusCode: 500}
	}
	defer rows.Close()

	var attendances []models.AttendanceModel
	for rows.Next() {
		var attendance models.AttendanceModel
		err := rows.Scan(
			&attendance.ID,
			&attendance.UserID,
			&attendance.HeadID,
			&attendance.Status,
			&attendance.At,
			&attendance.CreatedAt,
			&attendance.UpdatedAt,
			&attendance.SessionID,
			&attendance.Type,
		)
		if err != nil {
			log.Println("error scanning attendance:", err)
			return nil, &errors.CustomError{Message: "failed to scan attendance", Error: err, StatusCode: 500}
		}
		attendances = append(attendances, attendance)
	}

	if err = rows.Err(); err != nil {
		return nil, &errors.CustomError{Message: "error iterating attendance rows", Error: err, StatusCode: 500}
	}

	return attendances, nil
}

// GetAttendanceForStudent implements AttendanceRepository.
func (a *attendanceRepo) GetAttendanceForStudent(user_id int) ([]models.AttendanceModel, *errors.CustomError) {
	query := `
		SELECT id, user_id, head_id, status, at, created_at, updated_at, session_id, type
		FROM attendances
		WHERE user_id = $1 AND at >= DATE_TRUNC('month', NOW())
	`
	rows, err := a.db.Query(query, user_id)
	if err != nil {
		return nil, &errors.CustomError{Message: "failed to fetch attendance", Error: err}
	}
	defer rows.Close()

	var attendances []models.AttendanceModel
	for rows.Next() {
		var attendance models.AttendanceModel
		err := rows.Scan(
			&attendance.ID,
			&attendance.UserID,
			&attendance.HeadID,
			&attendance.Status,
			&attendance.At,
			&attendance.CreatedAt,
			&attendance.UpdatedAt,
			&attendance.SessionID,
			&attendance.Type,
		)
		if err != nil {
			return nil, &errors.CustomError{Message: "failed to scan attendance", Error: err, StatusCode: 500}
		}
		attendances = append(attendances, attendance)
	}

	if err = rows.Err(); err != nil {
		return nil, &errors.CustomError{Message: "error iterating attendance rows", Error: err, StatusCode: 500}
	}

	return attendances, nil
}

// TakeAttendanceOfGroup implements AttendanceRepository.
func (a *attendanceRepo) TakeAttendanceOfGroup(user_id int, session_id int, status string, attendance_type string, headId int) *errors.CustomError {
	// Begin a transaction
	tx, err := a.db.Begin()
	if err != nil {
		return &errors.CustomError{Message: "failed to begin transaction", Error: err, StatusCode: 500}
	}
	defer func() {
		if p := recover(); p != nil {
			tx.Rollback()
			panic(p)
		} else if err != nil {
			tx.Rollback()
		} else {
			err = tx.Commit()
		}
	}()

	// Check if there is existing data for the same session_id, attendance_type, and user_id
	checkQuery := `
		SELECT COUNT(*) 
		FROM attendances 
		WHERE session_id = $1 AND type = $2 AND user_id = $3
	`
	var count int
	err = tx.QueryRow(checkQuery, session_id, attendance_type, user_id).Scan(&count)
	if err != nil {
		log.Println("error checking existing attendance:", err)
		return &errors.CustomError{Message: "failed to check existing attendance", Error: err, StatusCode: 500}
	}

	// If data exists, delete the existing record
	if count > 0 {
		deleteQuery := `
			DELETE FROM attendances 
			WHERE session_id = $1 AND type = $2 AND user_id = $3
		`
		_, err = tx.Exec(deleteQuery, session_id, attendance_type, user_id)
		if err != nil {
			return &errors.CustomError{Message: "failed to remove existing attendance", Error: err, StatusCode: 500}
		}
	}

	// Insert new attendance record
	insertQuery := `
		INSERT INTO attendances (user_id, head_id, status, at, created_at, updated_at, session_id, type)
		VALUES ($1, $2, $3, NOW(), NOW(), NOW(), $4, $5)
	`
	_, err = tx.Exec(insertQuery, user_id, headId, status, session_id, attendance_type)
	if err != nil {
		return &errors.CustomError{Message: "failed to take attendance", Error: err, StatusCode: 500}
	}

	return nil
}

func NewAttendanceRepository(db *sql.DB) AttendanceRepository {
	return &attendanceRepo{
		db: db,
	}
}
