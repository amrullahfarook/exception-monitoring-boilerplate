import * as Sentry from '@sentry/node';

export class MonitoringRepository {
  public reportError(error) {

  Sentry.captureException(error);

  }
}