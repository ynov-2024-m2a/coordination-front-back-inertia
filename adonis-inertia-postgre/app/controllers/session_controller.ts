import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('auth/login')
  }

  public async registerIndex({ inertia }: HttpContextContract) {
    return inertia.render('auth/register')
  }

  async register({ request, auth, response, inertia }: HttpContext) {
    try {
      const data = request.only(['firstName', 'lastName', 'email', 'password'])
      await User.create(data)
      return response.redirect('/login')
    } catch {
      return inertia.render('auth/register', {
        errors: {
          message: 'Une erreur est survenue',
        },
      })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
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
