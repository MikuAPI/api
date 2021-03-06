import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ImageCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    image: schema.file({
      extnames: ['jpg', 'jpeg', 'png', 'gif'],
      size: '8mb',
    }),
    author: schema.string(),
    source: schema.string({}, [
      rules.url({ ensureProtocol: true, protocols: ['http', 'https'], stripWWW: true }),
      rules.unique({ table: 'images', column: 'image_source' }),
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'required': '{{ field }} is required.',
    'image.extname': 'The image must be a either a jpg, png or gif.',
    'image.size': 'The image must be less than 8mb.',
    'source.url': '{{ field }} must be a valid url.',
    'source.unique': 'This image seems to already exists.',
  }
}
