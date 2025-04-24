package config

import (
	"os"
)

type Config struct {
	APIKey    string
	APISecret string
}

func LoadConfig() Config {
	return Config{
		APIKey:    os.Getenv("CODEFORCES_API_KEY"),
		APISecret: os.Getenv("CODEFORCES_API_SECRET"),
	}
}
