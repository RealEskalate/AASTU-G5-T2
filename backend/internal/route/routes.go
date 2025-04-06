package route

import (
	"a2sv_hub/internal/controller"
	"strings"

	"a2sv_hub/internal/repository"
	"a2sv_hub/internal/usecase"
	"a2sv_hub/internal/utils"
	"database/sql"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupRouter(db *sql.DB) *gin.Engine {

	log.Println("Successfully connected to PostgreSQL database!")

	tokenService := utils.NewTokenService()
	passwordService := utils.NewPasswordService()
	emailService := utils.NewEmailService()

	authRepository := repository.NewAuthRepo(db)
	authUsecases := usecase.NewAuthUsecase(authRepository, tokenService, passwordService, emailService)
	authControllers := controller.NewAuthController(authUsecases)

	router := gin.Default()
	router.LoadHTMLFiles("D:/AASTU-G5-T2/backend/templates/set_password.html")
	setupHeadAuthRoutes(router, authControllers, tokenService)
	setupUserRoute(router, authControllers)

	router.GET("/set-password", func(c *gin.Context) {
		token := c.Query("token") // For testing; remove in production
		c.HTML(http.StatusOK, "set_password.html", gin.H{
			"Token": token,
		})
	})

	router.POST("/set-password", func(c *gin.Context) {
		// Get token from Authorization header
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.String(http.StatusUnauthorized, "Authorization header required")
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.String(http.StatusUnauthorized, "Invalid Authorization header format")
			return
		}
		token := parts[1]

		// Parse JSON body
		var req struct {
			Password string `json:"password"`
			Confirm  string `json:"confirm"`
		}
		if err := c.BindJSON(&req); err != nil {
			c.String(http.StatusBadRequest, "Invalid request body")
			return
		}

		if req.Password != req.Confirm {
			c.String(http.StatusBadRequest, "Passwords do not match")
			return
		}

		// Use authUsecases to handle password reset
		err := authUsecases.SetPassword(token, req.Password)
		if err != nil {
			log.Printf("Failed to set password: %v", err)
			c.String(http.StatusInternalServerError, "Failed to set password")
			return
		}

		c.String(http.StatusOK, "Password set successfully!")
	})

	return router
}
