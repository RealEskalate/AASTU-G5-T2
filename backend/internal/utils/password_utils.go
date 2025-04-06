package utils

import (
	"golang.org/x/crypto/bcrypt"
)

type PasswordService interface {
	HashPassword(password string) (string, error)
	ComparePassword(hash, password string) bool
}

type passwordService struct{}

// Compare implements PasswordService.
func (p *passwordService) ComparePassword(hash string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// Hash implements PasswordService.
func (p *passwordService) HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	return string(hashedPassword), err
}

func NewPasswordService() PasswordService {
	return &passwordService{}
}
