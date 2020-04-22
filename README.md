# 🧙‍♂️ Larawiz

Larawiz is a project scaffolder with noob-friendly syntax, intelligent and flexible.

With Larawiz you will **never touch an artisan command again**.

## What Larawiz solves?

Larawiz, short for "**Lara**vel **Wiz**ard", is a scaffolder. From a simple YAML, Larawiz will spawn multiple files with synchronized properties and attributes. This is a great alternative to creating each file from scratch or from the command line.

Larawiz works out of the box, it was created to think less and do more, and comes with sample files to create simple Blog.

{% tabs %}
{% tab title="YAML" %}
```yaml
# Welcome!
# ----
#
# This example scaffold for a simple blog proyect. Here are some five quick
# tips to start scaffolding rightaway with your own scaffold schema:
#
# 1. Issue columns by their name, and add the type, like [name]: [type].
# 2. [id] are automatically prepended to all models. using [uuid] will 
#    automatically change the primary key to [uuid].
# 3. [timestamps] are automatically appended to all models.
# 4. Relations can be set as [method]: [type]:[model]
# 5. You don't need to create pivot tables, Larawiz can guess that for you.
#
# You can visit the docs at https://darkghosthunter.gitbook.io/larawiz/
# for more info, you mostly you won't need to. Happy coding!

models:
  User:
    name: string
    email: string
    email_verified_at: timestamp nullable
    password: string  # This changes the model to Authenticatable.
    is_admin: boolean default:false
    rememberToken: ~  # This also can change the model to Authenticatable.
    comments: hasMany:Comment
    posts: hasMany:Post

  Post:
    uuid: ~
    title: string
    body: longText
    published_at: timestamp nullable  # Is this a draft? If not, is published.
    author: belongsTo:User
    comments: hasMany:Comment
    tags: belongsToMany:Tag
    softDeletes: ~

  Comment:
    body: string
    is_visible: boolean default:true  # Hide spam comments.
    author: belongsTo:User nullable  # Allow anonymous comments.
    post: belongsTo:Post

  Tag:
    name: string
    posts: belongsToMany:Tag

migrations:
  failed_jobs:
    id: ~
    connection: text
    queue: text
    payload: longText
    exception: longText
    failed_at: timestamp useCurrent
```
{% endtab %}
{% endtabs %}

From that file, here is what is created:

* `User`, `Post` , `Comment` and `Tag`  [models](https://laravel.com/docs/7.x/eloquent#defining-models), complete with: PHPDocs, [primary keys](https://laravel.com/docs/7.x/eloquent#eloquent-model-conventions), [timestamps](https://laravel.com/docs/7.x/eloquent#eloquent-model-conventions), [attribute casting](https://laravel.com/docs/7.x/eloquent-mutators#attribute-casting), [relations](https://laravel.com/docs/7.x/eloquent-relationships) and [fillable properties](https://laravel.com/docs/7.x/eloquent#mass-assignment).
* [Migrations](https://laravel.com/docs/7.x/migrations#introduction) for `users`,  `posts` , `comments`  and `tags` tables.
* `UserFactory`, `PostFactory` , `CommentFactory` and `TagFactory` [factories](https://laravel.com/docs/7.x/database-testing#writing-factories).
* `UsersSeeder`, `PostsSeeder` , `CommentsSeeder` and `TagsSeeder` [seeders](https://laravel.com/docs/7.x/seeding).
* The `post_tag` pivot table for the `belongsToMany` relationship.

Wow! That a lot of code! Indeed, but falter not, you also have control on what to do since the core of this package is simple:

**LARAWIZ GUESSES, DOESN'T IMPOSES**.

