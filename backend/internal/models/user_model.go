package models

import "time"

type UserModel struct {
	ID                     int       `json:"id"`
	RoleID                 int       `json:"role_id"`
	Name                   string    `json:"name"`
	CountryID              int       `json:"country_id"`
	University             string    `json:"university"`
	Email                  string    `json:"email"`
	LeetCode               string    `json:"leetcode"`
	Codeforces             string    `json:"codeforces"`
	GitHub                 string    `json:"github"`
	Photo                  string    `json:"photo"`
	PreferredLanguage      string    `json:"preferred_language"`
	HackerRank             string    `json:"hackerrank"`
	GroupID                int       `json:"group_id"`
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
