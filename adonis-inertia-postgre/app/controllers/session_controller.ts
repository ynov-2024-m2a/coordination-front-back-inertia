import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/auth'

export default class SessionController {
  public async index({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  public async registerIndex({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async register({ request, auth, response, inertia }: HttpContext) {
    try {
      const data = await request.validateUsing(registerValidator)
      await User.create(data)

      return response.redirect('/login')
    } catch (error) {
      return inertia.render('auth/register', {
        errors: error.messages || { message: 'Une erreur inattendue est survenue.' },
      })
    }
  }

  public async logout({ auth, response }: HttpContext) {
    try {
      await auth.use('web').logout()
      return response.redirect('/login')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      return response.status(500).send('Erreur lors de la déconnexion')
    }
  }

  async login({ request, auth, response, inertia }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      response.redirect('/phones')
    } catch {
      return inertia.render('auth/login', {
        errors: {
          message: 'Les informations de connexion sont incorrectes',
        },
      })
    }
  }
}
