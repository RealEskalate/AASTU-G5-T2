package controller

import (
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/usecase"
	"fmt"
	"net/http"

	"strconv"

	"github.com/gin-gonic/gin"
)

type ProblemController interface {
	GetDailyProblem(c *gin.Context)
	GetAllProblems(c *gin.Context)
	GetProblemById(c *gin.Context)
	AddProblem(c *gin.Context)
	AddProblemToTrack(c *gin.Context)
}

type problemController struct {
	problemUsecase usecase.ProblemUsecase
}

// GetDailyProblem implements ProblemController.
func (p *problemController) GetDailyProblem(c *gin.Context) {
	dailyProblem, err := p.problemUsecase.GetDailyProblem()
	if err != nil {
		c.JSON(err.StatusCode, gin.H{
			"error":   err.Error,
			"message": err.Message,
			"status":  err.StatusCode,
		})
		return
	}

	c.JSON(http.StatusOK, dailyProblem)
}

func (p *problemController) GetAllProblems(c *gin.Context) {
	// Read query params
	pageStr := c.Query("page")
	limitStr := c.Query("limit")

	// Defaults if not provided
	page := 1
	limit := 10

	// Parse if provided
	if pageStr != "" {
		if parsedPage, err := strconv.Atoi(pageStr); err == nil && parsedPage > 0 {
			page = parsedPage
		}
	}

	if limitStr != "" {
		if parsedLimit, err := strconv.Atoi(limitStr); err == nil && parsedLimit > 0 {
			limit = parsedLimit
		}
	}

	// Call Usecase with pagination
	problems, err := p.problemUsecase.GetAllProblems(page, limit)
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

func (p *problemController) AddProblem(c *gin.Context) {
	var problem models.Problem
	role, exists := c.Get("role")
	fmt.Printf("Role in AddProblems: %v, Exists: %v\n", role, exists)

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
	role, exists := c.Get("role")
	fmt.Printf("Role in AddProblemsto: %v, Exists: %v\n", role, exists)

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
