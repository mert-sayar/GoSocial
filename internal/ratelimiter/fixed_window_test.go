package ratelimiter

import (
	"sync"
	"sync/atomic"
	"testing"
	"time"
)

func TestFixedWindowRateLimiter_Concurrent(t *testing.T) {
	rl := NewFixedWindowLimiter(5, time.Minute)
	var allowed int64
	var wg sync.WaitGroup

	for i := 0; i < 200; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			if ok, _ := rl.Allow("1.2.3.4"); ok {
				atomic.AddInt64(&allowed, 1)
			}
		}()
	}
	wg.Wait()

	if allowed > 5 {
		t.Fatalf("limit is 5 but %d request has passed", allowed)
	}
}
