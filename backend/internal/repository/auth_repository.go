package repository

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"database/sql"
	"log"
)

type AuthRepo interface {
	PromoteUser(email string, role string, group string) *errors.CustomError
	SaveUser(models.UserModel) error
	SaveUserEmailAndToken(email string, group string, invitation_tokens string) *errors.CustomError // user_tokens table
	GetSavedToken(email string, token_type string) (string, *errors.CustomError)                    // from user_tokens get invitation token
	SetPassword(email string, password string) *errors.CustomError
	GetUserByEmail(email string) (models.UserModel, *errors.CustomError)
	UpdateUserByEmail(email string, user models.UserModel) *errors.CustomError
	GetUserProfileByID(id int) (models.UserModel, *errors.CustomError)
	GetAllUsers(group, country, name string) ([]*models.UserProfileResponse, *errors.CustomError)
}

type authRepo struct {
	db *sql.DB
}

// GetAllUsers implements AuthRepo.
func (a *authRepo) GetAllUsers(group string, country string, name string) ([]*models.UserProfileResponse, *errors.CustomError) {
	var users []*models.UserProfileResponse
	query := `
		SELECT 
			u.id,
			COALESCE(u.name, '') AS name,
			u.email,
			COALESCE(u.photo, '') AS photo,
			COALESCE(u.university, '') AS university,
			COALESCE(r.type, '') AS role,
			COALESCE(c.name, '') AS country,
			COALESCE(u.joined_date, '1970-01-01') AS joined_date,
			COALESCE(u.expected_graduation_date, '1970-01-01') AS expected_graduation_date,
			COALESCE(u.short_bio, '') AS short_bio,
			COALESCE(u.leetcode, '') AS leetcode,
			COALESCE(u.codeforces, '') AS codeforces,
			COALESCE(u.github, '') AS github,
			COALESCE(u.instagram, '') AS instagram,
			COALESCE(u.phone, '') AS phone,
			COALESCE(u.student_id, '') AS student_id,
			COALESCE(u.telegram_username, '') AS telegram_username,
			COALESCE(g.short_name, '') AS group_name,
			COALESCE(u.department, '') AS department
		FROM users u
		LEFT JOIN countries c ON u.country_id = c.id
		LEFT JOIN roles r ON u.role_id = r.id
		LEFT JOIN groups g ON u.group_id = g.id
		WHERE 
			($1 = '' OR LOWER(g.short_name) = LOWER($1)) AND
			($2 = '' OR LOWER(c.name) = LOWER($2)) AND
			($3 = '' OR LOWER(u.name) LIKE LOWER('%' || $3 || '%'))
	`

	rows, err := a.db.Query(query, group, country, name)
	if err != nil {
		log.Println("Error querying users:", err)
		return nil, &errors.CustomError{StatusCode: 500, Message: "Error fetching users", Error: err}
	}
	defer rows.Close()

	for rows.Next() {
		var user models.UserProfileResponse
		err := rows.Scan(
			&user.ID,
			&user.Name,
			&user.Email,
			&user.Photo,
			&user.University,
			&user.Role,
			&user.Country,
			&user.JoinedDate,
			&user.ExpectedGraduationDate,
			&user.ShortBio,
			&user.LeetCode,
			&user.Codeforces,
			&user.GitHub,
			&user.Instagram,
			&user.Phone,
			&user.StudentID,
			&user.TelegramUsername,
			&user.Group,
			&user.Department,
		)
		if err != nil {
			log.Println("Error scanning user row:", err)
			return nil, &errors.CustomError{StatusCode: 500, Message: "Error processing user data", Error: err}
		}
		users = append(users, &user)
	}

	if err = rows.Err(); err != nil {
		log.Println("Error iterating over user rows:", err)
		return nil, &errors.CustomError{StatusCode: 500, Message: "Error iterating user data", Error: err}
	}

	return users, nil
}

