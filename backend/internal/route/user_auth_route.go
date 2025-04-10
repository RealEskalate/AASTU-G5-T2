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
	// router.POST("/auth/set-new-password", controller.setNewPassword)
	userGroup := router.Group("/auth")
	userGroup.Use(middleware.AuthMiddleWare(tokenService))

	// userGroup.GET("/set-password", controller.RenderSetPasswordPage)
	// userGroup.POST("/set-password", controller.SetPassword)
	userGroup.POST("/login", controller.LoginUser)
	userGroup.POST("/refresh-token", controller.RefreshToken)
	userGroup.PUT("/myprofile", controller.UpdateProfile) // with access token fil@l other data
	userGroup.GET("/myprofile", controller.GetMyProfile)  // with access token get user profile
	userGroup.GET("/user-profile", nil)                   // with access token get all user profile

}
