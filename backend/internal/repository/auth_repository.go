package repository

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"database/sql"
	"log"
)

type AuthRepo interface {
	SaveUser(models.UserModel) error
	SaveUserEmailAndToken(email string, group string, invitation_tokens string) *errors.CustomError // user_tokens table
	GetSavedToken(email string) (string, *errors.CustomError)                                       // from user_tokens get invitation token
	SetPassword(email string, password string) *errors.CustomError
	GetUserByEmail(email string) (models.UserModel, *errors.CustomError)
	UpdateUserByEmail(email string, user models.UserModel) *errors.CustomError
	SendResetPasswordEmail(email string, token string) *errors.CustomError
}

type authRepo struct {
	db *sql.DB
}

// SendResetPasswordEmail implements AuthRepo.
func (a *authRepo) SendResetPasswordEmail(email string, token string) *errors.CustomError {
	panic("unimplemented")
}

// UpdateUserByEmail implements AuthRepo.
func (a *authRepo) UpdateUserByEmail(email string, user models.UserModel) *errors.CustomError {
	query := `
		UPDATE users 
		SET name = $1, university = $2, leetcode = $3, codeforces = $4, github = $5, 
			photo = $6, preferred_language = $7, hackerrank = $8, phone = $9, 
			telegram_username = $10, linkedin = $11, student_id = $12, short_bio = $13, 
			instagram = $14, birthday = $15, cv = $16, joined_date = $17, 
			expected_graduation_date = $18, mentor_name = $19, tshirt_color = $20, 
			tshirt_size = $21, gender = $22, code_of_conduct = $23, config = $24, 
			department = $25, inactive = $26, firstlogin = $27 
		WHERE email = $28
	`

	_, err := a.db.Exec(query, user.Name, user.University, user.LeetCode, user.Codeforces, user.GitHub,
		user.Photo, user.PreferredLanguage, user.HackerRank, user.Phone, user.TelegramUsername,
		user.LinkedIn, user.StudentID, user.ShortBio, user.Instagram, user.Birthday, user.CV,
		user.JoinedDate, user.ExpectedGraduationDate, user.MentorName, user.TShirtColor,
		user.TShirtSize, user.Gender, user.CodeOfConduct, user.Config, user.Department,
		user.Inactive, user.FirstLogin, email)
	if err != nil {
		log.Println("error updating user by email:", err)
		return &errors.CustomError{StatusCode: 500, Message: "Failed to update user", Error: err}
	}

	return nil
}

