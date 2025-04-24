package controller

import (
	"a2sv_hub/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ProblemController interface {
	GetAllProblems(c *gin.Context)
	GetProblemById(c *gin.Context)
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

// GetProblemById implements GroupController.
func (p *problemController) GetProblemById(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("problem_id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid problem ID"})
		return
	}

	problem, customerr := p.problemUsecase.GetProblemById(id)
	if customerr != nil {
		c.JSON(customerr.StatusCode, gin.H{"error": customerr.Error, "message": customerr.Message, "status": customerr.StatusCode})
		return
	}

	c.JSON(200, problem)
}

func NewProblemController(usecase usecase.ProblemUsecase) ProblemController {
	return &problemController{
		problemUsecase: usecase,
	}
}
