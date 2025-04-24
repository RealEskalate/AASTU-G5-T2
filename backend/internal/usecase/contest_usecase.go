package usecase

import (
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/repository"
)

type CodeforcesUsecase interface {
    GetContest(contestID int) (*models.Contest, error)
    GetProblems(contestID int) ([]models.Problem, error)
    GetStandings(contestID int) ([]models.RanklistRow, error)
    GetSubmissions(contestID int, from, count int) ([]models.Submission, error)
    AddContest(contestName, contestLink string) (int, error)
    GetAllContests() ([]models.Contest, error)
    GetUserContestProblems(userID int) (map[string][]models.ContestProblem, error)
}

type codeforcesUsecase struct {
    repo repository.CodeforcesRepository
}

func NewCodeforcesUsecase(repo repository.CodeforcesRepository) CodeforcesUsecase {
    return &codeforcesUsecase{repo: repo}
}

func (u *codeforcesUsecase) GetContest(contestID int) (*models.Contest, error) {
    return u.repo.GetContestFromDB(contestID)
}

func (u *codeforcesUsecase) GetProblems(contestID int) ([]models.Problem, error) {
    return u.repo.GetProblemsFromDB(contestID)
}

func (u *codeforcesUsecase) GetStandings(contestID int) ([]models.RanklistRow, error) {
    standings, err := u.repo.GetStandings(contestID, true)
    if err != nil {
        return nil, err
    }
    return standings.Result.Rows, nil
}

func (u *codeforcesUsecase) GetSubmissions(contestID int, from, count int) ([]models.Submission, error) {
    status, err := u.repo.GetSubmissions(contestID, true, from, count)
    if err != nil {
        return nil, err
    }
    return status.Result, nil
}

func (u *codeforcesUsecase) AddContest(contestName, contestLink string) (int, error) {
    return u.repo.AddContest(contestName, contestLink)
}

func (u *codeforcesUsecase) GetAllContests() ([]models.Contest, error) {
    return u.repo.GetAllContests()
}
func (u *codeforcesUsecase) GetUserContestProblems(userID int) (map[string][]models.ContestProblem, error) {
    return u.repo.GetUserContestProblems(userID)
}