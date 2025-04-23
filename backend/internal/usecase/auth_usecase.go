package usecase

import (
	"a2sv_hub/internal/errors"
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/repository"
	"a2sv_hub/internal/utils"
	"log"
)

type AuthUsecase interface {
	PromoteUser(string, string, string) *errors.CustomError
	RegisterUser(models.UserModel) (string, string, *errors.CustomError)
	SendInvitationToken(string, string) *errors.CustomError
	SetPassword(string, string) *errors.CustomError
	LoginUser(string, string) (string, string, *errors.CustomError)
	RefreshToken(token string) (string, string, *errors.CustomError)
	UpdateProfile(token string, user models.UserModel) *errors.CustomError
	GetProfileByEmail(token string) (models.UserModel, *errors.CustomError)
	RequestResetPassword(string) *errors.CustomError
	UserProfile(id int) (*models.UserModel, *errors.CustomError)
	// GetUserByID(id string) (models.UserModel, *errors.CustomError)
}

type authUsecase struct {
	authRepo        repository.AuthRepo
	tokenService    utils.TokenService
	passwordService utils.PasswordService
	emailService    utils.EmailService
}

// UserProfile implements AuthUsecase.
func (a *authUsecase) UserProfile(id int) (*models.UserModel, *errors.CustomError) {
	userProfile, err := a.authRepo.GetUserProfileByID(id)
	if err != nil {
		return &models.UserModel{}, err
	}

	return &userProfile, nil
}

// PromoteUsers implements AuthUsecase.
func (a *authUsecase) PromoteUser(email string, role string, group string) *errors.CustomError {
	err := a.authRepo.PromoteUser(email, role, group)
	if err != nil {
		return &errors.CustomError{StatusCode: 500, Message: err.Message, Error: err.Error}
	}
	return nil

}

// RequestResetPassword implements AuthUsecase.
func (a *authUsecase) RequestResetPassword(email string) *errors.CustomError {

	// Check if the user exists in the database
	user, customErr := a.authRepo.GetUserByEmail(email)
	if customErr != nil {
		return customErr
	}

	// Generate a reset password token
	resetToken, err := a.tokenService.GenerateToken(user.Email, "reset_password", "user")
	if err != nil {
		return &errors.CustomError{StatusCode: 500, Message: "failed to generate reset password token", Error: err}
	}

	// Send the reset password email
	err = a.emailService.SendResetPasswordEmail(user.Email, resetToken)
	if err != nil {
		return &errors.CustomError{StatusCode: 500, Message: "failed to send reset password email", Error: err}
	}

	return nil

}

// GetProfileByEmail implements AuthUsecase.
func (a *authUsecase) GetProfileByEmail(token string) (models.UserModel, *errors.CustomError) {
	email, tokenType, _, err := a.tokenService.ValidateToken(token)
	if err != nil {
		return models.UserModel{}, &errors.CustomError{StatusCode: 401, Message: err.Error(), Error: err}
	}
	if tokenType != "access_token" {
		return models.UserModel{}, &errors.CustomError{StatusCode: 401, Message: "invalid token type", Error: nil}
	}

	user, customErr := a.authRepo.GetUserByEmail(email)
	if customErr != nil {
		return models.UserModel{}, customErr
	}

	return user, nil
}

// UpdateProfile implements AuthUsecase.
func (a *authUsecase) UpdateProfile(token string, user models.UserModel) *errors.CustomError {
	email, tokenType, _, err := a.tokenService.ValidateToken(token)
	if err != nil {
		return &errors.CustomError{StatusCode: 401, Message: err.Error(), Error: err}
	}
	if tokenType != "access_token" {
		return &errors.CustomError{StatusCode: 401, Message: "invalid token type", Error: nil}
	}

	// Fetch the existing user data
	existingUser, customErr := a.authRepo.GetUserByEmail(email)
	if customErr != nil {
		return customErr
	}

	// Update fields only if they are not empty, otherwise retain existing data
	if user.Name != "" && user.Name != existingUser.Name {
		existingUser.Name = user.Name
	}
	if user.University != "" && user.University != existingUser.University {
		existingUser.University = user.University
	}
	if user.LeetCode != "" && user.LeetCode != existingUser.LeetCode {
		existingUser.LeetCode = user.LeetCode
	}
	if user.Codeforces != "" && user.Codeforces != existingUser.Codeforces {
		existingUser.Codeforces = user.Codeforces
	}
	if user.GitHub != "" && user.GitHub != existingUser.GitHub {
		existingUser.GitHub = user.GitHub
	}
	if user.Photo != "" && user.Photo != existingUser.Photo {
		existingUser.Photo = user.Photo
	}
	if user.PreferredLanguage != "" && user.PreferredLanguage != existingUser.PreferredLanguage {
		existingUser.PreferredLanguage = user.PreferredLanguage
	}
	if user.HackerRank != "" && user.HackerRank != existingUser.HackerRank {
		existingUser.HackerRank = user.HackerRank
	}
	if user.Phone != "" && user.Phone != existingUser.Phone {
		existingUser.Phone = user.Phone
	}
	if user.TelegramUsername != "" && user.TelegramUsername != existingUser.TelegramUsername {
		existingUser.TelegramUsername = user.TelegramUsername
	}
	if user.TelegramUID != "" && user.TelegramUID != existingUser.TelegramUID {
		existingUser.TelegramUID = user.TelegramUID
	}
	if user.LinkedIn != "" && user.LinkedIn != existingUser.LinkedIn {
		existingUser.LinkedIn = user.LinkedIn
	}
	if user.StudentID != "" && user.StudentID != existingUser.StudentID {
		existingUser.StudentID = user.StudentID
	}
	if user.ShortBio != "" && user.ShortBio != existingUser.ShortBio {
		existingUser.ShortBio = user.ShortBio
	}
	if user.Instagram != "" && user.Instagram != existingUser.Instagram {
		existingUser.Instagram = user.Instagram
	}
	if !user.Birthday.IsZero() && user.Birthday != existingUser.Birthday {
		existingUser.Birthday = user.Birthday
	}
	if user.CV != "" && user.CV != existingUser.CV {
		existingUser.CV = user.CV
	}

	if !user.ExpectedGraduationDate.IsZero() && user.ExpectedGraduationDate != existingUser.ExpectedGraduationDate {
		existingUser.ExpectedGraduationDate = user.ExpectedGraduationDate
	}

	if user.TShirtColor != "" && user.TShirtColor != existingUser.TShirtColor {
		existingUser.TShirtColor = user.TShirtColor
	}
	if user.TShirtSize != "" && user.TShirtSize != existingUser.TShirtSize {
		existingUser.TShirtSize = user.TShirtSize
	}
	if user.Gender != "" && user.Gender != existingUser.Gender {
		existingUser.Gender = user.Gender
	}

	if user.Password != "" && user.Password != existingUser.Password {
		existingUser.Password = user.Password
	}

	if user.Department != "" && user.Department != existingUser.Department {
		existingUser.Department = user.Department
	}

	if user.StudentID != existingUser.StudentID {
		existingUser.StudentID = user.StudentID
	}

	// Update the user in the database
	customErr = a.authRepo.UpdateUserByEmail(email, existingUser)
	if customErr != nil {
		return customErr
	}

	return nil
}

