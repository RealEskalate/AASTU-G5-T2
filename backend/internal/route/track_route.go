package route

import (
	"a2sv_hub/internal/controller"
	"a2sv_hub/internal/middleware"
	"a2sv_hub/internal/utils"

	"github.com/gin-gonic/gin"
)

// SetupTrackRoutes will configure all the track-related routes
func setupTrackRoutes(router *gin.Engine, controller controller.TrackController, tokenService utils.TokenService) {

	trackRoutes := router.Group("/tracks")
	trackRoutes.Use(middleware.RoleMiddleWare(tokenService, "head", "super_admin","student"))

	trackRoutes.GET("/:track_id/progress/:group_id", controller.GetTrackProgressList)
	trackRoutes.GET("/:track_id/problems", controller.GetProblemsByDay)
	trackRoutes.GET("/:track_id", controller.GetTrackByID)


	trackRoutesHead := router.Group("/tracks")
	trackRoutesHead.Use(middleware.RoleMiddleWare(tokenService, "head", "super_admin"))

	trackRoutesHead.POST("/", controller.CreateTrack)
	trackRoutesHead.PUT("/:track_id", controller.UpdateTrack)
	trackRoutesHead.DELETE("/:track_id", controller.DeleteTrack)
	


}
