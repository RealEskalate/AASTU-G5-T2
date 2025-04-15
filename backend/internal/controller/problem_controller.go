package controller

import (
	"a2sv_hub/internal/usecase"
	"github.com/gin-gonic/gin"
	"net/http"
)

type ProblemController interface {
	GetAllProblems(c *gin.Context)
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