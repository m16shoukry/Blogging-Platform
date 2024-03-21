import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { ErrorApiResponse } from '../dto/api-response/Error-api-response.dto';
import { error } from 'console';

@Catch(MongoError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // Extract meaningful information from the exception
    const errorMessage = 'A data error has occurred.';
    let errorDetails = '';

    // Check if the error is a duplicate entry violation
    if (exception.message.includes('Duplicate entry')) {
      const matches = exception.message.match(
        /Duplicate entry '(.*)' for key '(.*)'/,
      );
      if (matches && matches.length >= 3) {
        const duplicateValue = matches[1];
        errorDetails = `Duplicate entry '${duplicateValue}'.`;
      }
    }
    const apiResponse: ErrorApiResponse = new ErrorApiResponse(
      `${errorMessage} ${errorDetails}`,
    );

    this.logger.error(
      exception['response']?.message ?? exception.message,
      exception.stack,
      'QueryFailedExceptionFilter',
    );

    // Set the status code and error message in the response
    response.status(status).json(apiResponse);
  }
}
