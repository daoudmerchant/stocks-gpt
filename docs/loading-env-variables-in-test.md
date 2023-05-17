1. Include API key in `.env.test` environment
2. Load environmental variables in test, e.g.:

```ts
import { loadEnvConfig } from "@next/env";

beforeAll(() => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
});
```
