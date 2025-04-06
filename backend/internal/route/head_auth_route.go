package route

import (
	"a2sv_hub/internal/controller"
	"a2sv_hub/internal/middleware"
	"a2sv_hub/internal/utils"

	"github.com/gin-gonic/gin"
)

func setupHeadAuthRoutes(router *gin.Engine, controller controller.AuthController, tokenService utils.TokenService) {
	superAdminGroup := router.Group("/super-admin")
	superAdminGroup.POST("/create_user", controller.CreateUser)
	superAdminGroup.Use(middleware.AuthMiddleWare(tokenService), middleware.RoleMiddleWare(tokenService, "super_admin"))

	superAdminGroup.PUT("/promote-user", nil)

	// superAdminGroup.POST("/new-group", nil)

	headAuthGroup := router.Group("/head")
	headAuthGroup.Use(middleware.AuthMiddleWare(tokenService), middleware.RoleMiddleWare(tokenService, "head", "super_admin"))

	headAuthGroup.POST("/send-invitation-token", controller.SendInvitationToken)

}
