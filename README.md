<h1 align="center">MikuAPI v3 💙</h1>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-2.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/Predeactor1" target="_blank">
    <img alt="Twitter: Predeactor1" src="https://img.shields.io/twitter/follow/Predeactor1.svg?style=social" />
  </a>
  <!-- TODO: When actions are setup, remove comments here -->
  <!-- <a href="https://github.com/Predeactor/MikuAPI/actions/workflows/build-app.yml"> 
    <img alt="Build status of main branch" src="https://github.com/MikuAPI/api/actions/workflows/build-app.yml/badge.svg?branch=main" />
  </a> -->
</p>

> A random image API for Hatsune Miku.

**MikuAPI** is an API created to give you a random image of the popular vocaloid Hatsune Miku.

Features:

- Allow you to add your own images
- Fully working
- Users ecosystem

Check it out by yourself at https://miku-for.us/

### 🏠 [Homepage](https://miku-for.us) / ✨ [Discord Server](https://discord.gg/puur8kPUH3)

## Technologies

- [AdonisJS v5](https://adonisjs.com) for our backend/frontend.
- [TailwindCSS v2](https://tailwindcss.com/) for our CSS.
- [PostgreSQL](https://www.postgresql.org/) for our database.
- [Yarn](https://yarnpkg.com) for our package manager.

## Install

```sh
yarn
```

## Usage

### Test in development:

```sh
yarn dev
```

### Build for production:

```sh
yarn build
```

This project is proudly ran by [AdonisJS v5](https://adonisjs.com). Consider reading their [documentation](https://docs.adonisjs.com/) to use this project.

If you're using PM2 for running MikuAPI, you'll require PostgreSQL to work correcty, or manually edit `ecosystem.config.js`.
In development, the DB will be `mikuapi_dev`, in production, the DB will be `mikuapi`.

- Support for WindiCSS

We use WindiCSS for creating the frontend style. If you want to setup the autocompletion on your side, you need to do the following:

1. Install WindiCSS Intellisense extension: https://windicss.org/editors/vscode.html
2. Open commands, and use the command `Preferences: Open Settings (JSON)`, it will open a JSON file, it represent your settings.
3. At the bottom of this file, add the following lines to your JSON:

```json
"windicss.includeLanguages": {
  "edge": "html"
}
```

You should now be set!

## Author

🔨 **Predeactor**

_When I installed the app for production for first time, the DB was SQLite3 in the /tmp folder._

- Website: https://predeactor.net
- Twitter: [@Predeactor1](https://twitter.com/Predeactor1)
- Github: [@Predeactor](https://github.com/Predeactor)
- Discord: [Capt. Pred#0495](https://discord.com/users/669223041322057769) (Come find me at my [server](https://discord.gg/aPVupKAxxP)!)

### Show your support

This project is not supported by anyone and is pretty personal, I enjoy making it just because I wanted one. You're free to ⭐ star this project to show me you enjoy it! You can also donate to me using Patreon.

<a href="https://www.patreon.com/predeactor">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="120">
</a>
