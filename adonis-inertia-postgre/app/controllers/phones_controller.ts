import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Phone from '#models/phone'

export default class PhonesController {
  public async index({ inertia }: HttpContextContract) {
    const phones = await Phone.all()
    return inertia.render('phone/index', { phones: phones.map((phone) => phone.toJSON()) })
  }

  public async create({ inertia }: HttpContextContract) {
    return inertia.render('phone/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['name', 'brand', 'number', 'status'])
    data.brand = data.brand.toLowerCase()
    await Phone.create(data)
    return response.redirect('/phones')
  }

  public async show({ inertia, params }: HttpContextContract) {
    const phone = await Phone.findOrFail(params.id)
    return inertia.render('phone/show', { phone })
  }

  public async edit({ inertia, params }: HttpContextContract) {
    const phone = await Phone.findOrFail(params.id)
    return inertia.render('phone/edit', { phone })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const phone = await Phone.findOrFail(params.id)
    const data = request.only(['name', 'brand', 'number', 'status'])
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
