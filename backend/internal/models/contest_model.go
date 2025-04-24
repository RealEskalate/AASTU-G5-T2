package models

import "time"

type Contest struct {
	ID           int       `json:"id" db:"id"`
	Name         string    `json:"name" db:"name"`
	Link         string    `json:"link" db:"link"`
	ProblemCount int       `json:"problem_count" db:"problem_count"`
	CreatedAt    time.Time `json:"created_at" db:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" db:"updated_at"`
	Unrated      bool      `json:"unrated" db:"unrated"`
	Type         string    `json:"type" db:"type"`
	Link2        *string   `json:"link2,omitempty" db:"link2"`
	Link3        *string   `json:"link3,omitempty" db:"link3"`
}


type RanklistRow struct {
	Party struct {
		Members []struct {
			Handle string `json:"handle"`
		} `json:"members"`
		ParticipantType string `json:"participantType"`
	} `json:"party"`
	Rank    int     `json:"rank"`
	Points  float64 `json:"points"`
	Penalty int     `json:"penalty"`
}

type Submission struct {
	ID        int `json:"id"`
	ContestID int `json:"contestId"`
	Problem   struct {
		Index string `json:"index"`
		Name  string `json:"name"`
	} `json:"problem"`
	Author struct {
		Members []struct {
			Handle string `json:"handle"`
		} `json:"members"`
	} `json:"author"`
	Verdict string `json:"verdict"`
	Time    int    `json:"timeConsumedMillis"`
}

type StandingsResponse struct {
	Status string `json:"status"`
	Result struct {
		Contest  Contest       `json:"contest"`
		Problems []Problem     `json:"problems"`
		Rows     []RanklistRow `json:"rows"`
	} `json:"result"`
}

type StatusResponse struct {
	Status string       `json:"status"`
	Result []Submission `json:"result"`
}

type ContestProblem struct {
    ID          int           `json:"id" db:"id"`
    ContestID   *int          `json:"contest_id,omitempty" db:"contest_id"`
    TrackID     *int          `json:"track_id,omitempty" db:"track_id"`
    Name        string        `json:"name" db:"name"`
    Difficulty  string        `json:"difficulty" db:"difficulty"`
    Tags        []string      `json:"tags" db:"tags"`
    Platform    string        `json:"platform" db:"platform"`
    Link        string        `json:"link" db:"link"`
    Index       *string       `json:"index,omitempty" db:"index"`
    CreatedAt   time.Time     `json:"created_at" db:"created_at"`
    UpdatedAt   time.Time     `json:"updated_at" db:"updated_at"`
    UsersSolved []UserSolved  `json:"users_solved,omitempty" db:"users_solved"`
}


type ContestSubmission struct {
    ID             int       `json:"id" db:"id"`
    UserID         int       `json:"user_id" db:"user_id"`
    ProblemID      int       `json:"problem_id" db:"problem_id"`
    ContestID      int       `json:"contest_id" db:"contest_id"`
    SubmissionID   int64     `json:"submission_id" db:"submission_id"`
    Verdict        string    `json:"verdict" db:"verdict"`
    SubmissionLink string    `json:"submission_link" db:"submission_link"`
    CreatedAt      time.Time `json:"created_at" db:"created_at"`
    UpdatedAt      time.Time `json:"updated_at" db:"updated_at"`
}

type UserSolved struct {
    UserID         int    `json:"user_id"`
    UserName       string `json:"user_name"`
    SubmissionLink string `json:"submission_link"`
}