import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let redis: Redis | undefined;

if (
  redisUrl &&
  redisToken &&
  redisUrl.startsWith("https://") &&
  !redisUrl.includes("your-")
) {
  redis = new Redis({ url: redisUrl, token: redisToken });
}

class NoopRedis {
  async get() {
    return null;
  }
  async set() {
    return "OK";
  }
  async del() {
    return 0;
  }
  async incr() {
    return 0;
  }
  async expire() {
    return 0;
  }
  async eval() {
    return 0;
  }
}

export const ratelimit = new Ratelimit({
  redis: (redis ?? new NoopRedis()) as unknown as Redis,
  limiter: Ratelimit.slidingWindow(2, "10 m"),
});
