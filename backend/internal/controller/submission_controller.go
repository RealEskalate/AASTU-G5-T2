package controller

import (
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/usecase"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type SubmissionController interface {
	SubmitProblem(c *gin.Context)
	GetSubmissionById(c *gin.Context)
}

type submissionController struct {
	usecase     usecase.SubmissionUsecase
	authUsecase usecase.AuthUsecase
}

func NewSubmissionController(usecase usecase.SubmissionUsecase, authUsecase usecase.AuthUsecase) SubmissionController {
	return &submissionController{
		usecase:     usecase,
		authUsecase: authUsecase,
	}
}

func (sc *submissionController) SubmitProblem(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")

	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.JSON(401, gin.H{
			"status":  401,
			"message": "Invalid Authorization header format",
		})
		return
	}
	token := parts[1]

	profile, err := sc.authUsecase.GetProfileByEmail(token)
	if err != nil {
		c.JSON(err.StatusCode, gin.H{
			"status":  err.StatusCode,
			"message": err.Message,
			"error":   err.Error,
		})
		return
	}
	userID := profile.ID

	var req models.SubmitRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// problemIDStr := c.Param("problem_id")
	// problemID, err := strconv.Atoi(problemIDStr)
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid problem ID"})
	// 	return
	// }

	submission := models.SubmissionModel{
		UserID:    userID,
		ProblemID: req.ProblemID,
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

func (sc *submissionController) GetSubmissionById(c *gin.Context) {
	submissionIDStr := c.Param("submission_id")
	submissionID, err := strconv.Atoi(submissionIDStr)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid submission ID"})
		return
	}

	submission, customerr := sc.usecase.GetSubmissionById(submissionID)
	if customerr != nil {
		c.JSON(customerr.StatusCode, gin.H{"error": customerr.Error, "message": customerr.Message, "status": customerr.StatusCode})
		return
	}
	c.JSON(200, submission)
}
