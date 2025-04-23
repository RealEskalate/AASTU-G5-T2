package errors

type CustomError struct {
	StatusCode int    `json:"status_code"`
	Message    string `json:"message"`
	Error      error
	ErrorMap   map[int]string `json:"error_map"`
}
