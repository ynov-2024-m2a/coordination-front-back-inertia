import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Phone from '#models/phone'
import Status from '#models/status'

export default class PhonesController {
  public async index({ inertia }: HttpContextContract) {
    // Charger les téléphones avec le statut associé
    const phones = await Phone.query().preload('status')
    const statuses = await Status.all()
    return inertia.render('phone/index', {
      phones: phones.map((phone) => ({
        ...phone.toJSON(),
        status: phone.status.name || '',
        status_id: phone.status_id,
      })),
      statuses: statuses.map((status) => status.toJSON()),
    })
  }

  public async create({ inertia }: HttpContextContract) {
    const statuses = await Status.all()
    return inertia.render('phone/create', { statuses: statuses.map((status) => status.toJSON()) })
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['name', 'brand', 'number', 'status_id'])
    await Phone.create(data)
    return response.redirect('/phones')
  }

  public async show({ inertia, params }: HttpContextContract) {
    const phone = await Phone.findOrFail(params.id)
    return inertia.render('phone/show', { phone })
  }

  public async edit({ inertia, params }: HttpContextContract) {
    const phone = await Phone.findOrFail(params.id)
    const statuses = await Status.all()
    return inertia.render('phone/edit', {
      phone: phone.toJSON(),
      statuses: statuses.map((status) => status.toJSON()),
    })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const phone = await Phone.findOrFail(params.id)
    const data = request.only(['name', 'brand', 'number', 'status_id'])
    phone.merge(data)
    await phone.save()
    return response.redirect('/phones')
  }

  public async destroy({ params, response }: HttpContextContract) {
    const phone = await Phone.findOrFail(params.id)
    await phone.delete()
    return response.redirect('/phones')
  }
}
