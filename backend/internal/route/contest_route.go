package route

import (
	"a2sv_hub/internal/controller"
	"a2sv_hub/internal/middleware"
	"a2sv_hub/internal/utils"

	"github.com/gin-gonic/gin"
)

func setupCodeforcesRoutes(router *gin.Engine, controller *controller.CodeforcesController, tokenService utils.TokenService) {
    codeforcesRoutes := router.Group("/codeforces")

    codeforcesRoutes.Use(middleware.RoleMiddleWare(tokenService, "head", "super_admin", "student"))
    
	codeforcesRoutes.GET("/contests", controller.GetAllContests)
	codeforcesRoutes.GET("/contests/:contestId", controller.GetContest)
	codeforcesRoutes.GET("/contests/:contestId/problems", controller.GetProblems)
	codeforcesRoutes.GET("/contests/:contestId/standings", controller.GetStandings)
	codeforcesRoutes.GET("/contests/:contestId/submissions", controller.GetSubmissions)
	codeforcesRoutes.GET("/users/:userId/contest-problems", controller.GetUserContestProblems)
   
    codeforcesRoutesHead := router.Group("/codeforces")

    codeforcesRoutesHead.Use(middleware.RoleMiddleWare(tokenService, "head", "super_admin"))
    
    codeforcesRoutesHead.POST("/contests", controller.AddContest)
    
}