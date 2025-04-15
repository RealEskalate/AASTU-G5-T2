package controller

import (
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/usecase"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)
type TrackController interface {
	CreateTrack(ctx *gin.Context)
	UpdateTrack(ctx *gin.Context)
	DeleteTrack(ctx *gin.Context)
	GetTrackByID(ctx *gin.Context)
	GetTrackProgressList(ctx *gin.Context)
	GetProblemsByDay(ctx *gin.Context)
	
}
type trackController struct {
	usecase usecase.TrackUsecase // Inject the usecase to handle business logic
}
func NewTrackController(u usecase.TrackUsecase) TrackController {
	return &trackController{usecase: u}
}




func (c *trackController) CreateTrack(ctx *gin.Context) {
	var track models.Track
	track.Active = true
	if err := ctx.ShouldBindJSON(&track); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	if err := c.usecase.CreateTrack(&track); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create track"})
		return
	}

	ctx.JSON(http.StatusCreated, track)
}

func (c *trackController) UpdateTrack(ctx *gin.Context) {
	var track models.Track
	trackID, err := strconv.Atoi(ctx.Param("track_id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid track ID"})
		return
	}

	if err := ctx.ShouldBindJSON(&track); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.usecase.UpdateTrack(trackID, &track); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Track updated successfully"})
}




func (c *trackController) DeleteTrack(ctx *gin.Context) {
	trackID, err := strconv.Atoi(ctx.Param("track_id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid track ID"})
		return
	}

	err = c.usecase.DeleteTrack(trackID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete track"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Track deleted successfully"})
}

func (c *trackController) GetTrackByID(ctx *gin.Context) {
	trackID, err := strconv.Atoi(ctx.Param("track_id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid track ID"})
		return
	}

	track, err := c.usecase.GetTrackByID(trackID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch track"})
		return
	}
	if track == nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Track not found"})
		return
	}

	ctx.JSON(http.StatusOK, track)
}



func (c *trackController) GetTrackProgressList(ctx *gin.Context) {
	trackIdStr := ctx.Param("track_id")
	groupIdStr := ctx.Param("group_id")

	trackId, err := strconv.Atoi(trackIdStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid track_id"})
		return
	}

	groupId, err := strconv.Atoi(groupIdStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid group_id"})
		return
	}

	progressList, err := c.usecase.GetTrackProgressList(trackId, groupId)
	fmt.Printf("Progress: %+v\n", progressList)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch progress"})
		return
	}

	ctx.JSON(http.StatusOK, progressList)
}


func (c *trackController) GetProblemsByDay(ctx *gin.Context) {

	trackIdStr := ctx.Param("track_id")

	trackId, err := strconv.Atoi(trackIdStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid track_id"})
		return
	}
	dayGroup, err := c.usecase.GetProblemsByDay(trackId)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch problems"})
		return
	}
	ctx.JSON(http.StatusOK, dayGroup)
}
