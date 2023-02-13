import Bugsnag from '@bugsnag/js'
import BugsnagPluginKoa from '@bugsnag/plugin-koa'

export const monitoringConnection = () => {
    Bugsnag.start({
    apiKey: 'YOUR_API_KEY',
    plugins: [BugsnagPluginKoa],
    autoDetectErrors: false
    })
}