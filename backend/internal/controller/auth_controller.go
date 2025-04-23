package controller

import (
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/usecase"
	"a2sv_hub/internal/utils"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

// get all users and filter by group
type AuthController interface {
	PromoteUsers(c *gin.Context)
	SetPassword(c *gin.Context)
	SendInvitationToken(c *gin.Context)
	RenderSetPasswordPage(c *gin.Context)
	LoginUser(c *gin.Context)
	RefreshToken(c *gin.Context)
	UpdateProfile(c *gin.Context)
	GetMyProfile(c *gin.Context)
	UserProfile(c *gin.Context)
	RequestResetPassword(c *gin.Context)
	CreateUser(c *gin.Context) // temp to create super admin user
}

type authController struct {
	authUsecase       usecase.AuthUsecase
	fileUploadService utils.FileUploadService
}

// UserProfile implements AuthController.
func (a *authController) UserProfile(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": "Invalid user ID",
		})
		return
	}

	profile, customErr := a.authUsecase.UserProfile(id)
	if err != nil {
		c.JSON(customErr.StatusCode, gin.H{
			"status":  customErr.StatusCode,
			"message": customErr.Message,
			"error":   customErr.Error,
		})
		return
	}

	userProfile := utils.MapToUserProfile(*profile)
	c.JSON(200, gin.H{
		"status":  200,
		"profile": userProfile,
	})
}

// PromoteUsers implements AuthController.
func (a *authController) PromoteUsers(c *gin.Context) {
	var req struct {
		Email string `json:"email" binding:"required"`
		Role  string `json:"role" binding:"required"`
		Group string `json:"group_short_name"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": "Email and role is required",
		})
		return
	}

	err := a.authUsecase.PromoteUser(req.Email, req.Role, req.Group)
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
		"message": "Users promoted successfully",
	})
}

// RequestResetPassword implements AuthController.
func (a *authController) RequestResetPassword(c *gin.Context) {
	var req struct {
		Email string `json:"email" binding:"required,email"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": "Email is required",
		})
		return
	}

	err := a.authUsecase.RequestResetPassword(req.Email)
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
		"message": "Reset password link sent successfully",
	})
}

// GetProfile implements AuthController.
func (a *authController) GetMyProfile(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")

	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.JSON(401, gin.H{
			"status":  401,
			"message": "Invalid Authorization header format",
		})
		return
	}
	token := parts[1]

	profile, err := a.authUsecase.GetProfileByEmail(token)
	if err != nil {
		c.JSON(err.StatusCode, gin.H{
			"status":  err.StatusCode,
			"message": err.Message,
			"error":   err.Error,
		})
		return
	}

	user_profile := utils.MapToUserProfile(profile)
	c.JSON(200, gin.H{
		"status":  200,
		"profile": user_profile,
	})

}
func (a *authController) UpdateProfile(c *gin.Context) {
	// Extract the token from the Authorization header
	authHeader := c.GetHeader("Authorization")
	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.JSON(401, gin.H{
			"status":  401,
			"message": "Invalid Authorization header format",
		})
		return
	}
	token := parts[1]

	// Parse the form data (including file)
	if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": "Could not parse form data",
		})
		return
	}

	// Initialize the user model with form data
	var user models.UserModel

	// Bind the fields from form data to the user model
	user.Name = c.PostForm("name")
	user.University = c.PostForm("university")
	user.LeetCode = c.PostForm("leetcode")
	user.Codeforces = c.PostForm("codeforces")
	user.GitHub = c.PostForm("github")
	user.PreferredLanguage = c.PostForm("preferred_language")
	user.HackerRank = c.PostForm("hackerrank")
	user.Phone = c.PostForm("phone")
	user.TelegramUsername = c.PostForm("telegram_username")
	user.TelegramUID = c.PostForm("telegram_uid")
	user.LinkedIn = c.PostForm("linkedin")
	user.StudentID = c.PostForm("student_id")
	user.ShortBio = c.PostForm("short_bio")
	user.Instagram = c.PostForm("instagram")
	// Parse and convert the `birthday` field from form
	if birthday := c.PostForm("birthday"); birthday != "" {
		parsedBirthday, err := time.Parse("2006-01-02", birthday)
		if err == nil {
			user.Birthday = parsedBirthday
		}
	}

	user.CV = c.PostForm("cv")

	// Continue binding other fields...
	if expectedGraduationDate := c.PostForm("expected_graduation_date"); expectedGraduationDate != "" {
		parsedGraduationDate, err := time.Parse("2006-01-02", expectedGraduationDate)
		if err == nil {
			user.ExpectedGraduationDate = parsedGraduationDate
		}
	}
	user.TShirtColor = c.PostForm("tshirt_color")
	user.TShirtSize = c.PostForm("tshirt_size")
	user.Gender = c.PostForm("gender")
	user.Password = c.PostForm("password")
	user.Department = c.PostForm("department")

	user.UpdatedAt = time.Now()

	file, err := c.FormFile("photo")
	if err == nil { // Check if an image file is uploaded
		// Save the file temporarily
		tempPath := "./tmp/" + file.Filename
		if err := c.SaveUploadedFile(file, tempPath); err != nil {
			c.JSON(500, gin.H{"error": "Unable to save file"})
			return
		}
		defer os.Remove(tempPath)

		// Call the file upload service to get the URL for the image
		imageURL, err := a.fileUploadService.UploadFile(tempPath, file.Filename)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error, "message": err.Message})
			return
		}
		user.Photo = imageURL // Set the photo URL to the user model
	}

	// Now update the profile with the updated user object
	customerr := a.authUsecase.UpdateProfile(token, user)
	if customerr != nil {
		c.JSON(customerr.StatusCode, gin.H{
			"status":  customerr.StatusCode,
			"message": customerr.Message,
			"error":   customerr.Error,
		})
		return
	}

	// Return success response
	c.JSON(200, gin.H{
		"status":  200,
		"message": "Profile updated successfully",
	})
}

// RefreshToken implements AuthController.
func (a *authController) RefreshToken(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(400, gin.H{
			"status":  400,
			"message": "Authorization header is required",
		})
		return
	}

	// Split the Authorization header
	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.JSON(400, gin.H{
			"status":  400,
			"message": "Invalid Authorization header format",
		})
		return
	}

	// Extract refresh token from Authorization header
	refreshToken := parts[1]

	accessToken, refresh_token, err := a.authUsecase.RefreshToken(refreshToken)
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
		"message":       "Token refreshed successfully",
		"access_token":  accessToken,
		"refresh_token": refresh_token,
	})
}

// LoginUser implements AuthController.
func (a *authController) LoginUser(c *gin.Context) {
	var req struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": "Email and password are required",
		})
		return
	}

	access_token, refresh_token, err := a.authUsecase.LoginUser(req.Email, req.Password)
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
		"message":       "Login successful",
		"access_token":  access_token,
		"refresh_token": refresh_token,
	})
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

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": " email is required or group short name is required",
		})
		return
	}

	if !strings.HasSuffix(requestBody.Email, "@a2sv.org") {
		c.JSON(400, gin.H{
			"status":  400,
			"message": "Email must be in the format name.lastname@a2sv.org",
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

func NewAuthController(authUsecase usecase.AuthUsecase, fileUploadService utils.FileUploadService) AuthController {
	return &authController{authUsecase: authUsecase, fileUploadService: fileUploadService}
}
