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
			u.id, u.name, u.email, u.photo, u.university, u.role, 
			c.name AS country, u.joined_date, u.expected_graduation_date, 
			u.short_bio, u.leetcode, u.codeforces, u.github, u.instagram, 
			u.phone, u.student_id, u.telegram_username, g.name AS group_name, 
			u.department
		FROM 
			users u
		LEFT JOIN 
			countries c ON u.country_id = c.id
		LEFT JOIN 
			groups g ON u.group_id = g.id
		WHERE 
			u.group_id = ? AND u.role = ?
	`

	rows, err := g.db.Query(query, id, role)
	if err != nil {
		return nil, &errors.CustomError{StatusCode: 400, Message: "Failed to retrieve users", Error: err}
	}
	defer rows.Close()

	for rows.Next() {
		var user models.UserProfileResponse
		err := rows.Scan(
			&user.ID, &user.Name, &user.Email, &user.Photo, &user.University, &user.Role,
			&user.Country, &user.JoinedDate, &user.ExpectedGraduationDate, &user.ShortBio,
			&user.LeetCode, &user.Codeforces, &user.GitHub, &user.Instagram, &user.Phone,
			&user.StudentID, &user.TelegramUsername, &user.Group, &user.Department,
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
	query := "SELECT COUNT(*) FROM users WHERE group_id = ?"
	err := g.db.QueryRow(query, id).Scan(&userCount)
	if err != nil {
		return &errors.CustomError{StatusCode: 400, Message: "Failed to check related users", Error: err}
	}

	if userCount > 0 {
		return &errors.CustomError{StatusCode: 400, Message: "Cannot delete group students are assigned to it"}
	}

	// Delete the group from the groups table
	query = "DELETE FROM groups WHERE id = ?"
	_, err = g.db.Exec(query, id)
	if err != nil {
		return &errors.CustomError{StatusCode: 400, Message: "Failed to delete group", Error: err}
	}

	return nil
}

// GetGroupById implements GroupRepository.
func (g *groupRepository) GetGroupById(id int) (models.GroupModel, *errors.CustomError) {
	panic("unimplemented")
}

// UpdateGroup implements GroupRepository.
func (g *groupRepository) UpdateGroup(id int, groupModel models.GroupModel) *errors.CustomError {

	// Update the group details
	query := `
		UPDATE groups 
		SET name = ?, short_name = ?, description = ?, country_id = ?, hoa_id = ?
		WHERE id = ?
	`

	// Get the country_id from the countries table (case insensitive)
	var countryID int
	countryQuery := "SELECT id FROM countries WHERE LOWER(name) = LOWER(?)"
	err := g.db.QueryRow(countryQuery, groupModel.Country).Scan(&countryID)
	if err != nil {
		if err == sql.ErrNoRows {
			return &errors.CustomError{StatusCode: 400, Message: "Country not found", Error: err}
		}
		return &errors.CustomError{StatusCode: 400, Message: "Failed to retrieve country_id", Error: err}
	}

	if groupModel.HOA != 0 {
		var hoaExists bool
		query = "SELECT EXISTS(SELECT 1 FROM users WHERE id = ?)"
		err = g.db.QueryRow(query, groupModel.HOA).Scan(&hoaExists)
		if err != nil {
			return &errors.CustomError{StatusCode: 400, Message: "Failed to check HOA existence", Error: err}
		}
		if !hoaExists {
			return &errors.CustomError{StatusCode: 400, Message: "HOA not found in users table"}
		}
	}

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
	query := "SELECT EXISTS(SELECT 1 FROM groups WHERE LOWER(short_name) = LOWER(?))"
	err := g.db.QueryRow(query, groupModel.ShortName).Scan(&exists)
	if err != nil {
		return &errors.CustomError{StatusCode: 400, Message: "Failed to check short_name existence", Error: err}

	}
	if exists {
		return &errors.CustomError{StatusCode: 400, Message: "Group with the same short_name already exists", Error: err}

	}
	// Check if the HOA (Head of Association) exists in the users table
	if groupModel.HOA != 0 {
		var hoaExists bool
		query = "SELECT EXISTS(SELECT 1 FROM users WHERE id = ?)"
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
	query = "SELECT id FROM countries WHERE LOWER(name) = LOWER(?)"
	err = g.db.QueryRow(query, groupModel.Country).Scan(&countryID)
	if err != nil {
		if err == sql.ErrNoRows {
			return &errors.CustomError{StatusCode: 400, Message: "Country not found", Error: err}

		}
		return &errors.CustomError{StatusCode: 400, Message: "Failed to retrieve country_id", Error: err}

	}

	// Insert the new group into the groups table
	query = "INSERT INTO groups (name, short_name, description, country_id,hoa_id) VALUES (?, ?, ?, ?, ?)"
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
			COALESCE(u.name, '') AS hoe_name
		FROM 
			groups g
		LEFT JOIN 
			countries c ON g.country_id = c.id
		LEFT JOIN 
			users u ON g.hoe_id = u.id
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

		err := rows.Scan(&group.ID, &group.Name, &group.ShortName, &group.Description, &countryName, &hoeID)
		if err != nil {
			return nil, &errors.CustomError{StatusCode: 400, Message: "Failed to scan group row", Error: err}
		}

		group.Country = countryName.String
		group.HOA = int(hoeID.Int64)
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
