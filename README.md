# 🧙‍♂️ Larawiz

Larawiz is a project scaffolder with noob-friendly syntax, intelligent and flexible.

Never touch an artisan command again.

## What Larawiz solves?

Larawiz, short for "**Lara**vel **Wiz**ard", is a scaffolder. From a simple YAML, Larawiz will spawn multiple files with synchronized properties and attributes. This is a great alternative to creating each file from scratch.

Larawiz works out of the box, it was created to think less and do more, and comes with sample files to create simple Blog.

{% tabs %}
{% tab title="Database" %}
```yaml
models:

  User:
    name: string
    email: string
    email_verified_at: timestamp nullable
    password: string
    rememberToken: ~
    is_admin: boolean default:false
    comments: hasMany:Comment
    posts: hasMany:Post

  Post:
    title: string
    body: longText
    published_at: timestamps nullable
    author: belongsTo:User
    comments: hasMany:Comment

  Comment:
    body: string
    post: belongsTo:Post
    author: belongsTo:User
```
{% endtab %}
{% endtabs %}

From that file, here is what is created:

* `User`, `Post` and `Comment` [models](https://laravel.com/docs/7.x/eloquent#defining-models), complete with: PHPDocs, [primary keys](https://laravel.com/docs/7.x/eloquent#eloquent-model-conventions), [timestamps](https://laravel.com/docs/7.x/eloquent#eloquent-model-conventions), [attribute casting](https://laravel.com/docs/7.x/eloquent-mutators#attribute-casting), [relations](https://laravel.com/docs/7.x/eloquent-relationships) and [fillable properties](https://laravel.com/docs/7.x/eloquent#mass-assignment).
* [Migrations](https://laravel.com/docs/7.x/migrations#introduction) for `users`,  `posts` and `comments` tables.
* `UserFactory`, `PostFactory` and `CommentFactory` [factories](https://laravel.com/docs/7.x/database-testing#writing-factories).
* `UsersSeeder`, `PostsSeeder` and `CommentsSeeder` [seeders](https://laravel.com/docs/7.x/seeding).
* The `PostPolicy` and `CommentPolicy` [policies](https://laravel.com/docs/7.x/authorization#creating-policies).

Wow! That a lot of code! Indeed, but falter not, you also have some flexibility since the core of this package is simple:

**LARAWIZ GUESSES, DOESN'T IMPOSES**.

