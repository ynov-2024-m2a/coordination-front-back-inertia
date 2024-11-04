/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const PhonesController = () => import('#controllers/phones_controller')

// Route pour la page d'accueil
router.on('/').renderInertia('home')

// Authentification
router.get('/register', async (ctx) => {
  return ctx.inertia.render('auth/register')
})

router.get('/login', async (ctx) => {
  return ctx.inertia.render('auth/login')
})

// Routes pour les téléphones
router.get('/phones', [PhonesController, 'index']) // Liste des téléphones
router.get('/phones/create', [PhonesController, 'create']) // Formulaire de création d'un téléphone
router.post('/phones', [PhonesController, 'store']) // Ajout d'un téléphone
router.get('/phones/:id/edit', [PhonesController, 'edit']) // Formulaire de modification d'un téléphone
router.put('/phones/:id', [PhonesController, 'update']) // Mise à jour d'un téléphone (PUT ou PATCH)
router.delete('/phones/:id', [PhonesController, 'destroy']) // Suppression d'un téléphone

// Optionnel : Route pour afficher un téléphone individuel
router.get('/phones/:id', [PhonesController, 'show'])
