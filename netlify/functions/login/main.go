package main

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/shopxr-lib/astar-virtual-tour/netlify/functions/internal/lib"
	"github.com/shopxr-lib/astar-virtual-tour/netlify/functions/internal/registry"
)

var (
	reg *registry.Registry

	sessionDuration = 7 * 24 * time.Hour
)

var passwords = map[string]string{
	"private": "password1",
	"public":  "password2",
}

func main() {
	reg = registry.NewRegistry()
	lambda.Start(handler)
}

type LoginRequest struct {
	Password string `json:"password"`
}

type LoginResponse struct {
	Success bool `json:"success"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	var passwordRequest LoginRequest
	err := json.Unmarshal([]byte(request.Body), &passwordRequest)
	if err != nil {
		return &events.APIGatewayProxyResponse{StatusCode: http.StatusBadRequest}, err
	}

	role := ""
	for key, value := range passwords {
		if passwordRequest.Password == value {
			role = key
			break
		}
	}

	if role == "" {
		return &events.APIGatewayProxyResponse{
			StatusCode: http.StatusUnauthorized,
			Body:       "Unauthorized",
		}, nil
	}

	// Generate a session ID
	sessionID, err := generateSessionID(16)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       "Internal Server Error",
		}, nil
	}

	// Store the session ID in Redis
	if err = reg.Redis.Set(ctx, sessionID, role, sessionDuration).Err(); err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       "Internal Server Error",
		}, nil
	}

	response := LoginResponse{Success: true}

	responseBody, _ := json.Marshal(response)

	cookie := http.Cookie{
		Name:     lib.SessionNameSessionID,
		Value:    sessionID,
		Path:     "/",
		Expires:  time.Now().Add(sessionDuration),
		HttpOnly: true,
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(responseBody),
		Headers: map[string]string{
			"Set-Cookie": cookie.String(),
		},
	}, nil
}

func generateSessionID(length int) (string, error) {
	b := make([]byte, length)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}

	return hex.EncodeToString(b), nil
}
