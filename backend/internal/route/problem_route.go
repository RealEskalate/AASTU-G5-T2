package route

import (
	"a2sv_hub/internal/controller"
	"a2sv_hub/internal/middleware"

	// "a2sv_hub/internal/middleware"
	"a2sv_hub/internal/utils"

	"github.com/gin-gonic/gin"
)

func setupProblemRoutes(router *gin.Engine, controller controller.ProblemController, tokenService utils.TokenService) {
	problemRoutes := router.Group("/problems")
	// problemRoutes.Use(middleware.RoleMiddleWare(tokenService, "head", "super_admin", "student"))
	problemRoutes.GET("/", controller.GetAllProblems)
	problemRoutes.GET("/:problem_id", controller.GetAllProblems)

	problemRoutesHead := router.Group("/problems")
	problemRoutes.Use(middleware.AuthMiddleWare(tokenService), middleware.RoleMiddleWare(tokenService, "head", "super_admin", "student"))

	problemRoutesHead.POST("/", controller.AddProblem)
	problemRoutesHead.PUT("/addTrack", controller.AddProblemToTrack)

}
