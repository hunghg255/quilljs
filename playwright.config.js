import { devices } from '@playwright/test';
const config = {
    testDir: './e2e',
    testMatch: '*.spec.ts',
    timeout: 30 * 1000,
    expect: {
        timeout: 5000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'list',
    use: {
        actionTimeout: 0,
        trace: 'on-first-retry',
    },
    projects: [
        { name: 'Chrome', use: Object.assign({}, devices['Desktop Chrome']) },
        { name: 'Firefox', use: Object.assign({}, devices['Desktop Firefox']) },
        { name: 'Safari', use: Object.assign({}, devices['Desktop Safari']) },
        { name: 'Edge', use: { channel: 'msedge' } },
    ],
};
export default config;
//# sourceMappingURL=playwright.config.js.map