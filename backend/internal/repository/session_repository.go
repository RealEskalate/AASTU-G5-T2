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
			resource_link, recording_link, calendar_event_id, stipend_amount, created_at, updated_at
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
		RETURNING id
	`
	emptyString := ""

	// Set empty strings explicitly for nullable string fields
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

	// Validate group_lecturer_id map
	for groupID, lecturerID := range sessionModel.GroupLecturerID {
		var groupExists bool
		err := s.db.QueryRow("SELECT EXISTS(SELECT 1 FROM groups WHERE short_name = $1)", groupID).Scan(&groupExists)
		if err != nil {
			return &errors.CustomError{Message: "failed to check group existence", StatusCode: 500, Error: err}
		}
		if !groupExists {
			return &errors.CustomError{Message: "group not found", StatusCode: 404, Error: nil}
		}

		var lecturerExists bool
		err = s.db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE id = $1)", lecturerID).Scan(&lecturerExists)
		if err != nil {
			return &errors.CustomError{Message: "failed to check lecturer existence", StatusCode: 500, Error: err}
		}
		if !lecturerExists {
			return &errors.CustomError{Message: "lecturer not found", StatusCode: 404, Error: nil}
		}
	}

	var sessionID int
	err := s.db.QueryRow(
		query,
		sessionModel.Name, sessionModel.Description, sessionModel.StartTime, sessionModel.EndTime,
		sessionModel.MeetLink, sessionModel.Location, sessionModel.ResourceLink, sessionModel.RecordingLink,
		sessionModel.CalendarEventID, sessionModel.StipendAmount,
	).Scan(&sessionID)
	if err != nil {
		return &errors.CustomError{Message: "failed to create session", StatusCode: 500, Error: err}
	}

	// Insert group_lecturer_id mappings into session_group_lecturers table
	for groupID, lecturerID := range sessionModel.GroupLecturerID {
		_, err := s.db.Exec(
			"INSERT INTO session_group_lecturers (session_id, group_short_name, lecturer_id) VALUES ($1, $2, $3)",
			sessionID, groupID, lecturerID,
		)
		if err != nil {
			return &errors.CustomError{Message: "failed to associate session with group and lecturer", StatusCode: 500, Error: err}
		}
	}

	return nil
}

// DeleteSession implements SessionRepository.
func (s *sessionRepository) DeleteSession(id int) *errors.CustomError {
	// Check if the session exists before attempting to delete it
	var exists bool
	err := s.db.QueryRow("SELECT EXISTS(SELECT 1 FROM sessions WHERE id = $1)", id).Scan(&exists)
	if err != nil {
		return &errors.CustomError{Message: "failed to check session existence", StatusCode: 500, Error: err}
	}
	if !exists {
		return &errors.CustomError{Message: "session not found", StatusCode: 404, Error: nil}
	}

	// Delete from session_group_lecturers table first to maintain referential integrity
	_, err = s.db.Exec("DELETE FROM session_group_lecturers WHERE session_id = $1", id)
	if err != nil {
		return &errors.CustomError{Message: "failed to delete session group lecturers", StatusCode: 500, Error: err}
	}

	// Delete from sessions table
	_, err = s.db.Exec("DELETE FROM sessions WHERE id = $1", id)
	if err != nil {
		return &errors.CustomError{Message: "failed to delete session", StatusCode: 500, Error: err}
	}

	return nil
}

// GetAllSessions implements SessionRepository.
func (s *sessionRepository) GetAllSessions() ([]models.SessionModel, *errors.CustomError) {
	query := `
		SELECT id, name, description, start_time, end_time, meet_link, location, 
			resource_link, recording_link, calendar_event_id, stipend_amount, created_at, updated_at
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
			&session.StipendAmount,
			&session.CreatedAt,
			&session.UpdatedAt,
		)
		if err != nil {
			return nil, &errors.CustomError{Message: "failed to scan session", StatusCode: 500, Error: err}
		}

		// Fetch group_lecturer_id mappings for the session
		groupLecturerQuery := `
			SELECT group_short_name, lecturer_id 
			FROM session_group_lecturers 
			WHERE session_id = $1;
		`
		groupLecturerRows, err := s.db.Query(groupLecturerQuery, session.ID)
		if err != nil {
			return nil, &errors.CustomError{Message: "failed to query session group lecturers", StatusCode: 500, Error: err}
		}
		defer groupLecturerRows.Close()

		session.GroupLecturerID = make(map[string]int)
		for groupLecturerRows.Next() {
			var lecturerID int
			var groupID string
			err := groupLecturerRows.Scan(&groupID, &lecturerID)
			if err != nil {
				return nil, &errors.CustomError{Message: "failed to scan session group lecturer", StatusCode: 500, Error: err}
			}
			session.GroupLecturerID[groupID] = lecturerID
		}

		sessions = append(sessions, session)
	}

	return sessions, nil
}

