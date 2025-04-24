package config

import (
    "github.com/joho/godotenv"
    "log"
    "os"
)

type Config struct {
    APIKey    string
    APISecret string
}

func LoadConfig() Config {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    return Config{
        APIKey:    os.Getenv("CODEFORCES_API_KEY"),
        APISecret: os.Getenv("CODEFORCES_API_SECRET"),
    }
}
