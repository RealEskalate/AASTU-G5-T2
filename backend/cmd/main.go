package main

import (
	"a2sv_hub/internal/infrastructure"
	"log"
)

func main() {
	// Initialize database connection
	db, err := infrastructure.NewDB()
	if err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}
	defer db.Close() // Ensure the connection is closed when main exits

	// If we reach here, the connection is successful
	log.Println("Successfully connected to PostgreSQL database!")

	// Optional: Run a simple query to further verify
	var version string
	err = db.QueryRow("SELECT version()").Scan(&version)
	if err != nil {
		log.Fatalf("Failed to query database version: %v", err)
	}
	log.Printf("PostgreSQL version: %s", version)
}
