import Bugsnag from '@bugsnag/js'

export const reportError = (error) => {
  Bugsnag.notify(error)
}