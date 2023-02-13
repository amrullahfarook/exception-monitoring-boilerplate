import * as Sentry from "@sentry/node";

export const monitoringConnection = () => {
Sentry.init({ dsn: "https://examplePublicKey@o0.ingest.sentry.io/0" });    
}