// GetUserByEmail implements AuthRepo.
func (a *authRepo) GetUserByEmail(email string) (models.UserModel, *errors.CustomError) {
	var user models.UserModel

	query := `
		SELECT 
			u.id,
			COALESCE(r.type, '') AS role,
			COALESCE(u.name, '') AS name,
			COALESCE(c.name, '') AS country,
			COALESCE(u.university, '') AS university,
			u.email,
			COALESCE(u.leetcode, '') AS leetcode,
			COALESCE(u.codeforces, '') AS codeforces,
			COALESCE(u.github, '') AS github,
			COALESCE(u.photo, '') AS photo,
			COALESCE(u.preferred_language, '') AS preferred_language,
			COALESCE(u.hackerrank, '') AS hackerrank,
			COALESCE(g.short_name, '') AS group_name,
			COALESCE(u.phone, '') AS phone,
			COALESCE(u.telegram_username, '') AS telegram_username,
			COALESCE(u.telegram_uid, '') AS telegram_uid,
			COALESCE(u.linkedin, '') AS linkedin,
			COALESCE(u.student_id, '') AS student_id,
			COALESCE(u.short_bio, '') AS short_bio,
			COALESCE(u.instagram, '') AS instagram,
			COALESCE(u.birthday, '1970-01-01') AS birthday,
			COALESCE(u.cv, '') AS cv,
			COALESCE(u.joined_date, '1970-01-01') AS joined_date,
			COALESCE(u.expected_graduation_date, '1970-01-01') AS expected_graduation_date,
			COALESCE(u.mentor_name, '') AS mentor_name,
			COALESCE(u.tshirt_color, '') AS tshirt_color,
			COALESCE(u.tshirt_size, '') AS tshirt_size,
			COALESCE(u.gender, '') AS gender,
			COALESCE(u.code_of_conduct, '') AS code_of_conduct,
			COALESCE(u.password, '') AS password,
			COALESCE(u.created_at, NOW()) AS created_at,
			COALESCE(u.updated_at, NOW()) AS updated_at,
			COALESCE(u.config, '') AS config,
			COALESCE(u.department, '') AS department,
			COALESCE(u.inactive, false) AS inactive,
			COALESCE(u.firstlogin, false) AS firstlogin
		FROM users u
		LEFT JOIN countries c ON u.country_id = c.id
		LEFT JOIN roles r ON u.role_id = r.id
		LEFT JOIN groups g ON u.group_id = g.id
		WHERE u.email = $1
	`

	err := a.db.QueryRow(query, email).Scan(
		&user.ID,
		&user.Role,
		&user.Name,
		&user.Country,
		&user.University,
		&user.Email,
		&user.LeetCode,
		&user.Codeforces,
		&user.GitHub,
		&user.Photo,
		&user.PreferredLanguage,
		&user.HackerRank,
		&user.Group,
		&user.Phone,
		&user.TelegramUsername,
		&user.TelegramUID,
		&user.LinkedIn,
		&user.StudentID,
		&user.ShortBio,
		&user.Instagram,
		&user.Birthday,
		&user.CV,
		&user.JoinedDate,
		&user.ExpectedGraduationDate,
		&user.MentorName,
		&user.TShirtColor,
		&user.TShirtSize,
		&user.Gender,
		&user.CodeOfConduct,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
		&user.Config,
		&user.Department,
		&user.Inactive,
		&user.FirstLogin,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return models.UserModel{}, &errors.CustomError{StatusCode: 404, Message: "User not found"}
		}
		log.Println("DB error fetching user:", err)
		return models.UserModel{}, &errors.CustomError{StatusCode: 500, Message: "Error fetching user", Error: err}
	}

	return user, nil
}

// GetSavedToken implements AuthRepo.
func (a *authRepo) GetSavedToken(email string) (string, *errors.CustomError) {
	var token string
	err := a.db.QueryRow("SELECT token FROM user_tokens WHERE email = $1 AND token_type = 'invitation_token'", email).Scan(&token)
	if err != nil {
		if err == sql.ErrNoRows {
			return "", &errors.CustomError{StatusCode: 404, Message: "Invalid token"}
		}
		log.Println("error retrieving token from user_tokens table", err)
		return "", &errors.CustomError{StatusCode: 500, Message: "error retrieving token from db", Error: err}
	}
	return token, nil
}

// SetPassword implements AuthRepo.
func (a *authRepo) SetPassword(email string, password string) *errors.CustomError {

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

// SaveUser implements AuthRepo.  this is just for super admin only
func (a *authRepo) SaveUser(user models.UserModel) error {
	var roleID, countryID int

	// Fetch role_id from roles table
	err := a.db.QueryRow("SELECT id FROM roles WHERE type = $1", user.Role).Scan(&roleID)
	if err != nil {
		log.Println("error fetching role_id:", err)
		return err
	}

	// Fetch country_id from countries table
	err = a.db.QueryRow("SELECT id FROM countries WHERE name = $1", user.Country).Scan(&countryID)
	if err != nil {
		log.Println("error fetching country_id:", err)
		return err
	}

	query := `
		INSERT INTO users (role_id, name, country_id, university, email, password) 
		VALUES ($1, $2, $3, $4, $5, $6)
	`

	log.Println("Inserting user with role_id and country_id", roleID, countryID)
	_, err = a.db.Exec(query, roleID, user.Name, countryID, user.University, user.Email, user.Password)
	if err != nil {
		log.Println("error inserting into users table:", err)
		return err
	}
	return nil
}

func NewAuthRepo(db *sql.DB) AuthRepo {
	return &authRepo{
		db: db,
	}
}
