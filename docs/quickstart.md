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

## What does scaffold?

If you're looking how a complete scaffold looks, here are the sample files for a `Post` model **with just 7 lines of code!**

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="what-does-scaffold-tab-yaml"
<<< @/docs/samples/yaml.yml{8-15}
:::

::: tab "Model" id="what-does-scaffold-tab-model"
<<< @/docs/samples/model.php
:::

::: tab "Migration" id="what-does-scaffold-tab-tab-migration"
<<< @/docs/samples/migration.php
:::

::: tab "Factory" id="what-does-scaffold-tab-tab-factory"
<<< @/docs/samples/factory.php
:::

::: tab "Seeder" id="what-does-scaffold-tab-tab-seeder"
<<< @/docs/samples/seeder.php
:::

::::

That and much more!

## Backups

Larawiz will automatically copy your `app` and some of your `database` directories as backups every time you scaffold.

You can find it in your application default storage path under the `storage/larawiz/backups` directory, and copy them over your project if you need to go back to a previous state.
