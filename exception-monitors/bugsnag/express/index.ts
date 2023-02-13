import Bugsnag from '@bugsnag/js'
import BugsnagPluginExpress from '@bugsnag/plugin-express'

export const monitoringConnection = () => {
    Bugsnag.start({
    apiKey: 'YOUR_API_KEY',
    plugins: [BugsnagPluginExpress],
    autoDetectErrors: false
    })
}