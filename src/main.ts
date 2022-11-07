import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { xss } from 'express-xss-sanitizer';
import helmet from 'helmet';
import * as hpp from 'hpp';
import * as compression from 'compression';

async function bootstrap() {
  //const clientUrl = process.env.CLIENT_URL || ['http://localhost:3000'];
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const corsOptions = { origin: 'http://localhost:5173', credentials: true };
  //app.use(cors(corsOptions));

  app.enableShutdownHooks();

  app.enableCors(corsOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  app.use(helmet(), hpp(), xss(), compression());

  // app.setGlobalPrefix('api', {
  //   exclude: [{ path: '/health', method: RequestMethod.GET }],
  // });
  //useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT);
  console.log(`Server listening on port ${process.env.PORT}`);
}
bootstrap();
