package route

import (
	"a2sv_hub/internal/controller"
	"a2sv_hub/internal/middleware"
	"a2sv_hub/internal/utils"

	"github.com/gin-gonic/gin"
)

func setupSessionRoutes(router *gin.Engine, controller controller.SessionController, tokenService utils.TokenService) {
	sessionRoutes := router.Group("/sessions")
	sessionRoutes.Use(middleware.AuthMiddleWare(tokenService), middleware.RoleMiddleWare(tokenService, "head", "super_admin"))

	sessionRoutes.POST("/", controller.CreateSession)
	sessionRoutes.PUT("/:session_id", controller.UpdateSession)
	sessionRoutes.DELETE("/:session_id", controller.DeleteSession)

	studentSessiosnRoute := router.Group("/sessions")
	studentSessiosnRoute.Use(middleware.AuthMiddleWare(tokenService))
	studentSessiosnRoute.GET("/", controller.GetAllSessions)
	studentSessiosnRoute.GET("/:session_id", controller.GetSessionById)
	// create session for one group only

}
