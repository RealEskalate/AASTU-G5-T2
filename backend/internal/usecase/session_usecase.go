package usecase

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/repository"
)

type SessionUsecase interface {
	CreateSession(sessionModel models.SessionModel) *errors.CustomError
	GetAllSessions() ([]models.SessionModel, *errors.CustomError)
	GetSessionById(id int) (models.SessionModel, *errors.CustomError)
	UpdateSession(id int, sessionModel models.SessionModel) *errors.CustomError
	DeleteSession(id int) *errors.CustomError
}

type sessionUsecase struct {
	sessionRepo repository.SessionRepository
}

// CreateSession implements SessionUsecase.
func (s *sessionUsecase) CreateSession(sessionModel models.SessionModel) *errors.CustomError {
	if err := s.sessionRepo.CreateSession(sessionModel); err != nil {
		return err
	}
	return nil
}

// DeleteSession implements SessionUsecase.
func (s *sessionUsecase) DeleteSession(id int) *errors.CustomError {
	if err := s.sessionRepo.DeleteSession(id); err != nil {
		return err
	}
	return nil
}

// GetAllSessions implements SessionUsecase.
func (s *sessionUsecase) GetAllSessions() ([]models.SessionModel, *errors.CustomError) {
	sessions, err := s.sessionRepo.GetAllSessions()
	if err != nil {
		return nil, err
	}
	return sessions, nil
}

// GetSessionById implements SessionUsecase.
func (s *sessionUsecase) GetSessionById(id int) (models.SessionModel, *errors.CustomError) {
	session, err := s.sessionRepo.GetSessionById(id)
	if err != nil {
		return models.SessionModel{}, err
	}
	return session, nil
}

// UpdateSession implements SessionUsecase.
func (s *sessionUsecase) UpdateSession(id int, sessionModel models.SessionModel) *errors.CustomError {
	existingSession, err := s.sessionRepo.GetSessionById(id)
	if err != nil {
		return err
	}

	// Update only non-zero or non-empty fields
	if sessionModel.Name != "" {
		existingSession.Name = sessionModel.Name
	}
	if sessionModel.Description != "" {
		existingSession.Description = sessionModel.Description
	}
	if !sessionModel.StartTime.IsZero() {
		existingSession.StartTime = sessionModel.StartTime
	}
	if !sessionModel.EndTime.IsZero() {
		existingSession.EndTime = sessionModel.EndTime
	}
	if sessionModel.MeetLink != nil {
		existingSession.MeetLink = sessionModel.MeetLink
	}
	if sessionModel.Location != nil {
		existingSession.Location = sessionModel.Location
	}
	if sessionModel.ResourceLink != nil {
		existingSession.ResourceLink = sessionModel.ResourceLink
	}
	if sessionModel.RecordingLink != nil {
		existingSession.RecordingLink = sessionModel.RecordingLink
	}
	if sessionModel.CalendarEventID != nil {
		existingSession.CalendarEventID = sessionModel.CalendarEventID
	}
	if sessionModel.LecturerID != nil {
		existingSession.LecturerID = sessionModel.LecturerID
	}
	if sessionModel.StipendAmount != nil {
		existingSession.StipendAmount = sessionModel.StipendAmount
	}

	// Save the updated session
	if updateErr := s.sessionRepo.UpdateSession(id, existingSession); updateErr != nil {
		return updateErr
	}
	return nil
}

func NewSessionUsecase(sessionrepo repository.SessionRepository) SessionUsecase {
	return &sessionUsecase{
		sessionRepo: sessionrepo,
	}
}
