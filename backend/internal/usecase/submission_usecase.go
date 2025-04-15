package usecase

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/repository"
	"time"
)

type SubmissionUsecase interface {
	Submit(submission models.SubmissionModel) *errors.CustomError
}

type submissionUsecase struct {
	repo repository.SubmissionRepository
}

func NewSubmissionUsecase(repo repository.SubmissionRepository) SubmissionUsecase {
	return &submissionUsecase{repo: repo}
}

func (u *submissionUsecase) Submit(sub models.SubmissionModel) *errors.CustomError {
	sub.CreatedAt = time.Now().Format(time.RFC3339)
	sub.UpdatedAt = sub.CreatedAt
	sub.Verified = false // default on submit
	return u.repo.CreateSubmission(sub)
}
