package models

type GroupModel struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	ShortName   string `json:"short_name"`
	Description string `json:"description"`
	Country     string `json:"country"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
	HOA         int    `json:"hoa_id"`
}

type GroupResponse struct {
	ID          int                   `json:"id"`
	Name        string                `json:"name"`
	ShortName   string                `json:"short_name"`
	Description string                `json:"description"`
	Country     string                `json:"country"`
	HOAName     string                `json:"hoa_name"`
	Hoa_id      int                   `json:"hoa_id"`
	StudentList []UserProfileResponse `json:"students_list"`
	HeadsList   []UserProfileResponse `json:"heads_list"`
}
