package usecase

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/repository"
	"a2sv_hub/internal/utils"
	"fmt"
)

type AttendanceUsecase interface {
	TakeAttendanceOfGroup(session_id int, attendance map[int]string, attendance_type string, email string) *errors.CustomError
	GetAttendanceByGroupAndSession(group_short_name string, session_id int) ([]models.AttendanceModel, *errors.CustomError) // user_id -> {checkin -> status, checkout -> status}
	GetAttendanceForStudent(user_id int) ([]models.AttendanceModel, *errors.CustomError)                                    // get student previous month attendance
	DeleteAttendanceOfStudent(user_id int, session_id int, attendance_type string) *errors.CustomError                      // delete attendance for a group and session
	// UpdateAttendanceOfStudentBySession(attendance models.AttendanceModel) *errors.CustomError                                              // update attendance for a student by session id
}

type attendanceUsecase struct {
	attendanceRepo repository.AttendanceRepository
	autheRepo      repository.AuthRepo
	sessionRepo    repository.SessionRepository
	tokenService   utils.TokenService
}

// DeleteAttendanceByGroupAndSession implements AttendanceUsecase.
func (a *attendanceUsecase) DeleteAttendanceOfStudent(user_id int, session_id int, attendance_type string) *errors.CustomError {

	// Delete the attendance record
	err := a.attendanceRepo.DeleteAttendanceOfStudent(user_id, session_id, attendance_type)
	if err != nil {
		return &errors.CustomError{Message: "Failed to delete attendance record"}
	}

	return nil
}

// GetAttendanceByGroupAndSession implements AttendanceUsecase.
func (a *attendanceUsecase) GetAttendanceByGroupAndSession(group_short_name string, session_id int) ([]models.AttendanceModel, *errors.CustomError) {
	attendance, err := a.attendanceRepo.GetAttendanceByGroupAndSession(group_short_name, session_id)
	if err != nil {
		return nil, err
	}
	return attendance, nil
}

// GetAttendanceForStudent implements AttendanceUsecase.
func (a *attendanceUsecase) GetAttendanceForStudent(user_id int) ([]models.AttendanceModel, *errors.CustomError) {
	attendance, err := a.attendanceRepo.GetAttendanceForStudent(user_id)
	if err != nil {
		return nil, err
	}
	return attendance, nil
}

// TakeAttendanceOfGroup implements AttendanceUsecase.
func (a *attendanceUsecase) TakeAttendanceOfGroup(session_id int, attendance map[int]string, attendance_type string, email string) *errors.CustomError {
	// Get the head ID from the email
	userResponse, err := a.autheRepo.GetUserByEmail(email)
	if err != nil {
		return err
	}
	headID := userResponse.ID

	// Get the session by session_id
	session, err := a.sessionRepo.GetSessionById(session_id)
	if err != nil {
		return err
	}

	// Get the group short names that take the session
	groupShortNames := session.GroupLecturerID
	if len(groupShortNames) == 0 {
		return &errors.CustomError{Message: "No groups found for this session"}
	}

	// Build a quick lookup of valid group names
	validGroupNames := make(map[string]bool)
	for groupName := range groupShortNames {
		validGroupNames[groupName] = true
	}

	// Iterate through attendance list
	errorMap := make(map[int]string)
	for userID, status := range attendance {
		user, err := a.autheRepo.GetUserProfileByID(userID)
		if err != nil {
			errorMap[userID] = "Error fetching user details"
			continue
		}

		// Assuming user.GroupName is the short name (e.g., "group-a")
		if user.Group == "" || !validGroupNames[user.Group] {
			errorMap[userID] = "User is not in a valid group for this session"
			continue
		}

		// Record attendance
		err = a.attendanceRepo.TakeAttendanceOfGroup(userID, session_id, status, attendance_type, headID)
		if err != nil {
			errorMap[userID] = fmt.Sprintf("%v", err)
		}
	}

	if len(errorMap) > 0 {
		return &errors.CustomError{
			StatusCode: 500,
			Message:    "Some attendances failed",
			ErrorMap:   errorMap,
		}
	}

	return nil
}

func NewAttendanceUsecase(repo repository.AttendanceRepository, autheRepo repository.AuthRepo, sessionRepo repository.SessionRepository, tokenService utils.TokenService) AttendanceUsecase {

	return &attendanceUsecase{
		attendanceRepo: repo,
		tokenService:   tokenService,
		autheRepo:      autheRepo,
		sessionRepo:    sessionRepo,
	}
}