// RefreshToken implements AuthUsecase.
func (a *authUsecase) RefreshToken(token string) (string, string, *errors.CustomError) {
	email, tokenType, role, err := a.tokenService.ValidateToken(token)
	if err != nil {
		return "", "", &errors.CustomError{StatusCode: 401, Message: err.Error(), Error: err}
	}
	if tokenType != "refresh_token" {
		return "", "", &errors.CustomError{StatusCode: 401, Message: "invalid token type", Error: err}
	}

	access_token, err := a.tokenService.GenerateToken(email, "access_token", role)
	if err != nil {
		return "", "", &errors.CustomError{StatusCode: 500, Message: "internal server error", Error: nil}
	}
	refresh_token, err := a.tokenService.GenerateToken(email, "refresh_token", role)
	if err != nil {
		return "", "", &errors.CustomError{StatusCode: 500, Message: "internal server error", Error: nil}
	}

	return access_token, refresh_token, nil
}

// LoginUser implements AuthUsecase.
func (a *authUsecase) LoginUser(email string, password string) (string, string, *errors.CustomError) {
	// check if the user invited

	// check if the user has set password
	user, customerr := a.authRepo.GetUserByEmail(email)
	if customerr != nil {
		return "", "", customerr
	}

	// check the password
	if err := a.passwordService.ComparePassword(user.Password, password); err == false {
		log.Println("incorrect password", password, user.Password)
		return "", "", &errors.CustomError{StatusCode: 401, Message: "incorrect password"}
	}

	// generate the tokens
	access_token, err := a.tokenService.GenerateToken(email, "access_token", user.Role)
	if err != nil {
		return "", "", &errors.CustomError{StatusCode: 500, Message: "internal server error", Error: nil}
	}
	refresh_token, err := a.tokenService.GenerateToken(email, "refresh_token", user.Role)

	if err != nil {
		return "", "", &errors.CustomError{StatusCode: 500, Message: "internal server error", Error: nil}
	}

	return access_token, refresh_token, nil
}

// SetPassword implements AuthUsecase.
func (a *authUsecase) SetPassword(token string, password string) *errors.CustomError {
	// token validation
	log.Println("lets set the password", token, password)
	email, tokenType, _, err := a.tokenService.ValidateToken(token)
	if err != nil {
		return &errors.CustomError{StatusCode: 401, Message: err.Error(), Error: err}
	}
	if tokenType != "invitation_token" && tokenType != "reset_password" {
		return &errors.CustomError{StatusCode: 401, Message: "invalid token type", Error: nil}
	}

	// hash password
	hashedPassword, err := a.passwordService.HashPassword(password)
	if err != nil {
		return &errors.CustomError{StatusCode: 500, Message: "failed to hash password", Error: err}
	}

	saved_token, customerr := a.authRepo.GetSavedToken(email, tokenType)
	if customerr != nil {
		return customerr
	}

	val, err := a.tokenService.CompareHashedToken(token, saved_token)
	if val == false || err != nil {
		return &errors.CustomError{StatusCode: 500, Message: err.Error(), Error: err}
	}

	// store on the db
	customerr = a.authRepo.SetPassword(email, hashedPassword)
	if customerr != nil {
		return customerr
	}

	return nil

}

// SendInvitationToken implements AuthUsecase.
func (a *authUsecase) SendInvitationToken(email string, group string) *errors.CustomError {
	// generate token
	invitation_token, err := a.tokenService.GenerateToken(email, "invitation_token", "student")
	if err != nil {
		return &errors.CustomError{StatusCode: 500, Message: "failed to generate token", Error: err}
	}

	// add to the user to the db if it doesn't exist before
	hashed_token, err := a.tokenService.HashToken(invitation_token)
	if err != nil {
		return &errors.CustomError{StatusCode: 500, Message: "failed to hash token", Error: err}
	}

	customerr := a.authRepo.SaveUserEmailAndToken(email, group, hashed_token)
	if customerr != nil {
		return customerr
	}

	// send invitation

	err = a.emailService.SendInvitationEmail(email, invitation_token)
	if err != nil {
		return &errors.CustomError{StatusCode: 500, Message: "failed to send email", Error: err}
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

	err = a.authRepo.SaveUser(user)
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
