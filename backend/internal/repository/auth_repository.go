package repository

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"database/sql"
	"log"
)

type AuthRepo interface {
	SaveUser(models.UserModel, string) error
	SaveUserEmail(email string, group string) *errors.CustomError
	SetPassword(email string, password string) *errors.CustomError
}

type authRepo struct {
	db *sql.DB
}

// SetPassword implements AuthRepo.
func (a *authRepo) SetPassword(email string, password string) *errors.CustomError {
	query := "UPDATE users SET password = $1 WHERE email = $2"
	_, err := a.db.Exec(query, password, email)
	if err != nil {
		log.Println("error on  users table", err)
		return &errors.CustomError{StatusCode: 500, Message: "error inserting password into db", Error: err}
	}
	return nil
}

// SaveUserEmail implements AuthRepo.
func (a *authRepo) SaveUserEmail(email string, group string) *errors.CustomError {
	var groupID int
	err := a.db.QueryRow("SELECT id FROM groups WHERE LOWER(short_name) = LOWER($1)", group).Scan(&groupID)
	if err != nil {
		log.Println("error finding group by short_name", err)
		return &errors.CustomError{StatusCode: 400, Message: "Invalid groupId", Error: err}
	}

	var exists bool
	_ = a.db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)", email).Scan(&exists)

	if !exists {
		query := "INSERT INTO users (email, group_id) VALUES ($1, $2)"
		_, err = a.db.Exec(query, email, groupID)
		if err != nil {
			log.Println("error inserting email and group into users table", err)
			return &errors.CustomError{StatusCode: 500, Message: "error inserting email and group into db", Error: err}
		}
	}

	return nil
}

// SaveUser implements AuthRepo.
func (a *authRepo) SaveUser(user models.UserModel, token string) error {
	query := "INSERT INTO users (role_id, name, country_id, university, email, password) VALUES ($1, $2, $3, $4, $5, $6)"
	query2 := "INSERT INTO user_tokens (email, token, token_type) VALUES ($1, $2, $3)"

	log.Println("data from repo", user.RoleID, user.Name, user.CountryID, user.University, user.Email, user.Password)
	_, err := a.db.Exec(query, user.RoleID, user.Name, user.CountryID, user.University, user.Email, user.Password)
	if err != nil {
		log.Println("error on  users table", err)
		return err
	}
	_, err = a.db.Exec(query2, user.Email, token, "access_token")
	if err != nil {
		log.Println("error on  users_session table", err)
		return err
	}

	return nil
}

func NewAuthRepo(db *sql.DB) AuthRepo {
	return &authRepo{
		db: db,
	}
}
