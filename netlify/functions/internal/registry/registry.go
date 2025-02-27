package registry

import (
	"os"

	"github.com/go-redis/redis/v8"
)

type Registry struct {
	Redis *redis.Client
}

func NewRegistry() *Registry {
	reg := &Registry{}

	opt, err := redis.ParseURL(os.Getenv("REDIS_URL"))
	if err != nil {
		panic(err)
	}

	reg.Redis = redis.NewClient(opt)

	return reg
}
