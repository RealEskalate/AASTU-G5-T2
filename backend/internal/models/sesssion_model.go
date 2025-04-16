package models

import "time"

type SessionModel struct {
	ID              int       `json:"id,omitempty"`
	Name            string    `json:"name,omitempty" validate:"required"`
	Description     string    `json:"description,omitempty"`
	StartTime       time.Time `json:"start_time,omitempty" validate:"required"`
	EndTime         time.Time `json:"end_time,omitempty" validate:"required"`
	MeetLink        *string   `json:"meet_link,omitempty"`
	Location        *string   `json:"location,omitempty"`
	ResourceLink    *string   `json:"resource_link,omitempty"`
	RecordingLink   *string   `json:"recording_link,omitempty"`
	CalendarEventID *string   `json:"calendar_event_id,omitempty"`
	LecturerID      *int      `json:"lecturer_id,omitempty"`

	StipendAmount *int      `json:"stipend_amount,omitempty"`
	CreatedAt     time.Time `json:"created_at,omitempty"`
	UpdatedAt     time.Time `json:"updated_at,omitempty"`
}
