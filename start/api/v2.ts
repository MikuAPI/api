import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('*', () => {
    return {
      status: 'error',
      message: "v2 has been deprecated since v3. More informations in the 'about' key.",
      about: `v2 has been deprecated in favor of v3 for the main reasons of missing the creators names.
It is for me, not responsable to deliver images if they do not contain their respective creator, and so is the reason of the v2's deprecation.
Please use v3 ASAP to keep using the API. Thank you.`,
    }
  })
}).prefix('/api/v2')
