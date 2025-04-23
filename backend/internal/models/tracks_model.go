package models

import "time"

type Track struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	Active	bool         `json:"active"`
}

type TrackProgress struct {
	UserID     int     `json:"user_id"`
	Name       string  `json:"name"`
	Solved     int     `json:"solved"`
	Exercises  int     `json:"exercises"`
	Available  int     `json:"available"`
	Completion float64 `json:"completion"` // e.g. 50.0 for 50%
}

type DayGroup struct {
	Tags    []string  `json:"tags"`
	Problems []Problem `json:"problems"`
}
