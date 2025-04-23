package models

import "time"

type AttendanceModel struct {
	ID        int       `json:"id"`
	UserID    int       `json:"user_id" binding:"required"`
	HeadID    int       `json:"head_id" binding:"required"`
	Status    string    `json:"status" binding:"required"`
	At        time.Time `json:"at" binding:"required"`
	CreatedAt time.Time `json:"created_at" binding:"required"`
	UpdatedAt time.Time `json:"updated_at" binding:"required"`
	SessionID int       `json:"session_id" binding:"required"`
	Type      string    `json:"type" binding:"required"` // check in and check out
}

// on the db table session_id,type should be unique

// TakeAttendanceOfGroup(c *gin.Context)
// GetAttendanceByGroupAndSession(c *gin.Context)    // get group attendance by session id
// GetAttendanceForStudent(c *gin.Context)           // get student previous month attendance
// DeleteAttendanceByGroupAndSession(c *gin.Context)
