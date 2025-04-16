package controller

import (
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/usecase"
	"strconv"

	"github.com/gin-gonic/gin"
)

type SessionController interface {
	CreateSession(c *gin.Context)
	GetAllSessions(c *gin.Context)
	GetSessionById(c *gin.Context)
	UpdateSession(c *gin.Context)
	DeleteSession(c *gin.Context)
}

type sessionController struct {
	sessionUsecase usecase.SessionUsecase
}

// CreateSession implements SessionController.
func (s *sessionController) CreateSession(c *gin.Context) {
	var sessionModel models.SessionModel
	if err := c.ShouldBindJSON(&sessionModel); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err := s.sessionUsecase.CreateSession(sessionModel)
	if err != nil {
		c.JSON(err.StatusCode, gin.H{"error": err.Error, "message": err.Message, "status": err.StatusCode})
		return
	}

	c.JSON(201, gin.H{"message": "New Session created successfully"})
}

// DeleteSession implements SessionController.
func (s *sessionController) DeleteSession(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("session_id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid session ID"})
		return
	}

	customErr := s.sessionUsecase.DeleteSession(id)
	if customErr != nil {
		c.JSON(customErr.StatusCode, gin.H{"error": customErr.Error, "message": customErr.Message, "status": customErr.StatusCode})
		return
	}

	c.JSON(200, gin.H{"message": "Session deleted successfully"})
}

// GetAllSessions implements SessionController.
func (s *sessionController) GetAllSessions(c *gin.Context) {
	sessions, err := s.sessionUsecase.GetAllSessions()
	if err != nil {
		c.JSON(err.StatusCode, gin.H{"error": err.Error, "message": err.Message, "status": err.StatusCode})
		return
	}

	c.JSON(200, gin.H{"sessions": sessions})
}

// GetSessionById implements SessionController.
func (s *sessionController) GetSessionById(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("session_id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid session ID"})
		return
	}
	session, customErr := s.sessionUsecase.GetSessionById(id)
	if customErr != nil {
		c.JSON(customErr.StatusCode, gin.H{"error": customErr.Error, "message": customErr.Message, "status": customErr.StatusCode})
		return
	}

	c.JSON(200, gin.H{"session": session})
}

// UpdateSession implements SessionController.
func (s *sessionController) UpdateSession(c *gin.Context) {
	var sessionModel models.SessionModel
	if err := c.ShouldBindJSON(&sessionModel); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	id, err := strconv.Atoi(c.Param("session_id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid session ID"})
		return
	}

	currErr := s.sessionUsecase.UpdateSession(id, sessionModel)
	if currErr != nil {
		c.JSON(currErr.StatusCode, gin.H{"error": currErr.Error, "message": currErr.Message, "status": currErr.StatusCode})
		return
	}

	c.JSON(200, gin.H{"message": "Session updated successfully"})
}

func NewSessionController(sessionUsecase usecase.SessionUsecase) SessionController {
	return &sessionController{sessionUsecase: sessionUsecase}
}
