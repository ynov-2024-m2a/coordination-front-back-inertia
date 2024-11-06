import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@adonisjs/lucid/orm'
import Status from '#models/status'

export default class Phone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare brand: string

  @column()
  declare number: string

  @column()
  declare status_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Status, {
    foreignKey: 'id', // Clé primaire dans le modèle Status
    localKey: 'status_id', // Clé étrangère dans le modèle Phone
  })
  public status: HasOne<typeof Status> | null
}
