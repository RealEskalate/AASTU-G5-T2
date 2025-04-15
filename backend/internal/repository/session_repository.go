package repository

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
)

type SessionRepository interface {
	CreateSession(sessionModel models.SessionModel) *errors.CustomError
	GetAllSessions() ([]models.SessionModel, *errors.CustomError)
	GetSessionById(id int) (models.SessionModel, *errors.CustomError)
	UpdateSession(id int, sessionModel models.SessionModel) *errors.CustomError
	DeleteSession(id int) *errors.CustomError
}

type sessionRepository struct{}

// CreateSession implements SessionRepository.
func (s *sessionRepository) CreateSession(sessionModel models.SessionModel) *errors.CustomError {
	panic("unimplemented")
}

// DeleteSession implements SessionRepository.
func (s *sessionRepository) DeleteSession(id int) *errors.CustomError {
	panic("unimplemented")
}

// GetAllSessions implements SessionRepository.
func (s *sessionRepository) GetAllSessions() ([]models.SessionModel, *errors.CustomError) {
	panic("unimplemented")
}

// GetSessionById implements SessionRepository.
func (s *sessionRepository) GetSessionById(id int) (models.SessionModel, *errors.CustomError) {
	panic("unimplemented")
}

// UpdateSession implements SessionRepository.
func (s *sessionRepository) UpdateSession(id int, sessionModel models.SessionModel) *errors.CustomError {
	panic("unimplemented")
}

func NewSessionRepository() SessionRepository {
	return &sessionRepository{}
}
