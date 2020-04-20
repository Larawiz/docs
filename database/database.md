# 🗃️ Database

Larawiz makes setting your database a breeze, simplifying in one file multiple rounds of synchronizing your models with your migrations, factories, seeders, and Eloquent relationships.

Models in Larawiz are defined in `larawiz/database.yml`. Creating a model will spawn their migration, factory and seeder automatically, even PHPDocs and pivot tables. You don't have to do nothing.

The schema is relatively basic. In this example, we will replicate Laravel default database setup for a _relatively_ simple blog site, which is the same available in the sample files.

```yaml
models:
  User:
    name: string
    email: string
    email_verified_at: timestamp nullable
    password: string
    is_admin: boolean default:false
    rememberToken: ~
    comments: hasMany:Comment
    posts: hasMany:Post

  Post:
    uuid: ~
    title: string
    body: longText
    author: belongsTo:User
    comments: hasMany:Comment
    tags: belongsToMany:Tag

  Comment:
    body: string
    author: belongsTo:User
    post: hasOne:Post
    softDeletes: ~
    
  Tags:
    name: string
    posts: belongsToMany:Post

migrations:
  failed_jobs:
    id: ~
    connection: text
    queue: text
    payload: longText
    exception: longText
    failed_at: timestamp useCurrent
```

{% hint style="info" %}
To set a null value into a key you can use `~`  or `null`.
{% endhint %}

