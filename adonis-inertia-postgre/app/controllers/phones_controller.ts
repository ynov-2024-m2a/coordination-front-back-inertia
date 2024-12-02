import { HttpContext } from '@adonisjs/core/http'
import Phone from '#models/phone'

export default class PhonesController {
  public async index({ inertia }: HttpContext) {
    const phones = await Phone.all()
    const activePhonesCountResult = await Phone.query()
      .where('status', 'active')
      .count('id as total')

    const repairPhonesCountResult = await Phone.query()
      .where('status', 'repair')
      .count('id as total')

    const activePhonesCount = activePhonesCountResult[0]?.$extras.total || 0
    const repairPhonesCount = repairPhonesCountResult[0]?.$extras.total || 0
    return inertia.render('phone/index', {
      phones: phones.map((phone) => phone.toJSON()),
      activePhonesCount: Number.parseInt(activePhonesCount, 10),
      repairPhonesCount: Number.parseInt(repairPhonesCount, 10),
    })
  }

  public async create({ inertia }: HttpContext) {
    return inertia.render('phone/create')
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'brand', 'number', 'status'])
    data.brand = data.brand.toLowerCase()
    await Phone.create(data)
    return response.redirect('/phones')
  }

  public async show({ inertia, params }: HttpContext) {
    const phone = await Phone.findOrFail(params.id)
    return inertia.render('phone/show', { phone })
  }

  public async edit({ inertia, params }: HttpContext) {
    const phone = await Phone.findOrFail(params.id)
    return inertia.render('phone/edit', { phone })
  }

  public async update({ request, response, params }: HttpContext) {
    const phone = await Phone.findOrFail(params.id)
    const data = request.only(['name', 'brand', 'number', 'status'])
    phone.merge(data)
    await phone.save()
    return response.redirect('/phones')
  }

  public async destroy({ params, response }: HttpContext) {
    const phone = await Phone.findOrFail(params.id)
    await phone.delete()
    return response.redirect('/phones')
  }
}
