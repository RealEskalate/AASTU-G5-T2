package controller

import (
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type SubmissionController struct {
	usecase usecase.SubmissionUsecase
}

func NewSubmissionController(usecase usecase.SubmissionUsecase) SubmissionController {
	return SubmissionController{usecase: usecase}
}

func (sc *SubmissionController) SubmitProblem(c *gin.Context) {
	var req models.SubmitRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	problemIDStr := c.Param("problemID")
	problemID, err := strconv.Atoi(problemIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid problem ID"})
		return
	}

	userIDVal, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	userID := userIDVal.(int)

	submission := models.SubmissionModel{
		ProblemID: problemID,
		UserID:    userID,
		TimeSpent: req.TimeSpent,
		Tries:     req.Tries,
		Code:      req.Code,
		Language:  req.Language,
	}

	errResp := sc.usecase.Submit(submission)
	if errResp != nil {
		c.JSON(errResp.StatusCode, gin.H{"error": errResp.Message})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Submission created successfully"})
}
