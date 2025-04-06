package controller

import (
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/usecase"

	"github.com/gin-gonic/gin"
)

type AuthController interface {
	CreateUser(c *gin.Context)
	SendInvitationToken(c *gin.Context)
}

type authController struct {
	authUsecase usecase.AuthUsecase
}

// SendInvitationToken implements AuthController.
func (a *authController) SendInvitationToken(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	var requestBody struct {
		Email          string `json:"email" binding:"required,email"`
		GroupShortName string `json:"group_short_name" binding:"required"`
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
		c.JSON(500, gin.H{
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

func NewAuthController(authUsecase usecase.AuthUsecase) AuthController {
	return &authController{authUsecase: authUsecase}
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
