# Relations

[Relations](https://laravel.com/docs/7.x/eloquent-relationships#one-to-many) in Larawiz are easy has just adding the type of the relation and the model to relate:

```yaml
models:
  User:
    posts: hasMany:Post
  Post:
    title: string
    user: belongsTo:User
```

If you don't issue the column names in the relationships, Larawiz will automatically ensure to add the needed ones in the Model and Migrations.

In this part we're gonna go through how to make most of the Eloquent ORM relationships.

