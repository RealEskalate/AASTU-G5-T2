package route

import (
	"a2sv_hub/internal/controller"

	"a2sv_hub/internal/repository"
	"a2sv_hub/internal/usecase"
	"a2sv_hub/internal/utils"
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
)

func SetupRouter(db *sql.DB) *gin.Engine {

	log.Println("Successfully connected to PostgreSQL database!")

	router := gin.Default()
	router.LoadHTMLFiles("backend/templates/set_password.html")

	tokenService := utils.NewTokenService()
	passwordService := utils.NewPasswordService()
	emailService := utils.NewEmailService()
	fileUploadService := utils.NewFileUploadService()

	authRepository := repository.NewAuthRepo(db)
	authUsecases := usecase.NewAuthUsecase(authRepository, tokenService, passwordService, emailService)
	authControllers := controller.NewAuthController(authUsecases, fileUploadService)

	setupHeadAuthRoutes(router, authControllers, tokenService)
	setupUserRoute(router, authControllers, tokenService)

	groupRepository := repository.NewGroupRepository(db)
	groupUsecases := usecase.NewGroupUsecase(groupRepository, tokenService, emailService)
	groupControllers := controller.NewGroupController(groupUsecases)
	setupGroupRoutes(router, groupControllers, tokenService)

	return router
}
