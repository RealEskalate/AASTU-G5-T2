package route

import (
	"a2sv_hub/internal/controller"
	"a2sv_hub/internal/middleware"
	"a2sv_hub/internal/utils"

	"github.com/gin-gonic/gin"
)

func setupUserRoute(router *gin.Engine, controller controller.AuthController, tokenService utils.TokenService) {
	userGroup := router.Group("/auth")
	userGroup.Use(middleware.AuthMiddleWare(tokenService))

	userGroup.GET("/set-password", controller.RenderSetPasswordPage)
	userGroup.POST("/set-password", controller.SetPassword)
	userGroup.POST("/login", controller.LoginUser)
	userGroup.POST("/refresh-token", controller.RefreshToken)
	userGroup.POST("/forgot-password", nil)
	userGroup.POST("/reset-password", nil) // with reset password token and new password
	userGroup.PUT("/myprofile", nil)       // with access token fill other data
	userGroup.GET("/myprofile", nil)       // with access token get user profile
	userGroup.GET("/user-profile", nil)    // with access token get all user profile

}
