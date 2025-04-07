package utils

import (
	"fmt"
	"log"
	"os"

	"gopkg.in/gomail.v2"
)

func ValidPassword() {
}

type EmailService interface {
	SendInvitationEmail(receiver string, token string) error
}

type emailService struct{}

// SendInvitationEmail implements EmailService.
func (e *emailService) SendInvitationEmail(receiver string, token string) error {

	// SMTP configuration
	smtpHost := "smtp.gmail.com" // Your SMTP server
	smtpPort := 587              // SMTP port, typically 587 for TLS
	smtpUser := os.Getenv("SMTP_USER")
	smtpPass := os.Getenv("SMTP_PASS")

	// Create a new Gomail message
	m := gomail.NewMessage()

	// Set the email sender and receiver
	m.SetHeader("From", smtpUser)
	m.SetHeader("To", receiver)
	m.SetHeader("Subject", "Invitation to Set Your Password")

	// Create the email body (plain text or HTML)
	body := fmt.Sprintf(`Hello,

You have received an invitation to set your password. Please click the link below to set a new password:

http://localhost:8080/auth/set-password?token=%s

If you did not request this, please ignore this email.

Best regards,
Your Team`, token)

	// Set the email body
	m.SetBody("text/plain", body)

	// Dial the SMTP server
	log.Println("Connecting to SMTP server...", smtpUser, smtpPass)
	dialer := gomail.NewDialer(smtpHost, smtpPort, smtpUser, smtpPass)

	// Send the email
	err := dialer.DialAndSend(m)
	if err != nil {
		log.Println("Failed to send invitation email:", err)
		return err
	}

	log.Println("Invitation email sent successfully!")
	return nil

}

func NewEmailService() EmailService {
	return &emailService{}
}
