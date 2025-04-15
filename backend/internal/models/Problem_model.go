package models

import "database/sql"

import "time"

type ProblemModel struct {
    ID         int            `json:"id"`
    Name       string         `json:"name"`
    Contest_id sql.NullString `json:"contest_id"`
    Created_at time.Time      `json:"created_at"`  
    UpdatedAt  time.Time      `json:"updated_at"` 
    Track_id   int            `json:"track_id"`
    Difficulty string            `json:"difficulty"`
    Tag        string         `json:"tag"`
    Platform   string         `json:"platform"`
    Link       string         `json:"link"`
}
