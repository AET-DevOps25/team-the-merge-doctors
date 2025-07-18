# MentorPulse Client

TODO: give overview of client

## Docker

In the client directory execute the following commands

To build the image:

```
docker build -t mentor-pulse-client-image .
```

To run the container:

```
docker run -d --name mentor-pulse-client-container -p 3000:3000 mentor-pulse-client-image
```

Or use the docker compose file in the root directory to build the entire application including server services.

## Testing (E2E/UI tests)

The client is tested using E2E/UI tests. We use playwright as the framework for testing.

### Execute tests

1. Start Services: Start docker with `docker compose up --build`.
2. Configure Node: Execute `nvm use` to use the correct node version.
3. Run Tests: `pnpm exec playwright test`
4. Show Report: `pnpm exec playwright show-report`

### Execute tests with UI

Alternatively, you can also execute the tests using a UI.

1. Modify Configuration:

- Comment out `teardown: 'teardown'` in the project `setup` in the [playwright config](playwright.config.ts).
- Comment out `dependencies: ['setup']` in the projcet `chromium`

2. Run Playwright UI: Execute the following command:

```
pnpm exec playwright test --ui
```

3. Run Projects

- Firstly, execute the `setup` project.
- Then execute the tests you want to run.
- Finally, execute the `teardown` project.
