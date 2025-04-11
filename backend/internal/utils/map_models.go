package utils

import "a2sv_hub/internal/models"

func MapToUserProfile(user models.UserModel) models.UserProfileResponse {
	return models.UserProfileResponse{
		ID:                     user.ID,
		Name:                   user.Name,
		Email:                  user.Email,
		Photo:                  user.Photo,
		University:             user.University,
		Role:                   user.Role,
		Country:                user.Country,
		JoinedDate:             user.JoinedDate,
		ExpectedGraduationDate: user.ExpectedGraduationDate,
		ShortBio:               user.ShortBio,
		LeetCode:               user.LeetCode,
		Codeforces:             user.Codeforces,
		GitHub:                 user.GitHub,
		Instagram:              user.Instagram,
		Phone:                  user.Phone,
		Group:                  user.Group,
	}
}
