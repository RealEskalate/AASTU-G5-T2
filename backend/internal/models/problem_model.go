package models

import "time"

type Problem struct {
	ID          int       `json:"id"`
	ContestID   *int      `json:"contest_id,omitempty"`
	TrackID     *int      `json:"track_id,omitempty"`
	Name        string    `json:"name"`
	Difficulty  string    `json:"difficulty"`
	Tag         []string  `json:"tag"`
	Platform    string    `json:"platform"`
	Link        string    `json:"link"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	UsersSolved []int     `json:"users_solved,omitempty"`
	Index       *string   `json:"index,omitempty" db:"index"` // populated at query time
}
