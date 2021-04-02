---
home: true
heroImage: /assets/img/mage.png
heroText: Larawiz
tagline: The Laravel scaffolder you wanted but never got, until now!
actionText: Scaffold your database now →
actionLink: /quickstart
features:
- title: Remember, no Artisan
  details: Forget going around making many empty files from scratch.
- title: Braindead syntax
  details: A simple YAML file spawn all needed files in sync. 
- title: Easy relations
  details: Never sweat trying to connect two or more models.
footer: MIT Licensed | Laravel is a Trademark of Taylor Otwell. Copyright © 2011-2020 Laravel LLC.
---

## Scaffold your database like a 🧙 

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

* [Models](https://laravel.com/docs/eloquent#defining-models) with PHPDocs, [primary keys](https://laravel.com/docs/eloquent#eloquent-model-conventions), [timestamps](https://laravel.com/docs/eloquent#eloquent-model-conventions), [attribute casting](https://laravel.com/docs/eloquent-mutators#attribute-casting), [relations](https://laravel.com/docs/eloquent-relationships), [hidden](https://laravel.com/docs/eloquent-serialization#hiding-attributes-from-json) and [fillable properties](https://laravel.com/docs/eloquent#mass-assignment).
* [Migrations](https://laravel.com/docs/migrations#introduction).
* [Factories](https://laravel.com/docs/database-testing#writing-factories).
* [Seeders](https://laravel.com/docs/seeding).
* **Pivot tables** without ever pointing them. **YES**, I SAID **AUTOMATIC PIVOT TABLES**. BELIEVE IT.
* and that's just the tip of the iceberg...

Do you really want to save countless hours in just minutes? [Then start using it!](quickstart.md)