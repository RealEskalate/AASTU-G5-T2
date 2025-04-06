package route

import (
	"a2sv_hub/internal/controller"

	"github.com/gin-gonic/gin"
)

func setupUserRoute(router *gin.Engine, controller controller.AuthController) {
	userGroup := router.Group("/auth")
	// userGroup.Use(UserMiddleware())

	userGroup.POST("/set-password", nil)    //use registration token
	userGroup.POST("/login", nil)           // with email and password send access and refresh token
	userGroup.POST("/forgot-password", nil) // email and send reset password token
	userGroup.POST("/reset-password", nil)  // with reset password token and new password
	userGroup.PUT("/myprofile", nil)        // with access token fill other data
	userGroup.GET("/myprofile", nil)        // with access token get user profile
	userGroup.GET("/user-profile", nil)     // with access token get all user profile

}
