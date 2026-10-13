import http from "k6/http";
import { check, sleep } from "k6";

// Test configuration
export const options = {
    thresholds: {
        // Assert that 95% of requests finish within 10ms.
        http_req_duration: ["p(95) < 10"],
    },
    // Ramp the number of virtual users up and down
    stages: [
        { duration: "10s", target: 15 },
        { duration: "30s", target: 30 },
        { duration: "10s", target: 0 },
    ],
};

// Simulated user behavior
export default function () {
    let res = http.get("http://localhost:8080/v1/health");
    // Validate response status
    check(res, { "status is 200 or 429": (r) => r.status == 200 || r.status == 429 });
    sleep(0.1); // 100ms
}