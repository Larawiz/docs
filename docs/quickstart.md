# Quickstart

## Installation

To install Larawiz, just fire up Composer in your project root folder and require it in your development dependencies.

```bash
composer require -dev larawiz/larawiz 
```

## Usage

If it's your first time using Larawiz, publish the **sample blog** scaffold using the `larawiz:sample` command. It uses a very self-explanatory syntax, so you should get the gist of what's happening without problems.

```bash{7}
php artisan larawiz:sample

# 🧙‍ Larawiz
#
# Scaffold sample files published. Happy coding!
#
# * var/www/app/larawiz/database.yml
#
# Once you're done, use [larawiz:scaffold] to create your proyect.
```

After you're done tinkering, simply tell Larawiz to create your project from the scaffold file.

```bash
php artisan larawiz:scaffold

# 🧙 Larawiz
#
# Scaffolding your project, it will take a little time...
```

Larawiz will try to guess almost everything. This documentation will help you do some advanced things or override others for your convenience.

## Backups

Every time you scaffold with Larawiz, it will automatically move to a backup folder in `storage/larawiz/backups` the following directories and their contents:

- `app/Models`
- `database/factories`
- `database/migrations`
- `database/seeders`

These backup folders are sorted by scaffolding date, so you can copy them over your project if you need to go back to a previous state.

::: tip Keeping the house clean
If you need to create some files inside these directories, put them somewhere else instead, as these will be automatically moved to a backup folder and won't persist between scaffolding.
:::
