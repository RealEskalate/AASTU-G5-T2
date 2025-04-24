package usecase

import (
	"a2sv_hub/internal/models"
	"a2sv_hub/internal/repository"
	// "fmt"
)


type TrackUsecase interface {
	CreateTrack(track *models.Track) error
	UpdateTrack(trackID int, updatedTrack *models.Track) error
	DeleteTrack(trackID int) error
	GetTrackByID(trackID int) (*models.Track, error)
	GetTrackProgressList(trackId, groupId int) ([]models.TrackProgress, error)
	GetProblemsByDay(trackId int) (map[string]models.DayGroup, error)
}

type trackUsecase struct {
	trackRepo repository.TrackRepository
}


func NewTrackUsecase(trackRepo repository.TrackRepository) TrackUsecase {
	return &trackUsecase{
		trackRepo: trackRepo,
	}
}
 
func(u *trackUsecase) CreateTrack(track *models.Track) error {
	err := u.trackRepo.CreateTrack(track)
	if err != nil {
		return err
	}
	return nil

}

func (u *trackUsecase) UpdateTrack(trackID int, updatedTrack *models.Track) error {
	err:= u.trackRepo.UpdateTrack(trackID, updatedTrack)
	if err != nil {
		return err
	}
	return nil
}

func (u *trackUsecase) DeleteTrack(trackID int) error {
	err:= u.trackRepo.DeleteTrack(trackID)
	if err != nil {
		return err
	}
	return nil
}

func (u *trackUsecase) GetTrackByID(trackID int) (*models.Track, error) {
	track, err := u.trackRepo.GetTrackByID(trackID)
	if err != nil {
		return nil, err
	}
	return track, nil
}

func (u *trackUsecase) GetTrackProgressList(trackId, groupId int) ([]models.TrackProgress, error) {

	progressList, err := u.trackRepo.GetTrackProgressList(trackId, groupId)
	if err != nil {
		return nil, err
	}
	return progressList, nil
}


func (u *trackUsecase) GetProblemsByDay(trackId int) (map[string]models.DayGroup, error) {
	
	dayGroupMap, err := u.trackRepo.GetProblemsByDay(trackId)
	if err != nil {
		return nil, err
	}
	return dayGroupMap, nil
}