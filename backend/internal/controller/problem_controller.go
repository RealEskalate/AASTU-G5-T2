package controller

import (
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ProblemController interface {
	GetAllProblems(c *gin.Context)
	AddProblem(c *gin.Context)
	AddProblemToTrack(c *gin.Context)
}

type problemController struct {
	problemUsecase usecase.ProblemUsecase
}

func (p *problemController) GetAllProblems(c *gin.Context) {
	problems, err := p.problemUsecase.GetAllProblems()
	if err != nil {
		c.JSON(err.StatusCode, gin.H{
			"error":   err.Error,
			"message": err.Message,
			"status":  err.StatusCode,
		})
		return
	}
	c.JSON(http.StatusOK, problems)
}

func NewProblemController(usecase usecase.ProblemUsecase) ProblemController {
	return &problemController{
		problemUsecase: usecase,
	}
}

func (p *problemController) AddProblem(c *gin.Context) {
	var problem models.Problem

	if err := c.ShouldBindJSON(&problem); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   err.Error(),
			"message": "Invalid input",
			"status":  http.StatusBadRequest,
		})
		return
	}

	// Call the usecase to add the problem
	err := p.problemUsecase.AddProblem(problem)
	if err != nil {
		c.JSON(err.StatusCode, gin.H{
			"error":   err.Error,
			"message": err.Message,
			"status":  err.StatusCode,
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Problem successfully added",
	})
}


func (p *problemController) AddProblemToTrack(c *gin.Context) {
	var request struct {
		ProblemID int    `json:"problemID"`
		TrackID   string `json:"trackID"`
	}


	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   err.Error(),
			"message": "Invalid input",
			"status":  http.StatusBadRequest,
		})
		return
	}

	
	err := p.problemUsecase.AddProblemToTrack(request.ProblemID, request.TrackID)
	if err != nil {
		c.JSON(err.StatusCode, gin.H{
			"error":   err.Error,
			"message": err.Message,
			"status":  err.StatusCode,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Problem track successfully updated",
	})
}