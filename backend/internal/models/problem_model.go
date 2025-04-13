package models

type ProblemModel struct {
	ID         int    `json:"id"`
	ContestID  int    `json:"contest_id"`
	TrackID    int    `json:"track_id"`
	Name       string `json:"name"`
	Difficulty string `json:"difficulty"`
	Tag        string `json:"tag"`
	Platform   string `json:"platform"`
	Link       string `json:"link"`
	CreatedAt  string `json:"created_at"`
	UpdatedAt  string `json:"updated_at"`
}

type ProblemResponse struct {
	ID         int             `json:"id"`
	Name       string          `json:"name"`
	Difficulty string          `json:"difficulty"`
	Tag        string          `json:"tag"`
	Platform   string          `json:"platform"`
	Link       string          `json:"link"`
	CreatedAt  string          `json:"created_at"`
	Contest    ContestResponse `json:"contest"`
	Track      TrackResponse   `json:"track"`
}
