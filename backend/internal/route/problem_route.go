package route

import (
	"a2sv_hub/internal/controller"

	"github.com/gin-gonic/gin"
)

func setupProblemRoutes(router *gin.Engine, controller controller.ProblemController) {
	problemRoutes := router.Group("/problems")

	// Publicly accessible (adjust this based on auth needs)
	problemRoutes.GET("/", controller.GetAllProblems)
}
