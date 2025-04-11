package controller

import (
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/usecase"
	"strconv"

	"github.com/gin-gonic/gin"
)

type GroupController interface {
	CreateNewGroup(c *gin.Context)
	UpdateGroup(c *gin.Context)
	GetAllGroups(c *gin.Context)
	GetGroupById(c *gin.Context)
	DeleteGroup(c *gin.Context)
}

type groupController struct {
	groupUsecase usecase.GroupUsecase
}

// CreateNewGroup implements GroupController.
func (g *groupController) CreateNewGroup(c *gin.Context) {
	var groupModel models.GroupModel
	if err := c.ShouldBindJSON(&groupModel); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Assuming you have a usecase layer with a method to handle group creation
	err := g.groupUsecase.CreateGroup(groupModel)
	if err != nil {
		c.JSON(err.StatusCode, gin.H{"error": err.Error, "message": err.Message, "status": err.StatusCode})
		return
	}

	c.JSON(201, gin.H{"message": "Group created successfully"})
}

// DeleteGroup implements GroupController.
func (g *groupController) DeleteGroup(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("group_id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid group ID"})
		return
	}
	customerr := g.groupUsecase.DeleteGroup(id)
	if customerr != nil {
		c.JSON(500, gin.H{"error": "Failed to delete group"})
		return
	}

	c.JSON(200, gin.H{"message": "Group deleted successfully"})
}

// GetAllGroups implements GroupController.
func (g *groupController) GetAllGroups(c *gin.Context) {
	groups, err := g.groupUsecase.GetAllGroups()
	if err != nil {
		c.JSON(err.StatusCode, gin.H{"error": err, "message": err.Message, "status": err.StatusCode})
		return
	}

	c.JSON(200, groups)
}

// GetGroupById implements GroupController.
func (g *groupController) GetGroupById(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("group_id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid group ID"})
		return
	}

	group, customerr := g.groupUsecase.GetGroupById(id)
	if customerr != nil {
		c.JSON(customerr.StatusCode, gin.H{"error": customerr.Error, "message": customerr.Message, "status": customerr.StatusCode})
		return
	}

	c.JSON(200, group)
}

// UpdateGroup implements GroupController.
func (g *groupController) UpdateGroup(c *gin.Context) {
	var groupModel models.GroupModel
	id, err := strconv.Atoi(c.Param("group_id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid group ID"})
		return
	}

	if err := c.ShouldBindJSON(&groupModel); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	groupModel.ID = id
	customerr := g.groupUsecase.UpdateGroup(id, groupModel)
	if customerr != nil {
		c.JSON(customerr.StatusCode, gin.H{"error": customerr.Error, "message": customerr.Message, "status": customerr.StatusCode})
		return
	}

	c.JSON(200, gin.H{"message": "Group updated successfully"})
}

func NewGroupController(usecase usecase.GroupUsecase) GroupController {
	return &groupController{
		groupUsecase: usecase,
	}
}
