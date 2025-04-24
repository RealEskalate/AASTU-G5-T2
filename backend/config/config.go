package config

type Config struct {
    APIKey    string
    APISecret string
}

func LoadConfig() Config {
    return Config{
        APIKey:    "b9aeda80a867a8216dfcc5e13dd5da7632d7b6e7",    // Replace with actual API key
        APISecret: "dec6564b62ecc5bab6cd0f9ae21e550c99ae3549", // Replace with actual API secret
    }
}