package utils

import (
	"crypto/sha256"
	"encoding/hex"
	"log"

	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type TokenService interface {
	GenerateToken(email string, tokenType string, role string) (string, error)
	ValidateToken(token string) (string, string, string, error)
	HashToken(token string) (string, error)
}

type tokenService struct {
	secretKey string
}

// HashToken implements TokenService.
func (t *tokenService) HashToken(token string) (string, error) {
	hash := sha256.Sum256([]byte(token))
	return hex.EncodeToString(hash[:]), nil
}

// GenerateToken implements TokenService.
func (t *tokenService) GenerateToken(email string, tokenType string, role string) (string, error) {
	claims := jwt.MapClaims{
		"email":     email,
		"tokenType": tokenType,
		"role":      role,
		"exp":       time.Now().Add(time.Hour * 24 * 365).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(t.secretKey))
	if err != nil {
		return "", err
	}

	return signedToken, nil
}

// ValidateToken implements TokenService.
func (t *tokenService) ValidateToken(token string) (string, string, string, error) {
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return []byte(t.secretKey), nil
	})

	if err != nil || !parsedToken.Valid {
		return "", "", "", err
	}

	claims, ok := parsedToken.Claims.(jwt.MapClaims)
	if !ok {
		return "", "", "", jwt.ErrSignatureInvalid
	}

	email, emailOk := claims["email"].(string)
	tokenType, tokenTypeOk := claims["tokenType"].(string)
	role, roleOk := claims["role"].(string)

	if !emailOk || !tokenTypeOk || !roleOk {
		return "", "", "", jwt.ErrSignatureInvalid
	}

	return email, tokenType, role, nil
}

func NewTokenService() TokenService {

	secretKey := os.Getenv("JWT_SECRET_KEY")
	if secretKey == "" {
		log.Println("JWT_SECRET_KEY environment variable is not set")
		panic("JWT_SECRET_KEY environment variable is not set")
	} else {
		log.Println("JWT_SECRET_KEY:", secretKey)
	}

	return &tokenService{
		secretKey: secretKey,
	}
}
