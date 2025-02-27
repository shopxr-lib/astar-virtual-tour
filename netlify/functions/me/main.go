package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/shopxr-lib/astar-virtual-tour/netlify/functions/internal/lib"
	"github.com/shopxr-lib/astar-virtual-tour/netlify/functions/internal/registry"
)

var (
	reg *registry.Registry
)

func main() {
	reg = registry.NewRegistry()
	lambda.Start(handler)
}

type MeResponse struct {
	Role string `json:"role"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	cookies, err := validateSession(request)
	if err != nil {
		fmt.Printf("error validating session: %v\n", err)
		return &events.APIGatewayProxyResponse{
			StatusCode: 401,
			Body:       "Unauthorized",
		}, nil
	}

	sessionID, ok := cookies[lib.SessionNameSessionID]
	if !ok {
		fmt.Println("no sessionID found in cookies")
		return &events.APIGatewayProxyResponse{
			StatusCode: 401,
			Body:       "Unauthorized",
		}, nil
	}

	role, err := reg.Redis.Get(ctx, sessionID).Result()
	if err != nil {
		fmt.Printf("error getting session from redis: %v\n", err)
		return &events.APIGatewayProxyResponse{
			StatusCode: 401,
			Body:       "Unauthorized",
		}, nil
	}

	response := MeResponse{
		Role: role,
	}

	responseBytes, _ := json.Marshal(response)

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(responseBytes),
	}, nil
}

func validateSession(request events.APIGatewayProxyRequest) (map[string]string, error) {
	cookie, ok := request.Headers["cookie"]
	if !ok || len(cookie) == 0 {
		return nil, fmt.Errorf("no cookie found")
	}
	cookies := parseCookies(cookie)

	return cookies, nil
}

func parseCookies(cookieHeader string) map[string]string {
	cookies := map[string]string{}
	parts := strings.Split(cookieHeader, ";")
	for _, part := range parts {
		pair := strings.SplitN(strings.TrimSpace(part), "=", 2)
		if len(pair) == 2 {
			cookies[pair[0]] = pair[1]
		}
	}
	return cookies
}
