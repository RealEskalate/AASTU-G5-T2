package usecase

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/repository"
	"a2sv_hub/internal/utils"
)

type AuthUsecase interface {
	RegisterUser(models.UserModel) (string, string, *errors.CustomError)
	SendInvitationToken(string, string) *errors.CustomError
	SetPassword(string, string) *errors.CustomError
}

type authUsecase struct {
	authRepo        repository.AuthRepo
	tokenService    utils.TokenService
	passwordService utils.PasswordService
	emailService    utils.EmailService
}

// SetPassword implements AuthUsecase.
func (a *authUsecase) SetPassword(token string, password string) *errors.CustomError {
	// token validation
	email, tokenType, _, err := a.tokenService.ValidateToken(token)
	if err != nil {
		return &errors.CustomError{StatusCode: 401, Message: "invalid token", Error: err}
	}
	if tokenType != "invitation" {
		return &errors.CustomError{StatusCode: 401, Message: "invalid token type", Error: err}
	}

	// hash password
	hashedPassword, err := a.passwordService.HashPassword(password)
	if err != nil {
		return &errors.CustomError{StatusCode: 500, Message: "failed to hash password", Error: err}
	}

	// store on the db
	customerr := a.authRepo.SetPassword(email, hashedPassword)
	if customerr != nil {
		return customerr
	}

	return nil

}

// SendInvitationToken implements AuthUsecase.
func (a *authUsecase) SendInvitationToken(email string, group string) *errors.CustomError {
	// generate token
	invitation_token, err := a.tokenService.GenerateToken(email, "invitation", "student")
	if err != nil {
		return &errors.CustomError{StatusCode: 500, Message: "failed to generate token", Error: err}
	}

	// send invitation

	err = a.emailService.SendInvitationEmail(email, invitation_token)
	if err != nil {
		return &errors.CustomError{StatusCode: 500, Message: "failed to send email", Error: err}
	}

	// add to the user to the db if it doesn't exist before

	customerr := a.authRepo.SaveUserEmail(email, group)
	if err != nil {
		return customerr
	}

	return nil
}

// RegisterUser implements AuthUsecase.
func (a *authUsecase) RegisterUser(user models.UserModel) (string, string, *errors.CustomError) {

	hashedPassword, err := a.passwordService.HashPassword(user.Password)
	if err != nil {
		return "", "", &errors.CustomError{StatusCode: 500, Message: "failed to hash password", Error: err}
	}

	user.Password = hashedPassword

	access_token, err := a.tokenService.GenerateToken(user.Email, "access_token", "super_admin")
	if err != nil {
		return "", "", &errors.CustomError{StatusCode: 500, Message: "failed to generate token", Error: err}
	}

	refresh_token, err := a.tokenService.GenerateToken(user.Email, "refresh", "super_admin")
	if err != nil {
		return "", "", &errors.CustomError{StatusCode: 500, Message: "failed to generate refresh token", Error: err}
	}

	err = a.authRepo.SaveUser(user, access_token)
	if err != nil {
		return "", "", &errors.CustomError{StatusCode: 500, Message: "failed to save the user", Error: err}
	}

	return access_token, refresh_token, nil
}

func NewAuthUsecase(repo repository.AuthRepo, tokenService utils.TokenService, passwordService utils.PasswordService, emailService utils.EmailService) AuthUsecase {
	return &authUsecase{authRepo: repo,
		tokenService:    tokenService,
		passwordService: passwordService,
		emailService:    emailService}

}
