# Relations

[Relations](https://laravel.com/docs/eloquent-relationships) in Larawiz are effortless. Just add the name of the relation, the type, and that's it.

```yaml{3,6}
models:
  User:
    posts: hasMany
  Post:
    title: string
    user: belongsTo
```

Larawiz will guess the target model from the relation name, so `posts` refers to the `Post` model, and will use the primary column to connect both if necessary.

Alternatively, you can always set the name of the model, specially if you don't abide to Laravel naming conventions.

```yaml{3,5}
models:
  User:
    publications: hasMany:Post
  Post:
    author: belongsTo:User
```

## Total control on relations

If you declare a relation tables or columns, Larawiz will understand you want **full control of the relation** and won't guess or check anything from it. 

```yaml{3,5}
models:
  User:
    publications: hasMany:Post,publication_id
  Photo:
    tags: morphToMany:Tag,taggable,taggables
  #...
```

In any case, if you want to make complex relationships, it's better to do them after scaffolding.