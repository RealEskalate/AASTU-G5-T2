package route

import (
	"a2sv_hub/config"
	"a2sv_hub/internal/controller"
	"time"

	"a2sv_hub/internal/repository"
	"a2sv_hub/internal/usecase"
	"a2sv_hub/internal/utils"
	"database/sql"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter(db *sql.DB) *gin.Engine {

	log.Println("Successfully connected to PostgreSQL database!")

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.LoadHTMLFiles("../templates/set_password.html")

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

	submissionRepository := repository.NewSubmissionRepository(db)
	submissionUsecase := usecase.NewSubmissionUsecase(submissionRepository)
	submissionControllers := controller.NewSubmissionController(submissionUsecase, authUsecases)
	setupSubmissionRoutes(router, submissionControllers, tokenService)

	problemRepository := repository.NewProblemRepository(db)
	problemUsecases := usecase.NewProblemUsecase(problemRepository)
	problemControllers := controller.NewProblemController(problemUsecases)
	setupProblemRoutes(router, problemControllers, tokenService)

	sessionRepository := repository.NewSessionRepository(db)
	sessionUsecases := usecase.NewSessionUsecase(sessionRepository)
	sessionController := controller.NewSessionController(sessionUsecases)
	setupSessionRoutes(router, sessionController, tokenService)

	attendanceRepo := repository.NewAttendanceRepository(db)
	attendanceUsecases := usecase.NewAttendanceUsecase(attendanceRepo, authRepository, sessionRepository, tokenService)
	attendanceController := controller.NewAttendanceController(attendanceUsecases)
	setupAttendanceRoutes(router, attendanceController, tokenService)

	trackRepository := repository.NewTrackRepository(db)
	trackUsecases := usecase.NewTrackUsecase(trackRepository)
	trackControllers := controller.NewTrackController(trackUsecases)
	setupTrackRoutes(router, trackControllers, tokenService)

	cfg := config.LoadConfig()
	codeforcesRepository := repository.NewCodeforcesRepository(cfg, db)
	codeforcesUsecases := usecase.NewCodeforcesUsecase(codeforcesRepository)
	codeforcesControllers := controller.NewCodeforcesController(codeforcesUsecases)
	setupCodeforcesRoutes(router, codeforcesControllers, tokenService)

	return router
}
