package models

import "time"

type Problem struct {
	ID          int       `json:"id"`
	ContestID   *int      `json:"contest_id,omitempty"`
	TrackID     *int      `json:"track_id,omitempty"`
	Name        string    `json:"name"`
	Difficulty  string    `json:"difficulty"`
	Tags        []string  `json:"tags"`
	Platform    string    `json:"platform"`
	Link        string    `json:"link"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	UsersSolved []int     `json:"users_solved,omitempty"` // populated at query time
}
