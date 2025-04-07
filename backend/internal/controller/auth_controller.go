package controller

import (
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/usecase"
	"log"
	"strings"

	"github.com/gin-gonic/gin"
)

type AuthController interface {
	SetPassword(c *gin.Context)
	CreateUser(c *gin.Context)
	SendInvitationToken(c *gin.Context)
	RenderSetPasswordPage(c *gin.Context)
}

type authController struct {
	authUsecase usecase.AuthUsecase
}

// RenderSetPasswordPage implements AuthController.
func (a *authController) RenderSetPasswordPage(c *gin.Context) {
	token := c.Query("token")
	if token == "" {
		c.JSON(400, gin.H{"error": "Token is required"})
		return
	}

	c.HTML(200, "set_password.html", gin.H{
		"Token": token,
	})
}

// SetPassword implements AuthController.
func (a *authController) SetPassword(c *gin.Context) {

	log.Println("Hit /auth/set-password")
	authHeader := c.GetHeader("Authorization")

	log.Println("Authorization Header:", authHeader)
	if authHeader == "" {
		c.String(401, "Authorization header required")
		return
	}

	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.String(401, "Invalid Authorization header format")
		return
	}
	token := parts[1]

	// Parse JSON body
	var req struct {
		Password string `json:"password"`
		Confirm  string `json:"confirm"`
	}
	if err := c.BindJSON(&req); err != nil {
		c.String(400, "Invalid request body")
		return
	}

	if req.Password != req.Confirm {
		c.String(400, "Passwords do not match")
		return
	}

	// Use authUsecases to handle password reset
	err := a.authUsecase.SetPassword(token, req.Password)
	if err != nil {
		log.Printf("Failed to set password: %v", err)
		c.String(err.StatusCode, err.Message)
		return
	}

	c.String(200, "Password set successfully!")

}

// SendInvitationToken implements AuthController.
func (a *authController) SendInvitationToken(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	var requestBody struct {
		Email          string `json:"email" binding:"required,email"`
		GroupShortName string `json:"group_short_name" binding:"required"`
	}

	if !strings.HasSuffix(requestBody.Email, "@a2sv.org") {
		c.JSON(400, gin.H{
			"status":  400,
			"message": "Email must be in the format name.lastname@a2sv.org",
		})
		return
	}

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": " email is required or group short name is required",
		})
		return
	}

	err := a.authUsecase.SendInvitationToken(requestBody.Email, requestBody.GroupShortName)
	if err != nil {
		c.JSON(err.StatusCode, gin.H{
			"status":  err.StatusCode,
			"message": err.Message,
			"error":   err.Error,
		})
		return
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "Invitation token sent successfully",
	})
}

func (a *authController) CreateUser(c *gin.Context) {
	var user models.UserModel
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{
			"code":    400,
			"message": "All fields are required",
		})
		return
	}

	accessToken, refreshToken, err := a.authUsecase.RegisterUser(user)
	if err != nil {
		c.JSON(err.StatusCode, gin.H{
			"status":  err.StatusCode,
			"message": err.Message,
			"error":   err.Error,
		})
		return
	}

	c.JSON(200, gin.H{
		"status":        200,
		"message":       "super User created successfully",
		"access_token":  accessToken,
		"refresh_token": refreshToken,
	})
}

func NewAuthController(authUsecase usecase.AuthUsecase) AuthController {
	return &authController{authUsecase: authUsecase}
}
