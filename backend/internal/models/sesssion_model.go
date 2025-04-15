package models

import "time"

type SessionModel struct {
	ID              int       `json:"id"`
	Name            string    `json:"name"`
	Description     string    `json:"description"`
	StartTime       time.Time `json:"start_time"`
	EndTime         time.Time `json:"end_time"`
	MeetLink        string    `json:"meet_link"`
	Location        string    `json:"location"`
	ResourceLink    string    `json:"resource_link"`
	RecordingLink   string    `json:"recording_link"`
	CalendarEventID string    `json:"calendar_event_id"`
	LecturerID      int       `json:"lecturer_id"`
	StipendAmount   int       `json:"stipend_amount"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}
