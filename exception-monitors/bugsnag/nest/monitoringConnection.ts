import Bugsnag from '@bugsnag/js'
import BugsnagPluginExpress from '@bugsnag/plugin-express'

export class MonitoringConnection{
    public startMonitoring() {

        Bugsnag.start({
        apiKey: 'ce7a1a64855b082e2fa56c96459af281',
        plugins: [BugsnagPluginExpress],
        autoDetectErrors: false
        })

    }
}