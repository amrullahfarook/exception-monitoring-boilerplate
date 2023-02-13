import Bugsnag from '@bugsnag/js'

export class MonitoringRepository {
  public reportError(error) {

    Bugsnag.notify(error)

  }
}