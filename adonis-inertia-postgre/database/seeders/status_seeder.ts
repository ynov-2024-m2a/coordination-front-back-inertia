import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Status from '#models/status'

export default class extends BaseSeeder {
  public async run() {
    await Status.createMany([
      { name: 'Disponible' },
      { name: 'Non disponible' },
      { name: 'Réservé' },
      { name: 'Vendu' },
      { name: 'Réparation' },
    ])
  }
}
