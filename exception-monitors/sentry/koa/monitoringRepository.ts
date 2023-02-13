import * as Sentry from '@sentry/node';

export const reportError = (error) => {
  Sentry.captureException(error);
}