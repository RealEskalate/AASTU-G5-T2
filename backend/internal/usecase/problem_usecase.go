package usecase

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/repository"
)

type ProblemUsecase interface {
	GetAllProblems() ([]models.ProblemModel, *errors.CustomError)
	
}

type problemUsecase struct {
	problemRepo repository.ProblemRepository
}

func NewProblemUsecase(repo repository.ProblemRepository) ProblemUsecase {
	return &problemUsecase{
		problemRepo: repo,
	}
}

func (p *problemUsecase) GetAllProblems() ([]models.ProblemModel, *errors.CustomError) {
	problems, err := p.problemRepo.GetAllProblems()
	if err != nil {
		return nil, err
	}
	return problems, nil
}

