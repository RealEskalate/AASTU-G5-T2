package usecase

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/repository"
	"a2sv_hub/internal/utils"
)

type GroupUsecase interface {
	CreateGroup(groupModel models.GroupModel) *errors.CustomError
	GetAllGroups() ([]models.GroupModel, *errors.CustomError)
	GetGroupById(id int) (models.GroupResponse, *errors.CustomError)
	UpdateGroup(id int, groupModel models.GroupModel) *errors.CustomError
	DeleteGroup(id int) *errors.CustomError
}

type groupUsecase struct {
	groupRepo    repository.GroupRepository
	tokenService utils.TokenService
	emailService utils.EmailService
}

// CreateGroup implements GroupUsecase.
func (g *groupUsecase) CreateGroup(groupModel models.GroupModel) *errors.CustomError {
	if err := g.groupRepo.CreateGroup(groupModel); err != nil {
		return err
	}
	return nil
}

// DeleteGroup implements GroupUsecase.
func (g *groupUsecase) DeleteGroup(id int) *errors.CustomError {
	if err := g.groupRepo.DeleteGroup(id); err != nil {
		return err
	}
	return nil
}

// GetAllGroups implements GroupUsecase.
func (g *groupUsecase) GetAllGroups() ([]models.GroupModel, *errors.CustomError) {
	groups, err := g.groupRepo.GetAllGroups()
	if err != nil {
		return nil, err
	}
	return groups, nil
}

// GetGroupById implements GroupUsecase.
func (g *groupUsecase) GetGroupById(id int) (models.GroupResponse, *errors.CustomError) {
	existingGroup, err := g.groupRepo.GetGroupById(id)
	if err != nil {
		return models.GroupResponse{}, err
	}
	students, err := g.groupRepo.GetUsersByGroupIdAndRole(id, "student")
	if err != nil {
		return models.GroupResponse{}, err
	}
	heads, err := g.groupRepo.GetUsersByGroupIdAndRole(id, "head")
	if err != nil {
		return models.GroupResponse{}, err
	}

	return models.GroupResponse{
		ID:          existingGroup.ID,
		Name:        existingGroup.Name,
		ShortName:   existingGroup.ShortName,
		Description: existingGroup.Description,
		Country:     existingGroup.Country,
		Hoa_id:      existingGroup.HOA,
		StudentList: students,
		HeadsList:   heads,
	}, nil

}

// UpdateGroup implements GroupUsecase.
func (g *groupUsecase) UpdateGroup(id int, groupModel models.GroupModel) *errors.CustomError {
	existingGroup, err := g.groupRepo.GetGroupById(id)
	if err != nil {
		return err
	}

	// Update only the fields that are not empty in the provided groupModel
	if groupModel.Name == "" {
		groupModel.Name = existingGroup.Name
	}
	if groupModel.ShortName == "" {
		groupModel.ShortName = existingGroup.ShortName
	}
	if groupModel.Description == "" {
		groupModel.Description = existingGroup.Description
	}
	if groupModel.HOA == 0 {
		groupModel.HOA = existingGroup.HOA
	}

	// Add similar checks for other fields as needed

	if updateErr := g.groupRepo.UpdateGroup(id, groupModel); updateErr != nil {
		return updateErr
	}

	return nil
}

func NewGroupUsecase(repo repository.GroupRepository, tokenService utils.TokenService, emailService utils.EmailService) GroupUsecase {
	return &groupUsecase{
		groupRepo:    repo,
		tokenService: tokenService,
		emailService: emailService,
	}
}
