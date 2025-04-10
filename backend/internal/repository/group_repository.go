package repository

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"database/sql"
)

type GroupRepository interface {
	CreateGroup(groupModel models.GroupModel) *errors.CustomError
	GetAllGroups() ([]models.GroupModel, *errors.CustomError)
	GetGroupById(id int) (models.GroupModel, *errors.CustomError)
	UpdateGroup(id int, groupModel models.GroupModel) *errors.CustomError
	DeleteGroup(id int) *errors.CustomError

	// helper functions
	GetUsersByGroupIdAndRole(id int, role string) ([]models.UserProfileResponse, *errors.CustomError)
}

type groupRepository struct {
	db *sql.DB
}

// GetUsersByGroupIdAndRole implements GroupRepository.
func (g *groupRepository) GetUsersByGroupIdAndRole(id int, role string) ([]models.UserProfileResponse, *errors.CustomError) {
	var users []models.UserProfileResponse

	query := `
		SELECT 
			u.id,
			COALESCE(u.name, '') AS name,
			COALESCE(u.email, '') AS email,
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
			COALESCE(g.name, '') AS group_name,
			COALESCE(u.department, '') AS department
		FROM users u
		LEFT JOIN countries c ON u.country_id = c.id
		LEFT JOIN groups g ON u.group_id = g.id
		LEFT JOIN roles r ON u.role_id = r.id
		WHERE u.group_id = $1 AND r.type = $2
	`

	rows, err := g.db.Query(query, id, role)
	if err != nil {
		return nil, &errors.CustomError{StatusCode: 400, Message: "Failed to retrieve users", Error: err}
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
			return nil, &errors.CustomError{StatusCode: 400, Message: "Failed to scan user row", Error: err}
		}

		users = append(users, user)
	}

	if err = rows.Err(); err != nil {
		return nil, &errors.CustomError{StatusCode: 400, Message: "Error iterating over user rows", Error: err}
	}

	return users, nil
}

// DeleteGroup implements GroupRepository.
func (g *groupRepository) DeleteGroup(id int) *errors.CustomError {
	// Check if there are any users related to the group
	var userCount int
	query := "SELECT COUNT(*) FROM users WHERE group_id = $1"
	err := g.db.QueryRow(query, id).Scan(&userCount)
	if err != nil {
		return &errors.CustomError{StatusCode: 400, Message: "Failed to check related users", Error: err}
	}

	if userCount > 0 {
		return &errors.CustomError{StatusCode: 400, Message: "Cannot delete group; students are assigned to it"}
	}

	// Delete the group from the groups table
	query = "DELETE FROM groups WHERE id = $1"
	_, err = g.db.Exec(query, id)
	if err != nil {
		return &errors.CustomError{StatusCode: 400, Message: "Failed to delete group", Error: err}
	}

	return nil
}

// GetGroupById implements GroupRepository.
func (g *groupRepository) GetGroupById(id int) (models.GroupModel, *errors.CustomError) {
	var group models.GroupModel
	var countryName sql.NullString
	var hoaID sql.NullInt64

	query := `
		SELECT 
			g.id, g.name, g.short_name, g.description, 
			c.name AS country_name, 
			g.hoa_id
		FROM 
			groups g
		LEFT JOIN 
			countries c ON g.country_id = c.id
		WHERE 
			g.id = $1
	`

	err := g.db.QueryRow(query, id).Scan(
		&group.ID, &group.Name, &group.ShortName, &group.Description,
		&countryName, &hoaID,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return models.GroupModel{}, &errors.CustomError{StatusCode: 404, Message: "Group not found"}
		}
		return models.GroupModel{}, &errors.CustomError{StatusCode: 400, Message: "Failed to retrieve group", Error: err}
	}

	group.Country = countryName.String
	if hoaID.Valid && hoaID.Int64 != 0 {
		hoa := int(hoaID.Int64)
		group.HOA = &hoa
	} else {
		group.HOA = nil
	}

	return group, nil
}

// UpdateGroup implements GroupRepository.
func (g *groupRepository) UpdateGroup(id int, groupModel models.GroupModel) *errors.CustomError {
	// Update the group details
	query := `
		UPDATE groups 
		SET name = $1, short_name = $2, description = $3, country_id = $4, hoa_id = $5, updated_at = NOW()
		WHERE id = $6
	`

	// Get the country_id from the countries table (case insensitive)
	var countryID int
	countryQuery := "SELECT id FROM countries WHERE LOWER(name) = LOWER($1)"
	err := g.db.QueryRow(countryQuery, groupModel.Country).Scan(&countryID)
	if err != nil {
		if err == sql.ErrNoRows {
			return &errors.CustomError{StatusCode: 400, Message: "Country not found", Error: err}
		}
		return &errors.CustomError{StatusCode: 400, Message: "Failed to retrieve country_id", Error: err}
	}

	// Check if HOA exists
	if groupModel.HOA != nil {
		var hoaExists bool
		hoaQuery := "SELECT EXISTS(SELECT 1 FROM users WHERE id = $1)"
		err = g.db.QueryRow(hoaQuery, groupModel.HOA).Scan(&hoaExists)
		if err != nil {
			return &errors.CustomError{StatusCode: 400, Message: "Failed to check HOA existence", Error: err}
		}
		if !hoaExists {
			return &errors.CustomError{StatusCode: 400, Message: "HOA not found in users table"}
		}
	}

	// Execute update
	_, err = g.db.Exec(query, groupModel.Name, groupModel.ShortName, groupModel.Description, countryID, groupModel.HOA, id)
	if err != nil {
		return &errors.CustomError{StatusCode: 400, Message: "Failed to update group", Error: err}
	}

	return nil
}

