/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import Route from '@ioc:Adonis/Core/Route'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const PhonesController = () => import('#controllers/phones_controller')
const SessionController = () => import('#controllers/session_controller')

// Auth routes
router.get('/register', [SessionController, 'registerIndex'])
router.post('/register', [SessionController, 'register'])
router.get('/login', [SessionController, 'index'])
router.post('/login', [SessionController, 'login'])
router.post('/logout', [SessionController, 'logout'])

// Routes pour les téléphones
router.get('/phones', [PhonesController, 'index']).use(middleware.auth())
router.get('/phones/create', [PhonesController, 'create']).use(middleware.auth())
router.post('/phones', [PhonesController, 'store']).use(middleware.auth())
router.get('/phones/:id/edit', [PhonesController, 'edit']).use(middleware.auth())
router.put('/phones/:id', [PhonesController, 'update']).use(middleware.auth())
router.delete('/phones/:id', [PhonesController, 'destroy']).use(middleware.auth())

// Optionnel : Route pour afficher un téléphone individuel
router.get('/phones/:id', [PhonesController, 'show']).use(middleware.auth())
