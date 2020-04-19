# Relations

Relations in Larawiz are easy has just adding the type of the relation and the model to relate:

```yaml
models:
  User:
    posts: hasMany:Post
  Post:
    title: string
    user: belongsTo:User
```

Larawiz will automatically add the needed table columns in the migrations and add the relation methods in the model.

In this part we're gonna go through how to make most of the Eloquent ORM relationships.



