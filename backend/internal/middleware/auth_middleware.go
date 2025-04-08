package middleware

import (
	"a2sv_hub/internal/utils"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleWare(tokenService utils.TokenService) gin.HandlerFunc {
	return func(c *gin.Context) {
		clientToken := c.Request.Header.Get("Authorization")

		if clientToken == "" {
			c.JSON(401, gin.H{"status": 401, "message": "No token provided"})
			c.Abort()
			return
		}
		splitToken := strings.Split(clientToken, "Bearer ")
		if len(splitToken) != 2 {
			c.JSON(401, gin.H{"status": 401, "message": "Invalid token"})
			c.Abort()
			return
		}

		clientToken = splitToken[1]
		_, _, _, err := tokenService.ValidateToken(clientToken)
		if err != nil {
			c.JSON(401, gin.H{"status": 401, "message": "No token provided", "error": err})
			c.Abort()
			return
		}
		c.Next()

	}
}
