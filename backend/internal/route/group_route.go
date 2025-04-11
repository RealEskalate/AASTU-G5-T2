package route

import (
	"a2sv_hub/internal/controller"
	"a2sv_hub/internal/middleware"
	"a2sv_hub/internal/utils"

	"github.com/gin-gonic/gin"
)

func setupGroupRoutes(router *gin.Engine, controller controller.GroupController, tokenService utils.TokenService) {

	groupRoutes := router.Group("/groups")
	groupRoutes.Use(middleware.AuthMiddleWare(tokenService), middleware.RoleMiddleWare(tokenService, "head", "super_admin"))

	groupRoutes.POST("/", controller.CreateNewGroup)
	groupRoutes.PUT("/:group_id", controller.UpdateGroup)
	groupRoutes.DELETE("/:group_id", controller.DeleteGroup)

	usersRoute := router.Group("/groups")
	usersRoute.Use(middleware.AuthMiddleWare(tokenService))
	usersRoute.GET("/", controller.GetAllGroups)
	usersRoute.GET("/:group_id", controller.GetGroupById)

}
