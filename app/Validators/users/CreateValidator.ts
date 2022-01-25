import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserCreateValidator {
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
    name: schema.string({}, [rules.unique({ table: 'users', column: 'name' })]),
    email: schema.string({}, [
      rules.email({ sanitize: true }),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [rules.minLength(6)]),
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
    'required': 'This field is required.',
    'unique': 'Someone already use this {{ field }}, please use another.',
    'email.email': 'This is not a valid/acceptable email.',
    'email.unique': 'This email is already in use, did you mean to login?',
    'password.minLength': 'The password must be longer.',
  }
}
