package usecase

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
)

type SessionUsecase interface {
	CreateSession(sessionModel models.SessionModel) *errors.CustomError
	GetAllSessions() ([]models.SessionModel, *errors.CustomError)
	GetSessionById(id int) (models.SessionModel, *errors.CustomError)
	UpdateSession(id int, sessionModel models.SessionModel) *errors.CustomError
	DeleteSession(id int) *errors.CustomError
}

type sessionUsecase struct{}

// CreateSession implements SessionUsecase.
func (s *sessionUsecase) CreateSession(sessionModel models.SessionModel) *errors.CustomError {
	panic("unimplemented")
}

// DeleteSession implements SessionUsecase.
func (s *sessionUsecase) DeleteSession(id int) *errors.CustomError {
	panic("unimplemented")
}

// GetAllSessions implements SessionUsecase.
func (s *sessionUsecase) GetAllSessions() ([]models.SessionModel, *errors.CustomError) {
	panic("unimplemented")
}

// GetSessionById implements SessionUsecase.
func (s *sessionUsecase) GetSessionById(id int) (models.SessionModel, *errors.CustomError) {
	panic("unimplemented")
}

// UpdateSession implements SessionUsecase.
func (s *sessionUsecase) UpdateSession(id int, sessionModel models.SessionModel) *errors.CustomError {
	panic("unimplemented")
}

func NewSessionUsecase() SessionUsecase {
	return &sessionUsecase{}
}
