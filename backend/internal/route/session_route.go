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

	sessionRoutes.POST("/", nil)
	sessionRoutes.PUT("/:session_id", nil)
	sessionRoutes.DELETE("/:session_id", nil)

	studentSessiosnRoute := router.Group("/sessions")
	studentSessiosnRoute.Use(middleware.AuthMiddleWare(tokenService))
	studentSessiosnRoute.GET("/", nil)
	studentSessiosnRoute.GET("/:session_id", nil)

}