// CreateGroup implements GroupRepository.
func (g *groupRepository) CreateGroup(groupModel models.GroupModel) *errors.CustomError {
	// Check if the short_name already exists in the groups table (case insensitive)
	var exists bool
	query := "SELECT EXISTS(SELECT 1 FROM groups WHERE LOWER(short_name) = LOWER($1))"
	err := g.db.QueryRow(query, groupModel.ShortName).Scan(&exists)
	if err != nil {
		return &errors.CustomError{StatusCode: 400, Message: "Failed to check if short_name exists", Error: err}
	}
	if exists {
		return &errors.CustomError{StatusCode: 400, Message: "A group with the same short_name already exists"}
	}

	// Check if the HOA (Head of Association) exists in the users table
	if groupModel.HOA != nil {
		var hoaExists bool
		query = "SELECT EXISTS(SELECT 1 FROM users WHERE id = $1)"
		err = g.db.QueryRow(query, groupModel.HOA).Scan(&hoaExists)
		if err != nil {
			return &errors.CustomError{StatusCode: 400, Message: "Failed to check HOA existence", Error: err}
		}
		if !hoaExists {
			return &errors.CustomError{StatusCode: 400, Message: "HOA not found in users table"}
		}
	}

	// Get the country_id from the countries table (case insensitive)
	var countryID int

	query = "SELECT id FROM countries WHERE LOWER(name) = LOWER($1)"
	err = g.db.QueryRow(query, groupModel.Country).Scan(&countryID)
	if err != nil {
		if err == sql.ErrNoRows {
			return &errors.CustomError{StatusCode: 400, Message: "Country not found", Error: err}
		}
		return &errors.CustomError{StatusCode: 400, Message: "Failed to retrieve country_id", Error: err}
	}

	query = `
	INSERT INTO groups (name, short_name, description, country_id, hoa_id, created_at, updated_at)
	VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
	`
	_, err = g.db.Exec(query, groupModel.Name, groupModel.ShortName, groupModel.Description, countryID, groupModel.HOA)
	if err != nil {
		return &errors.CustomError{StatusCode: 400, Message: "Failed to insert group", Error: err}
	}

	return nil

}

// GetAllGroups implements GroupRepository.
func (g *groupRepository) GetAllGroups() ([]models.GroupModel, *errors.CustomError) {
	var groups []models.GroupModel

	query := `
		SELECT 
			g.id, g.name, g.short_name, g.description, 
			c.name AS country_name, 
			CASE WHEN g.hoa_id IS NOT NULL THEN COALESCE(u.id, 0) ELSE 0 END AS hoa_id,
			g.created_at, g.updated_at
		FROM 
			groups g
		LEFT JOIN 
			countries c ON g.country_id = c.id
		LEFT JOIN 
			users u ON g.hoa_id = u.id AND g.hoa_id IS NOT NULL
	`

	rows, err := g.db.Query(query)
	if err != nil {
		return nil, &errors.CustomError{StatusCode: 400, Message: "Failed to retrieve groups", Error: err}
	}
	defer rows.Close()

	for rows.Next() {
		var group models.GroupModel
		var countryName sql.NullString
		var hoeID sql.NullInt64
		var createdAt, updatedAt sql.NullTime

		err := rows.Scan(&group.ID, &group.Name, &group.ShortName, &group.Description, &countryName, &hoeID, &createdAt, &updatedAt)
		if err != nil {
			return nil, &errors.CustomError{StatusCode: 400, Message: "Failed to scan group row", Error: err}
		}

		group.Country = countryName.String
		if hoeID.Valid {
			hoa := int(hoeID.Int64)
			group.HOA = &hoa
		} else {
			group.HOA = nil
		}
		if createdAt.Valid {
			group.CreatedAt = createdAt.Time.Format("2006-01-02 15:04:05")
		}
		if updatedAt.Valid {
			group.UpdatedAt = updatedAt.Time.Format("2006-01-02 15:04:05")
		}
		groups = append(groups, group)
	}

	if err = rows.Err(); err != nil {
		return nil, &errors.CustomError{StatusCode: 400, Message: "Error iterating over group rows", Error: err}
	}

	return groups, nil
}

func NewGroupRepository(db *sql.DB) GroupRepository {
	return &groupRepository{
		db: db,
	}
}
