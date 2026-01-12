const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  /* Configurações globais para os testes */
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // Tempo de espera para elementos aparecerem (ajudando com animações)
    actionTimeout: 5000,
  },

  /* Tempo máximo para cada teste individual */
  timeout: 40000,
  expect: {
    // Timeout para asserções (importante para o efeito typewriter de 3.5s)
    timeout: 8000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Teste Mobile - Crucial para validar o sumiço do menu @media 768px */
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});