package controller

import (
	"a2sv_hub/internal/usecase"
	"strconv"

	"github.com/gin-gonic/gin"
)

type AttendanceController interface {
	TakeAttendanceOfGroup(c *gin.Context)
	GetAttendanceByGroupAndSession(c *gin.Context) // get group attendance by session id
	GetAttendanceForStudent(c *gin.Context)        // get student previous month attendance
	DeleteAttendanceOfStudent(c *gin.Context)      // delete attendance for a group and session
}

type attendanceController struct {
	attendanceUsecase usecase.AttendanceUsecase
}

// DeleteAttendanceByGroupAndSession implements AttendanceController.
func (a *attendanceController) DeleteAttendanceOfStudent(c *gin.Context) {
	sessionID, err := strconv.Atoi(c.Param("session_id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid session_id"})
		return
	}

	var requestData struct {
		UserID         int    `json:"user_id"`
		AttendanceType string `json:"attendance_type"`
	}
	if err := c.ShouldBindJSON(&requestData); err != nil {
		c.JSON(400, gin.H{"error": "invalid request body"})
		return
	}

	if requestData.UserID == 0 {
		c.JSON(400, gin.H{"error": "user_id is required and must be a valid integer"})
		return
	}
	custErr := a.attendanceUsecase.DeleteAttendanceOfStudent(requestData.UserID, sessionID, requestData.AttendanceType)
	if custErr != nil {
		c.JSON(custErr.StatusCode, gin.H{"error": custErr.Error, "message": custErr.Message, "status": custErr.StatusCode})
		return
	}

	c.JSON(200, gin.H{"message": "attendance deleted successfully"})
}

// GetAttendanceByGroupAndSession implements AttendanceController.
func (a *attendanceController) GetAttendanceByGroupAndSession(c *gin.Context) {
	sessionID, err := strconv.Atoi(c.Param("session_id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid session_id"})
		return
	}

	var requestData struct {
		GroupShortName string `json:"group_short_name"`
	}
	if err := c.ShouldBindJSON(&requestData); err != nil {
		c.JSON(400, gin.H{"error": "invalid request body"})
		return
	}

	if requestData.GroupShortName == "" {
		c.JSON(400, gin.H{"error": "group_short_name is required"})
		return
	}

	attendance_type := c.Query("type")

	attendance, custErr := a.attendanceUsecase.GetAttendanceByGroupAndSession(requestData.GroupShortName, sessionID, attendance_type)
	if custErr != nil {
		c.JSON(custErr.StatusCode, gin.H{"error": custErr.Error, "message": custErr.Message, "status": custErr.StatusCode})
		return
	}

	c.JSON(200, gin.H{"attendance": attendance})
}

// GetAttendanceForStudent implements AttendanceController.
func (a *attendanceController) GetAttendanceForStudent(c *gin.Context) {

	userID, err := strconv.Atoi(c.Param("student_id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid student_id"})
		return
	}

	if userID == 0 {
		c.JSON(400, gin.H{"error": "student_id is required"})
		return
	}

	attendance, custErr := a.attendanceUsecase.GetAttendanceForStudent(userID) // get attendance for the last month
	if custErr != nil {
		c.JSON(custErr.StatusCode, gin.H{"error": custErr.Error, "message": custErr.Message, "status": custErr.StatusCode})
		return
	}

	c.JSON(200, gin.H{"attendance": attendance})
}

// TakeAttendanceOfGroup implements AttendanceController.
func (a *attendanceController) TakeAttendanceOfGroup(c *gin.Context) {
	sessionID, err := strconv.Atoi(c.Param("session_id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid session_id"})
		return
	}

	var requestData struct {
		Type        string `json:"type"`
		Attendances []struct {
			UserID *int   `json:"user_id"`
			Status string `json:"status"`
		} `json:"attendances"`
	}
	if err := c.ShouldBindJSON(&requestData); err != nil {
		c.JSON(400, gin.H{"error": "invalid request body"})
		return
	}

	if requestData.Type == "" {
		c.JSON(400, gin.H{"error": "type is required"})
		return
	}

	if len(requestData.Attendances) == 0 {
		c.JSON(400, gin.H{"error": "attendances data is required"})
		return
	}
	email, err := c.Cookie("email")
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid token"})
		return
	}

	attendanceData := make(map[int]string)
	for _, attendance := range requestData.Attendances {
		if attendance.UserID == nil || (attendance.Status != "present" && attendance.Status != "absent" && attendance.Status != "excused") {
			c.JSON(400, gin.H{"error": "invalid attendance data"})
			return
		}
		attendanceData[*attendance.UserID] = attendance.Status
	}

	custErr := a.attendanceUsecase.TakeAttendanceOfGroup(sessionID, attendanceData, requestData.Type, email)
	if custErr != nil {
		c.JSON(custErr.StatusCode, gin.H{"error": custErr.Error, "message": custErr.Message, "status": custErr.StatusCode, "ErrorMap": custErr.ErrorMap})
		return
	}

	c.JSON(200, gin.H{"message": "attendance recorded successfully"})
}

// // UpdateAttendanceOfStudentBySession implements AttendanceController.
// func (a *attendanceController) UpdateAttendanceOfStudentBySession(c *gin.Context) {
// 	panic("unimplemented")
// }

func NewAttendanceController(usecase usecase.AttendanceUsecase) AttendanceController {
	return &attendanceController{
		attendanceUsecase: usecase,
	}
}
