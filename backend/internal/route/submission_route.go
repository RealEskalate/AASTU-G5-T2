package route

import (
	"a2sv_hub/internal/controller"
	"a2sv_hub/internal/middleware"
	"a2sv_hub/internal/utils"

	"github.com/gin-gonic/gin"
)

func setupSubmissionRoutes(router *gin.Engine, controller controller.SubmissionController, tokenService utils.TokenService) {
	subRoute := router.Group("/submission")
	subRoute.Use(middleware.AuthMiddleWare(tokenService), middleware.RoleMiddleWare(tokenService, "head", "super_admin", "student"))

	subRoute.POST("/", controller.SubmitProblem)
	subRoute.GET("/:submission_id", controller.GetSubmissionById)
}
