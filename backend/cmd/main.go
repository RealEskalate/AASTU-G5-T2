package main

import (
	"a2sv_hub/internal/infrastructure"
	"a2sv_hub/internal/route"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	// Initialize database connection

	err := godotenv.Load("../.env")
	if err != nil {
		log.Println("No .env file found, using system env vars")
	}

	db, err := infrastructure.NewDB()
	if err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}
	defer db.Close()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r := route.SetupRouter(db)

	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
