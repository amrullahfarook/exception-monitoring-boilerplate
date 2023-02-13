import * as Sentry from "@sentry/node";

export class MonitoringConnection{
    public startMonitoring() {

        Sentry.init({ dsn: "https://examplePublicKey@o0.ingest.sentry.io/0" });

    }
}