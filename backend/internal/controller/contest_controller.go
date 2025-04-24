package controller

import (
	"a2sv_hub/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CodeforcesController struct {
    usecase usecase.CodeforcesUsecase
}

func NewCodeforcesController(usecase usecase.CodeforcesUsecase) *CodeforcesController {
    return &CodeforcesController{usecase: usecase}
}

func (c *CodeforcesController) GetContest(ctx *gin.Context) {
    contestID, err := strconv.Atoi(ctx.Param("contestId"))
    if err != nil {
        ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid contest ID"})
        return
    }

    contest, err := c.usecase.GetContest(contestID)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
        return
    }
    ctx.JSON(http.StatusOK, contest)
}

func (c *CodeforcesController) GetProblems(ctx *gin.Context) {
    contestID, err := strconv.Atoi(ctx.Param("contestId"))
    if err != nil {
        ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid contest ID"})
        return
    }

    problems, err := c.usecase.GetProblems(contestID)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
        return
    }
    ctx.JSON(http.StatusOK, problems)
}

func (c *CodeforcesController) GetStandings(ctx *gin.Context) {
    contestID, err := strconv.Atoi(ctx.Param("contestId"))
    if err != nil {
        ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid contest ID"})
        return
    }

    standings, err := c.usecase.GetStandings(contestID)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
        return
    }
    ctx.JSON(http.StatusOK, standings)
}

func (c *CodeforcesController) GetSubmissions(ctx *gin.Context) {
    contestID, err := strconv.Atoi(ctx.Param("contestId"))
    if err != nil {
        ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid contest ID"})
        return
    }

    from, _ := strconv.Atoi(ctx.Query("from"))
    count, _ := strconv.Atoi(ctx.Query("count"))
    if from == 0 {
        from = 1
    }
    if count == 0 {
        count = 10
    }

    submissions, err := c.usecase.GetSubmissions(contestID, from, count)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
        return
    }
    ctx.JSON(http.StatusOK, submissions)
}

func (c *CodeforcesController) AddContest(ctx *gin.Context) {
    type AddContestRequest struct {
        Name string `json:"name" binding:"required"`
        Link string `json:"link" binding:"required"`
    }

    var req AddContestRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
        return
    }

    contestID, err := c.usecase.AddContest(req.Name, req.Link)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
        return
    }
    ctx.JSON(http.StatusCreated, map[string]int{"contest_id": contestID})
}

func (c *CodeforcesController) GetAllContests(ctx *gin.Context) {
    contests, err := c.usecase.GetAllContests()
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
        return
    }
    ctx.JSON(http.StatusOK, contests)
}

func (c *CodeforcesController) GetUserContestProblems(ctx *gin.Context) {
	userId, err := strconv.Atoi(ctx.Param("userId"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}
	contestProblems, err := c.usecase.GetUserContestProblems(userId)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, contestProblems)
}