package models

import "time"

type UserModel struct {
	ID                     int       `json:"id"`
	Role                   string    `json:"role_id"`
	Name                   string    `json:"name"`
	Country                string    `json:"country_id"`
	University             string    `json:"university"`
	Email                  string    `json:"email"`
	LeetCode               string    `json:"leetcode"`
	Codeforces             string    `json:"codeforces"`
	GitHub                 string    `json:"github"`
	Photo                  string    `json:"photo"`
	PreferredLanguage      string    `json:"preferred_language"`
	HackerRank             string    `json:"hackerrank"`
	Group                  string    `json:"group_id"`
	Phone                  string    `json:"phone"`
	TelegramUsername       string    `json:"telegram_username"`
	TelegramUID            string    `json:"telegram_uid"`
	LinkedIn               string    `json:"linkedin"`
	StudentID              string    `json:"student_id"`
	ShortBio               string    `json:"short_bio"`
	Instagram              string    `json:"instagram"`
	Birthday               time.Time `json:"birthday"`
	CV                     string    `json:"cv"`
	JoinedDate             time.Time `json:"joined_date"`
	ExpectedGraduationDate time.Time `json:"expected_graduation_date"`
	MentorName             string    `json:"mentor_name"`
	TShirtColor            string    `json:"tshirt_color"`
	TShirtSize             string    `json:"tshirt_size"`
	Gender                 string    `json:"gender"`
	CodeOfConduct          string    `json:"code_of_conduct"`
	Password               string    `json:"password"`
	CreatedAt              time.Time `json:"created_at"`
	UpdatedAt              time.Time `json:"updated_at"`
	Config                 string    `json:"config"`
	Department             string    `json:"department"`
	Inactive               bool      `json:"inactive"`
	FirstLogin             bool      `json:"firstlogin"`
}

type UserProfileResponse struct {
	ID                     int       `json:"id"`
	Name                   string    `json:"name"`
	Email                  string    `json:"email"`
	Photo                  string    `json:"photo"`
	University             string    `json:"university"`
	Role                   string    `json:"role"`
	Country                string    `json:"country"`
	JoinedDate             time.Time `json:"joined_date"`
	ExpectedGraduationDate time.Time `json:"expected_graduation_date"`
	ShortBio               string    `json:"short_bio"`
	LeetCode               string    `json:"leetcode"`
	Codeforces             string    `json:"codeforces"`
	GitHub                 string    `json:"github"`
	Instagram              string    `json:"instagram"`
	Phone                  string    `json:"phone"`
	StudentID              string    `json:"student_id"`
	TelegramUsername       string    `json:"telegram_username"`
	Group                  string    `json:"group"`
	Department             string    `json:"department"`
}
