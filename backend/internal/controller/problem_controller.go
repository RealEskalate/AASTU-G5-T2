package controller

import (
	"a2sv_hub/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ProblemController interface {
	GetAllProblems(c *gin.Context)
}

type problemController struct {
	usecase usecase.ProblemUsecase
}

func NewProblemController(usecase usecase.ProblemUsecase) ProblemController {
	return &problemController{
		usecase: usecase,
	}
}

func (p *problemController) GetAllProblems(c *gin.Context) {
	problems, err := p.usecase.GetAllProblems()
	if err != nil {
		c.JSON(err.StatusCode, gin.H{"error": err, "message": err.Message, "status": err.StatusCode})
		return
	}
	c.JSON(http.StatusOK, problems)
}
