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

This is just a tiny example of what Larawiz can do for you, **automatically**. 

```yaml
models:
  User:
    name: string
    password: string
    email: string
    posts: belongsTo

  Post:
    uuid: ~
    title: string
    body: text
    private_notes: json
    published_at: timestmap nullable
    user: hasOne
    tag: belongsToMany
   
  Tag:
    name: string
    post: belongsToMany
```

* [Models](https://laravel.com/docs/eloquent#defining-models) with PHPDocs, [primary keys](https://laravel.com/docs/eloquent#eloquent-model-conventions), [timestamps](https://laravel.com/docs/eloquent#eloquent-model-conventions), [attribute casting](https://laravel.com/docs/eloquent-mutators#attribute-casting), [relations](https://laravel.com/docs/eloquent-relationships) and [fillable properties](https://laravel.com/docs/eloquent#mass-assignment).
* [Migrations](https://laravel.com/docs/migrations#introduction).
* [Factories](https://laravel.com/docs/database-testing#writing-factories).
* [Seeders](https://laravel.com/docs/seeding).
* **Pivot tables** without ever pointing them.
* and much more...

Wow! That a lot of code! Indeed, but falter not, you also have control on what to do since the core of this package is simple:

**LARAWIZ GUESSES, DOESN'T IMPOSES**.
