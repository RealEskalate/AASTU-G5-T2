package models

type SubmissionModel struct {
	ID        int    `json:"id"`
	ProblemID int    `json:"problem_id"`
	UserID    int    `json:"user_id"`
	TimeSpent int    `json:"time_spent"`
	Tries     int    `json:"tries"`
	Code      string `json:"code"`
	Language  string `json:"language"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
	Verified  bool   `json:"verified"`
}

type SubmitRequest struct {
	TimeSpent int    `json:"time_spent" binding:"required"`
	Tries     int    `json:"tries" binding:"required"`
	Code      string `json:"code" binding:"required"`
	Language  string `json:"language" binding:"required"`
}
