package usecase

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/repository"
)

type ProblemUsecase interface {
	GetDailyProblem() (*models.DailyResponse, *errors.CustomError)
	GetAllProblems(page, limit int) ([]models.Problem, *errors.CustomError)
	GetProblemById(id int) (models.Problem, *errors.CustomError)
	AddProblem(problem models.Problem) *errors.CustomError
	AddProblemToTrack(problemID int, trackID string) *errors.CustomError
}

type problemUsecase struct {
	problemRepo repository.ProblemRepository
}

// GetDailyProblem implements ProblemUsecase.
func (p *problemUsecase) GetDailyProblem() (*models.DailyResponse, *errors.CustomError) {
	dailyProblem, err := p.problemRepo.GetDailyProblem()
	if err != nil {
		return nil, err
	}
	return dailyProblem, nil
}

func NewProblemUsecase(repo repository.ProblemRepository) ProblemUsecase {
	return &problemUsecase{
		problemRepo: repo,
	}
}

func (p *problemUsecase) GetAllProblems(page, limit int) ([]models.Problem, *errors.CustomError) {
	problems, err := p.problemRepo.GetAllProblems(page, limit)
	if err != nil {
		return nil, err
	}
	return problems, nil
}

func (p *problemUsecase) GetProblemById(id int) (models.Problem, *errors.CustomError) {
	problem, err := p.problemRepo.GetProblemById(id)
	if err != nil {
		return models.Problem{}, err
	}

	return problem, nil
}

func (p *problemUsecase) AddProblem(problem models.Problem) *errors.CustomError {
	return p.problemRepo.AddProblem(problem)
}

func (p *problemUsecase) AddProblemToTrack(problemID int, trackID string) *errors.CustomError {
	return p.problemRepo.AddProblemToTrack(problemID, trackID)
}
