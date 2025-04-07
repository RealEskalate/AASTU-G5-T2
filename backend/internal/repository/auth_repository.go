package repository

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"database/sql"
	"log"
)

type AuthRepo interface {
	SaveUser(models.UserModel, string) error
	SaveUserEmailAndToken(email string, group string, invitation_tokens string) *errors.CustomError
	SetPassword(email string, password string) *errors.CustomError
	GetSavedToken(email string) (string, *errors.CustomError)
}

type authRepo struct {
	db *sql.DB
}

// GetSavedToken implements AuthRepo.
func (a *authRepo) GetSavedToken(email string) (string, *errors.CustomError) {
	var token string
	err := a.db.QueryRow("SELECT token FROM user_tokens WHERE email = $1 AND token_type = 'invitation_token'", email).Scan(&token)
	if err != nil {
		if err == sql.ErrNoRows {
			return "", &errors.CustomError{StatusCode: 404, Message: "Token not found"}
		}
		log.Println("error retrieving token from user_tokens table", err)
		return "", &errors.CustomError{StatusCode: 500, Message: "error retrieving token from db", Error: err}
	}
	return token, nil
}

// SetPassword implements AuthRepo.
func (a *authRepo) SetPassword(email string, password string) *errors.CustomError {
	// check if the token exist on user_tokens table

	// delete all rows with the same email from user_tokens table
	_, err := a.db.Exec("DELETE FROM user_tokens WHERE email = $1 AND token_type = 'invitation_token'", email)
	if err != nil {
		log.Println("error deleting tokens from user_tokens table", err)
		return &errors.CustomError{StatusCode: 500, Message: "error deleting tokens from db", Error: err}
	}

	query := "UPDATE users SET password = $1 WHERE email = $2"

	_, err = a.db.Exec(query, password, email)
	if err != nil {
		log.Println("error on  users table", err)
		return &errors.CustomError{StatusCode: 500, Message: "error inserting password into db", Error: err}
	}
	return nil
}

// SaveUserEmailAndToken implements AuthRepo.
func (a *authRepo) SaveUserEmailAndToken(email string, group string, invitationToken string) *errors.CustomError {
	var groupID int

	// Step 1: Validate group
	err := a.db.QueryRow("SELECT id FROM groups WHERE LOWER(short_name) = LOWER($1)", group).Scan(&groupID)
	if err != nil {
		log.Println("invalid group short_name:", err)
		return &errors.CustomError{StatusCode: 400, Message: "Invalid group name", Error: err}
	}

	// Step 2: Check if user exists
	var userExists bool
	err = a.db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)", email).Scan(&userExists)
	if err != nil {
		log.Println("error checking user existence:", err)
		return &errors.CustomError{StatusCode: 500, Message: "Database error", Error: err}
	}

	if userExists {
		// Step 3: Check if invitation token exists for this user
		var tokenExists bool
		err = a.db.QueryRow(`
			SELECT EXISTS(
				SELECT 1 FROM user_tokens 
				WHERE email = $1 AND token_type = 'invitation_token'
			)
		`, email).Scan(&tokenExists)
		if err != nil {
			log.Println("error checking token existence:", err)
			return &errors.CustomError{StatusCode: 500, Message: "Failed to check invitation token", Error: err}
		}

		if !tokenExists {
			return &errors.CustomError{StatusCode: 200, Message: "User is already set up"}
		}

		// Step 4: Update user's group
		_, err = a.db.Exec("UPDATE users SET group_id = $1 WHERE email = $2", groupID, email)
		if err != nil {
			log.Println("error updating user group:", err)
			return &errors.CustomError{StatusCode: 500, Message: "Failed to update user group", Error: err}
		}

		// Step 5: Update invitation token
		_, err = a.db.Exec(`
			UPDATE user_tokens 
			SET token = $2, expires_at = NOW() + INTERVAL '7 days' 
			WHERE email = $1 AND token_type = 'invitation_token'
		`, email, invitationToken)
		if err != nil {
			log.Println("error updating invitation token:", err)
			return &errors.CustomError{StatusCode: 500, Message: "Failed to update invitation token", Error: err}
		}

	} else {
		// Step 6: Insert user and token inside
		tx, err := a.db.Begin()
		if err != nil {
			log.Println("error starting transaction:", err)
			return &errors.CustomError{StatusCode: 500, Message: "Could not access the database", Error: err}
		}
		defer tx.Rollback()

		_, err = tx.Exec("INSERT INTO users (email, group_id) VALUES ($1, $2)", email, groupID)
		if err != nil {
			log.Println("error inserting user:", err)
			return &errors.CustomError{StatusCode: 500, Message: "Failed to insert user", Error: err}
		}

		_, err = tx.Exec(`
			INSERT INTO user_tokens (email, token, token_type, expires_at)
			VALUES ($1, $2, 'invitation_token', NOW() + INTERVAL '7 days')
		`, email, invitationToken)
		if err != nil {
			log.Println("error inserting invitation token:", err)
			return &errors.CustomError{StatusCode: 500, Message: "Failed to insert invitation token", Error: err}
		}

		err = tx.Commit()
		if err != nil {
			log.Println("error committing transaction:", err)
			return &errors.CustomError{StatusCode: 500, Message: "Transaction commit failed", Error: err}
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
