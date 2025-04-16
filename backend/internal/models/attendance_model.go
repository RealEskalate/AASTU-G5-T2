package models

import "time"

type AttendanceModel struct {
	ID        int       `json:"id"`
	UserID    int       `json:"user_id" binding:"required"`
	HeadID    int       `json:"head_id" binding:"required"`
	Status    int       `json:"status" binding:"required"`
	At        time.Time `json:"at" binding:"required"`
	CreatedAt time.Time `json:"created_at" binding:"required"`
	UpdatedAt time.Time `json:"updated_at" binding:"required"`
	SessionID int       `json:"session_id" binding:"required"`
	Type      int       `json:"type" binding:"required"`
}
