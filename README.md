# Larawiz

Larawiz is a project scaffolder with very noob-friendly syntax, intelligent and flexible. Never touch an artisan command anymore.

## What Larawiz solves

Larawiz, short for "**Lara**vel **Wiz**ard", is a scaffolder. It will read a simple YAML file and spawn multiple files with synchronized properties and attributes, instead of letting you do the same... manually.

Larawiz works out of the box, it was created to think less and do more, and comes with sample files to create simple Blog. I mean, you can understand what files will spawn this scaffold, don't you?

{% tabs %}
{% tab title="Database" %}
```yaml
models:

  User:
    name: string
    email: string
    password: string
    rememberToken: ~
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

{% tab title="HTTP" %}
```yaml
controllers:

  PostController: Post policy
  PostCommentController: Post.comments policy only:index,store
```
{% endtab %}
{% endtabs %}

If you didn't, here is what is created from these files:

* `User`, `Post` and `Comment` [models](https://laravel.com/docs/7.x/eloquent#defining-models), complete with: PHPDocs, [primary keys](https://laravel.com/docs/7.x/eloquent#eloquent-model-conventions), [timestamps](https://laravel.com/docs/7.x/eloquent#eloquent-model-conventions), [attribute casting](https://laravel.com/docs/7.x/eloquent-mutators#attribute-casting), [relations](https://laravel.com/docs/7.x/eloquent-relationships) and [fillable properties](https://laravel.com/docs/7.x/eloquent#mass-assignment).
* [Migrations](https://laravel.com/docs/7.x/migrations#introduction) for `users`,  `posts` and `comments` tables.
* `UserFactory`, `PostFactory` and `CommentFactory` [factories](https://laravel.com/docs/7.x/database-testing#writing-factories).
* `UsersSeeder`, `PostsSeeder` and `CommentsSeeder` [seeders](https://laravel.com/docs/7.x/seeding).
* The `PostController` and `PostCommentController` [resource controllers](https://laravel.com/docs/7.x/controllers#resource-controllers), the latter only with `only` and `store` methods.
* The `PostPolicy` and `CommentPolicy` [policies](https://laravel.com/docs/7.x/authorization#creating-policies).

Wow! That a lot of code! Indeed, but falter not, you also have some flexibility since the core of this package is simple:

**LARAWIZ GUESSES, DOESN'T IMPOSES**.

