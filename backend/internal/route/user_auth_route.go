package route

import (
	"a2sv_hub/internal/controller"
	"a2sv_hub/internal/middleware"
	"a2sv_hub/internal/utils"

	"github.com/gin-gonic/gin"
)

func setupUserRoute(router *gin.Engine, controller controller.AuthController, tokenService utils.TokenService) {
	router.GET("/auth/set-password", controller.RenderSetPasswordPage)
	router.POST("/auth/set-password", controller.SetPassword)
	router.POST("/auth/request-reset-password-link", controller.RequestResetPassword)
	router.POST("/auth/login", controller.LoginUser)

	userGroup := router.Group("/auth")
	userGroup.Use(middleware.AuthMiddleWare(tokenService))

	userGroup.POST("/refresh-token", controller.RefreshToken)
	userGroup.PUT("/myprofile", controller.UpdateProfile) // with access token file and other data
	userGroup.GET("/myprofile", controller.GetMyProfile)  // with access token get user profile

	userGroup.GET("/user-profile/:id", controller.UserProfile) // with access token get all user profile
}
