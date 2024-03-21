import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { GlobalExceptionFilter } from './common/exception-filters/global-exception.filter';
import { QueryFailedExceptionFilter } from './common/exception-filters/query-failed-exception.filter';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
  });
  const app = await NestFactory.create(AppModule, { logger });
  app.enableCors({
    origin: '*',
  });
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new QueryFailedExceptionFilter(),
  );
  app.use((req, _, next) => {
    logger.log(
      `${req.method} ${req.originalUrl} ${JSON.stringify(
        req.query,
      )} ${JSON.stringify(req.params)} ${req.statusCode ?? ''}`,
    );
    return next();
  });

  const options = new DocumentBuilder()
    .setTitle('Base Web API')
    .setDescription('Back End for Base App')
    .setVersion('1.0.0')
    .addBearerAuth({
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Base Swagger API',
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, skipMissingProperties: true }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
