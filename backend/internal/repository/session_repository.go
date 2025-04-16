package repository

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"database/sql"
)

type SessionRepository interface {
	CreateSession(sessionModel models.SessionModel) *errors.CustomError
	GetAllSessions() ([]models.SessionModel, *errors.CustomError)
	GetSessionById(id int) (models.SessionModel, *errors.CustomError)
	UpdateSession(id int, sessionModel models.SessionModel) *errors.CustomError
	DeleteSession(id int) *errors.CustomError
}

type sessionRepository struct {
	db *sql.DB
}

// CreateSession implements SessionRepository.
func (s *sessionRepository) CreateSession(sessionModel models.SessionModel) *errors.CustomError {
	query := `
		INSERT INTO sessions (
			name, description, start_time, end_time, meet_link, location, 
			resource_link, recording_link, calendar_event_id, lecturer_id, stipend_amount, created_at, updated_at
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
	`
	emptyString := ""

	// Set empty strings explicitly for nullable string fields
	if sessionModel.Name == "" {
		sessionModel.Name = ""
	}
	if sessionModel.Description == "" {
		sessionModel.Description = ""
	}
	if sessionModel.MeetLink == nil {

		sessionModel.MeetLink = &emptyString
	}
	if sessionModel.Location == nil {
		sessionModel.Location = &emptyString
	}
	if sessionModel.ResourceLink == nil {
		sessionModel.ResourceLink = &emptyString
	}
	if sessionModel.RecordingLink == nil {
		sessionModel.RecordingLink = &emptyString
	}
	if sessionModel.CalendarEventID == nil {
		sessionModel.CalendarEventID = &emptyString
	}

	var lecturerID interface{} = nil
	if sessionModel.LecturerID != nil {
		var exists bool
		err := s.db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE id = $1)", sessionModel.LecturerID).Scan(&exists)
		if err != nil {
			return &errors.CustomError{Message: "failed to check lecturer existence", StatusCode: 500, Error: err}
		}
		if exists {
			lecturerID = sessionModel.LecturerID
		}
	}

	_, err := s.db.Exec(
		query,
		sessionModel.Name, sessionModel.Description, sessionModel.StartTime, sessionModel.EndTime,
		sessionModel.MeetLink, sessionModel.Location, sessionModel.ResourceLink, sessionModel.RecordingLink,
		sessionModel.CalendarEventID, lecturerID, sessionModel.StipendAmount,
	)
	if err != nil {
		return &errors.CustomError{Message: "failed to create session", StatusCode: 500, Error: err}
	}

	return nil
}

// DeleteSession implements SessionRepository.
func (s *sessionRepository) DeleteSession(id int) *errors.CustomError {
	query := `DELETE FROM sessions WHERE id = $1`

	// Check if the session exists before attempting to delete it
	var exists bool
	err := s.db.QueryRow("SELECT EXISTS(SELECT 1 FROM sessions WHERE id = $1)", id).Scan(&exists)
	if err != nil {
		return &errors.CustomError{Message: "failed to check session existence", StatusCode: 500, Error: err}
	}
	if !exists {
		return &errors.CustomError{Message: "session not found", StatusCode: 404, Error: nil}
	}

	_, err = s.db.Exec(query, id)
	if err != nil {
		return &errors.CustomError{Message: "failed to delete session", StatusCode: 500, Error: err}
	}

	return nil
}

// GetAllSessions implements SessionRepository.
func (s *sessionRepository) GetAllSessions() ([]models.SessionModel, *errors.CustomError) {
	query := `
		SELECT id, name, description, start_time, end_time, meet_link, location, 
			resource_link, recording_link, calendar_event_id, lecturer_id, stipend_amount, created_at, updated_at
		FROM sessions;
	`

	rows, err := s.db.Query(query)
	if err != nil {
		return nil, &errors.CustomError{Message: "failed to query sessions", StatusCode: 500, Error: err}
	}
	defer rows.Close()

	var sessions []models.SessionModel
	for rows.Next() {
		var session models.SessionModel
		var lecturerID sql.NullInt64

		err := rows.Scan(
			&session.ID,
			&session.Name,
			&session.Description,
			&session.StartTime,
			&session.EndTime,
			&session.MeetLink,
			&session.Location,
			&session.ResourceLink,
			&session.RecordingLink,
			&session.CalendarEventID,
			&lecturerID, // read as nullable
			&session.StipendAmount,
			&session.CreatedAt,
			&session.UpdatedAt,
		)
		if err != nil {
			return nil, &errors.CustomError{Message: "failed to scan session", StatusCode: 500, Error: err}
		}

		if lecturerID.Valid {
			id := int(lecturerID.Int64)
			session.LecturerID = &id
		} else {
			session.LecturerID = nil
		}

		sessions = append(sessions, session)
	}

	return sessions, nil
}

// GetSessionById implements SessionRepository.
func (s *sessionRepository) GetSessionById(id int) (models.SessionModel, *errors.CustomError) {
	query := `
		SELECT id, name, description, start_time, end_time, meet_link, location, 
			resource_link, recording_link, calendar_event_id, lecturer_id, stipend_amount, created_at, updated_at
		FROM sessions WHERE id = $1;
	`

	var session models.SessionModel
	err := s.db.QueryRow(query, id).Scan(
		&session.ID,
		&session.Name,
		&session.Description,
		&session.StartTime,
		&session.EndTime,
		&session.MeetLink,
		&session.Location,
		&session.ResourceLink,
		&session.RecordingLink,
		&session.CalendarEventID,
		&session.LecturerID,
		&session.StipendAmount,
		&session.CreatedAt,
		&session.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return session, &errors.CustomError{Message: "session not found", StatusCode: 404, Error: err}
		}
		return session, &errors.CustomError{Message: "failed to query session", StatusCode: 500, Error: err}
	}

	return session, nil
}

// UpdateSession implements SessionRepository.
func (s *sessionRepository) UpdateSession(id int, sessionModel models.SessionModel) *errors.CustomError {
	query := `
		UPDATE sessions SET
			name = $1, description = $2, start_time = $3, end_time = $4,
			meet_link = $5, location = $6, resource_link = $7, recording_link = $8,
			calendar_event_id = $9, lecturer_id = $10, stipend_amount = $11, updated_at = NOW()
		WHERE id = $12;
	`

	_, err := s.db.Exec(
		query,
		sessionModel.Name, sessionModel.Description, sessionModel.StartTime, sessionModel.EndTime,
		sessionModel.MeetLink, sessionModel.Location, sessionModel.ResourceLink, sessionModel.RecordingLink,
		sessionModel.CalendarEventID, sessionModel.LecturerID, sessionModel.StipendAmount,
		id,
	)
	if err != nil {
		return &errors.CustomError{Message: "failed to update session", StatusCode: 500, Error: err}
	}

	return nil
}

func NewSessionRepository(db *sql.DB) SessionRepository {
	return &sessionRepository{
		db: db,
	}
}
