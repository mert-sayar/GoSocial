import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    thresholds: {
        // Assert that 95% of requests complete within 10ms
        http_req_duration: ["p(95) < 10"],
        // Error rate must be under 1% for actual server errors (5xx, 4xx except 429)
        http_req_failed: ["rate < 0.01"],
    },
    // High volume stages to find the server's peak capacity
    stages: [
        { duration: "10s", target: 30 },  // Ramp up to 30 users
        { duration: "30s", target: 80 }, // Push to 80 VUs to stress test raw throughput
        { duration: "10s", target: 0 },   // Ramp down
    ],
};

export default function () {
    let res = http.get("http://localhost:8080/v1/health");

    // Since Rate Limiter is DISABLED for this test, we ONLY expect 200 OK
    check(res, {
        "status is 200": (r) => r.status === 200,
    });

    sleep(0.1);
}