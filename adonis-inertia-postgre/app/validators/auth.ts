import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    firstName: vine.string().maxLength(254),
    lastName: vine.string().maxLength(254),
    email: vine.string().maxLength(254).email().normalizeEmail(),
    password: vine.string().minLength(8),
  })
)
