package utils

import (
	"a2sv_hub/internal/errors"
	"context"
	"os"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

type FileUploadService interface {
	UploadFile(filePath string, fileName string) (string, *errors.CustomError)
}

type fileUploadService struct{}

func (f *fileUploadService) UploadFile(filePath string, fileName string) (string, *errors.CustomError) {
	// Use CLOUDINARY_URL from environment: cloudinary://<API_KEY>:<API_SECRET>@<CLOUD_NAME>
	cld, err := cloudinary.NewFromURL(os.Getenv("CLOUDINARY_URL"))
	if err != nil {
		return "", &errors.CustomError{StatusCode: 500, Message: "cloudinary configuration failed", Error: err}
	}

	ctx := context.Background()

	uploadResult, err := cld.Upload.Upload(ctx, filePath, uploader.UploadParams{
		PublicID: fileName,
	})
	if err != nil {
		return "", &errors.CustomError{StatusCode: 500, Message: "cloudinary configuration failed", Error: err}
	}

	return uploadResult.SecureURL, nil
}

func NewFileUploadService() FileUploadService {
	return &fileUploadService{}
}
