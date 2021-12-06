import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

export default class CoresController {
  public async getHealth({ response }: HttpContextContract) {
    const health = await HealthCheck.getReport()
    const status = {
      isReady: HealthCheck.isReady(),
      isLive: await HealthCheck.isLive(),
    }
    return response.ok(Object.assign({}, health, status))
  }
}
