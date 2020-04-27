# Relations

[Relations](https://laravel.com/docs/7.x/eloquent-relationships#one-to-many) in Larawiz effortless. Just add the name of the relation, the type, and that's it.

```yaml
models:
  User:
    posts: hasMany
  Post:
    title: string
    user: belongsTo
```

Larawiz will guess the target model from the relation name, so `posts` refers to the `Post` model, and will use the primary column to connect both if necessary.

Alternatively, you can always set the name of the model, specially if you don't abide to Laravel naming conventions.

```yaml
models:
  User:
    publications: hasMany:Post
  Post:
    title: string
     author: belongsTo:User
```

In this part we're gonna go through how to make most of the Eloquent ORM relationships **without writing more than one sentence**.