// GetUserProfileByID implements AuthRepo.
func (a *authRepo) GetUserProfileByID(id int) (models.UserModel, *errors.CustomError) {
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
		WHERE u.id = $1
	`

	err := a.db.QueryRow(query, id).Scan(
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

// PromoteUsers implements AuthRepo.
func (a *authRepo) PromoteUser(email string, role string, group string) *errors.CustomError {
	var roleID, groupID int

	// Check if the role exists in the roles table
	err := a.db.QueryRow("SELECT id FROM roles WHERE type = $1", role).Scan(&roleID)
	if err != nil {
		if err == sql.ErrNoRows {
			log.Println("Role does not exist:", role)
			return &errors.CustomError{StatusCode: 400, Message: "Invalid role"}
		}
		log.Println("Error checking role existence:", err)
		return &errors.CustomError{StatusCode: 500, Message: "Database error", Error: err}
	}

	// Check if the group exists in the groups table
	err = a.db.QueryRow("SELECT id FROM groups WHERE LOWER(short_name) = LOWER($1)", group).Scan(&groupID)
	if err != nil {
		if err == sql.ErrNoRows {
			log.Println("Group does not exist:", group)
			return &errors.CustomError{StatusCode: 400, Message: "Invalid group"}
		}
		log.Println("Error checking group existence:", err)
		return &errors.CustomError{StatusCode: 500, Message: "Database error", Error: err}
	}

	// Update the user's role_id and group_id in the users table
	query := "UPDATE users SET role_id = $1, group_id = $2 WHERE email = $3"
	_, err = a.db.Exec(query, roleID, groupID, email)
	if err != nil {
		log.Println("Error updating user role and group:", err)
		return &errors.CustomError{StatusCode: 500, Message: "Failed to update user role and group", Error: err}
	}

	return nil
}

// UpdateUserByEmail implements AuthRepo.
func (a *authRepo) UpdateUserByEmail(email string, user models.UserModel) *errors.CustomError {
	log.Println("Updating user with email:", email, user, user.Gender)
	query := `
	UPDATE users 
	SET 
		name = COALESCE(NULLIF($1, ''), NULL), 
		university = COALESCE(NULLIF($2, ''), NULL), 
		leetcode = COALESCE(NULLIF($3, ''), NULL),
		codeforces = COALESCE(NULLIF($4, ''), NULL),
		github = COALESCE(NULLIF($5, ''), NULL),
		photo = COALESCE(NULLIF($6, ''), NULL),
		preferred_language = COALESCE(NULLIF($7, ''), NULL),
		hackerrank = COALESCE(NULLIF($8, ''), NULL),
		phone = COALESCE(NULLIF($9, ''), NULL),
		telegram_username = COALESCE(NULLIF($10, ''), NULL),
		linkedin = COALESCE(NULLIF($11, ''), NULL),
		student_id = COALESCE(NULLIF($12, ''), NULL),
		short_bio = COALESCE(NULLIF($13, ''), NULL),
		instagram = COALESCE(NULLIF($14, ''), NULL),
		birthday = COALESCE(NULLIF($15, ''), NULL)::timestamp, -- Casting to timestamp
		cv = COALESCE(NULLIF($16, ''), NULL),
		joined_date = COALESCE(NULLIF($17, ''), NULL)::timestamp, -- Casting to timestamp
		expected_graduation_date = COALESCE(NULLIF($18, ''), NULL)::timestamp, -- Casting to timestamp
		mentor_name = COALESCE(NULLIF($19, ''), NULL),
		tshirt_color = COALESCE(NULLIF($20, ''), NULL),
		tshirt_size = COALESCE(NULLIF($21, ''), NULL),
		gender = COALESCE(NULLIF($22, ''), NULL),
		code_of_conduct = COALESCE(NULLIF($23, ''), NULL),
		config = COALESCE(NULLIF($24, ''), NULL),
		department = COALESCE(NULLIF($25, ''), NULL),
		inactive = $26,
		firstlogin = $27
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
func (a *authRepo) GetSavedToken(email string, token_type string) (string, *errors.CustomError) {
	var token string
	err := a.db.QueryRow("SELECT token FROM user_tokens WHERE email = $1 AND token_type = $2 ", email, token_type).Scan(&token)
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
