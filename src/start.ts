import { INestApplication, INestExpressApplication } from '@nestjs/common';
import os = require('os');

export interface AppOptions {
  port: number;
  cors?: boolean;
}

export async function startApp(
  app: INestApplication & INestExpressApplication,
  options: AppOptions,
) {
  if (options.cors) {
    app.enableCors();
  }
  await app.listen(options.port);
  const is = os.networkInterfaces();
  Object.keys(is).forEach(i => {
    is[i].forEach(x =>
      console.log(`listening on http://${x.address}:${options.port}`),
    );
  });
}
