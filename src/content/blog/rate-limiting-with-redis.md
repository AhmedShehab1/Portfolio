---
title: "Rate Limiting an API with Redis and a Sliding Window"
description: "A practical walkthrough of implementing sliding-window rate limits without a queue."
pubDate: 2026-07-02
tags: ["backend", "redis", "infra"]
---

Fixed-window rate limiting is easy to implement and easy to get burned by:
a client can send double its limit by timing requests around the window
boundary. A sliding window log fixes this with a small amount of extra
bookkeeping in Redis.

## The approach

For each client, keep a sorted set where the score is the request
timestamp. On every request:

```python
import time

def is_allowed(redis, key, limit, window_seconds):
    now = time.time()
    window_start = now - window_seconds

    pipe = redis.pipeline()
    pipe.zremrangebyscore(key, 0, window_start)
    pipe.zadd(key, {str(now): now})
    pipe.zcard(key)
    pipe.expire(key, window_seconds)
    _, _, count, _ = pipe.execute()

    return count <= limit
```

This trims anything older than the window, records the new request, counts
what's left, and sets a TTL so idle keys clean themselves up. Because it
runs as a single pipeline, it's atomic enough for most workloads without
needing a Lua script — though under high contention, wrapping it in one
is worth it.

## What this buys you

The sorted set gives you an exact count of requests in the trailing window
at any instant, not just per fixed bucket — so a burst can't sneak through
at a window edge. The cost is a small amount of memory per active client,
proportional to their request rate, which Redis handles comfortably at
normal API scale.
