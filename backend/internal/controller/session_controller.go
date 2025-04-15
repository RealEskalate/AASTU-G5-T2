package controller

import "github.com/gin-gonic/gin"

type SessionController interface {
	CreateSession(c *gin.Context)
	GetAllSessions(c *gin.Context)
	GetSessionById(c *gin.Context)
	UpdateSession(c *gin.Context)
	DeleteSession(c *gin.Context)
}

type sessionController struct{}

// CreateSession implements SessionController.
func (s *sessionController) CreateSession(c *gin.Context) {
	panic("unimplemented")
}

// DeleteSession implements SessionController.
func (s *sessionController) DeleteSession(c *gin.Context) {
	panic("unimplemented")
}

// GetAllSessions implements SessionController.
func (s *sessionController) GetAllSessions(c *gin.Context) {
	panic("unimplemented")
}

// GetSessionById implements SessionController.
func (s *sessionController) GetSessionById(c *gin.Context) {
	panic("unimplemented")
}

// UpdateSession implements SessionController.
func (s *sessionController) UpdateSession(c *gin.Context) {
	panic("unimplemented")
}

func NewSessionController() SessionController {
	return &sessionController{}
}
