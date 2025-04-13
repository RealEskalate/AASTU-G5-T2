package models

type ContestModel struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	ProblemCount int    `json:"problem_count"`
	CreatedAt    string `json:"created_at"`
	UpdatedAt    string `json:"updated_at"`
	Unrated      bool   `json:"unrated"`
	Type         string `json:"type"`
	Link         string `json:"link"`
	Link2        string `json:"link_2"`
	Link3        string `json:"link_3"`
}

type ContestResponse struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	ProblemCount int    `json:"problem_count"`
	CreatedAt    string `json:"created_at"`
	Unrated      bool   `json:"unrated"`
	Type         string `json:"type"`
	Link         string `json:"link"`
	Link2        string `json:"link_2"`
	Link3        string `json:"link_3"`
}
