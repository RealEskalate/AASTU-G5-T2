package route

import (
	"a2sv_hub/internal/controller"
	"a2sv_hub/internal/middleware"
	"a2sv_hub/internal/utils"

	"github.com/gin-gonic/gin"
)

func setupAttendanceRoutes(router *gin.Engine, controller controller.AttendanceController, tokenService utils.TokenService) {

	router.GET("/attendance/student/:student_id", controller.GetAttendanceForStudent)

	attendanceRoutes := router.Group("/attendance")
	attendanceRoutes.Use(middleware.AuthMiddleWare(tokenService), middleware.RoleMiddleWare(tokenService, "head", "super_admin"))
	attendanceRoutes.POST("/:session_id", controller.TakeAttendanceOfGroup)
	attendanceRoutes.GET("/:session_id", controller.GetAttendanceByGroupAndSession)
	attendanceRoutes.DELETE("/:session_id", controller.DeleteAttendanceOfStudent)

}
