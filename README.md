# 🧙‍♂️ Larawiz

Larawiz is a project scaffolder with noob-friendly syntax, intelligent and flexible.

With Larawiz you will **never touch an artisan command again**.

## What Larawiz solves?

Larawiz, short for "**Lara**vel **Wiz**ard", is a scaffolder. From a simple YAML, Larawiz will spawn multiple files with synchronized properties and attributes. This is a great alternative to creating each file from scratch or from the command line.

Larawiz works out of the box, it was created to think less and do more, and comes with sample files to create simple Blog.

```yaml
# Welcome!
# ----
#
# This is an example scaffold for a simple blog project. Here are some five
# quick tips to start scaffolding right away with your own scaffold schema
# for your project, if you (probably) wish to start doing your own thing:
#
# 1. Columns are declared by their name, the type, and optional arguments.
# 2. [id] are prepended to models. You can swap it for [uuid] as primary.
# 3. [timestamps] are appended to models except for manual pivot models.
# 4. Using [password|rememberToken] changes the model to an User model.
# 5. Pivot tables are automatically guessed, and created conveniently.
#
# You can visit the docs at https://darkghosthunter.gitbook.io/larawiz/
# for more info, but you mostly you won't ever need to. Happy coding!

models:
  User:
    name: string
    email: string
    email_verified_at: timestamp nullable
    password: string
    is_admin: boolean default:false
    rememberToken: ~
    comments: hasMany  # The model is inferred from the relation name.
    posts: hasMany

  Post:
    uuid: ~
    title: string
    body: longText
    published_at: timestamp nullable  # It's published? If not, its a draft.
    author: belongsTo:User  # Here we need to point the correct model.
    comments: hasMany
    tags: belongsToMany
    softDeletes: ~

  Comment:
    body: string
    is_visible: boolean default:true  # This is to hide spam comments.
    author: belongsTo nullable  # Allow anonymous comments.
    post: belongsTo

  Tag:
    name: string
    posts: belongsToMany  # No need to declare the pivot table.

migrations:
  failed_jobs:
    id: ~
    connection: text
    queue: text
    payload: longText
    exception: longText
    failed_at: timestamp useCurrent
```

From that file, here is what is created:

* `User`, `Post` , `Comment` and `Tag`  [models](https://laravel.com/docs/7.x/eloquent#defining-models), complete with: PHPDocs, [primary keys](https://laravel.com/docs/7.x/eloquent#eloquent-model-conventions), [timestamps](https://laravel.com/docs/7.x/eloquent#eloquent-model-conventions), [attribute casting](https://laravel.com/docs/7.x/eloquent-mutators#attribute-casting), [relations](https://laravel.com/docs/7.x/eloquent-relationships) and [fillable properties](https://laravel.com/docs/7.x/eloquent#mass-assignment).
* [Migrations](https://laravel.com/docs/7.x/migrations#introduction) for `users`,  `posts` , `comments`  and `tags` tables.
* `UserFactory`, `PostFactory` , `CommentFactory` and `TagFactory` [factories](https://laravel.com/docs/7.x/database-testing#writing-factories).
* `UsersSeeder`, `PostsSeeder` , `CommentsSeeder` and `TagsSeeder` [seeders](https://laravel.com/docs/7.x/seeding).
* The `post_tag` pivot table for the `belongsToMany` relationship, **automatically**.

Wow! That a lot of code! Indeed, but falter not, you also have control on what to do since the core of this package is simple:

**LARAWIZ GUESSES, DOESN'T IMPOSES**.