// GetSessionById implements SessionRepository.
func (s *sessionRepository) GetSessionById(id int) (models.SessionModel, *errors.CustomError) {
	query := `
		SELECT id, name, description, start_time, end_time, meet_link, location, 
			resource_link, recording_link, calendar_event_id, stipend_amount, created_at, updated_at
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
		&session.StipendAmount,
		&session.CreatedAt,
		&session.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return session, &errors.CustomError{Message: "session not found", StatusCode: 404, Error: nil}
		}
		return session, &errors.CustomError{Message: "failed to query session", StatusCode: 500, Error: err}
	}

	// Fetch group_lecturer_id mappings for the session
	groupLecturerQuery := `
		SELECT group_short_name, lecturer_id 
		FROM session_group_lecturers 
		WHERE session_id = $1;
	`
	groupLecturerRows, err := s.db.Query(groupLecturerQuery, session.ID)
	if err != nil {
		return session, &errors.CustomError{Message: "failed to query session group lecturers", StatusCode: 500, Error: err}
	}
	defer groupLecturerRows.Close()

	session.GroupLecturerID = make(map[string]int)
	for groupLecturerRows.Next() {
		var lecturerID int
		var groupID string
		err := groupLecturerRows.Scan(&groupID, &lecturerID)
		if err != nil {
			return session, &errors.CustomError{Message: "failed to scan session group lecturer", StatusCode: 500, Error: err}
		}
		session.GroupLecturerID[groupID] = lecturerID
	}

	return session, nil
}

// UpdateSession implements SessionRepository.
func (s *sessionRepository) UpdateSession(id int, sessionModel models.SessionModel) *errors.CustomError {
	// Check if the session exists before attempting to update it
	var exists bool
	err := s.db.QueryRow("SELECT EXISTS(SELECT 1 FROM sessions WHERE id = $1)", id).Scan(&exists)
	if err != nil {
		return &errors.CustomError{Message: "failed to check session existence", StatusCode: 500, Error: err}
	}
	if !exists {
		return &errors.CustomError{Message: "session not found", StatusCode: 404, Error: nil}
	}

	query := `
		UPDATE sessions SET
			name = $1, description = $2, start_time = $3, end_time = $4,
			meet_link = $5, location = $6, resource_link = $7, recording_link = $8,
			calendar_event_id = $9, stipend_amount = $10, updated_at = NOW()
		WHERE id = $11;
	`

	_, err = s.db.Exec(
		query,
		sessionModel.Name, sessionModel.Description, sessionModel.StartTime, sessionModel.EndTime,
		sessionModel.MeetLink, sessionModel.Location, sessionModel.ResourceLink, sessionModel.RecordingLink,
		sessionModel.CalendarEventID, sessionModel.StipendAmount,
		id,
	)
	if err != nil {
		return &errors.CustomError{Message: "failed to update session", StatusCode: 500, Error: err}
	}

	// Update group_lecturer_id mappings in session_group_lecturers table
	// First, delete existing mappings for the session
	_, err = s.db.Exec("DELETE FROM session_group_lecturers WHERE session_id = $1", id)
	if err != nil {
		return &errors.CustomError{Message: "failed to delete existing session group lecturers", StatusCode: 500, Error: err}
	}

	// Insert updated group_lecturer_id mappings
	for groupID, lecturerID := range sessionModel.GroupLecturerID {
		_, err := s.db.Exec(
			"INSERT INTO session_group_lecturers (session_id, group_short_name, lecturer_id) VALUES ($1, $2, $3)",
			id, groupID, lecturerID,
		)
		if err != nil {
			return &errors.CustomError{Message: "failed to update session group lecturers", StatusCode: 500, Error: err}
		}
	}

	return nil
}

func NewSessionRepository(db *sql.DB) SessionRepository {
	return &sessionRepository{
		db: db,
	}
}
