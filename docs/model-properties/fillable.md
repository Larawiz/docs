# Fillable

By default, using [Quick Models](../model.md#quick-model) or [Custom Models](../model.md#custom-model), Larawiz won't add as `$fillable` attributes that are:

* a **timestamp**,
* a **boolean**,
* a **relation**,
* a **soft delete** column,
* a column that contains the word `token`,
* or a **primary key**.

Larawiz considers these attributes as app-dependant, which saves you more keystrokes and expanding the lifetime of your keyboard, tablet or phone.

```yaml
models:
  # ...

  Post:
    title: string
    slug: string
    body: longText
    published_at: timestamp nullable
    is_commentable: boolean default:true
    user: belongsTo
    softDeletes: ~
```

```php
class Post extends Model
{
    protected $fillable = ['title', 'slug', 'body'];

    // ...
}
```

::: warning Timestamps are NOT fillable. Period.
Note that the `published_at` wasn't included in the `$fillable` array because is a `timestamp`. If you want it fillable, you can always use `datetime`, `date` or `time`, but be wary of the query constraints on these column types.

```yaml{4}
models:
  Post:
    # ...
    publised_at: datetime nullable
```
 
```php{5}
class Post extends Model
{
    protected $fillable = [
        // ...
        'published_at'
    ];
}
```

:::

## Overriding the fillable attributes

To override the fillable attributes, use the `fillable` key with the list of fillable properties. Larawiz won't check if the fillable attribute exist, so you can go full manual.

In this example, we will set the `title`, `body` and `published_at` columns for the Model, since we plan to automatically create the `slug` from the title itself after we receive our scaffolded app, and the `published_at` will allow to publish something into the future.

```yaml{10-13}
models:
  Post:
    title: string
    slug: string
    body: longText
    published_at: timestamp nullable
    user: belongsTo
    softDeletes: ~
      
    fillable:
      - title
      - body
      - published_at
```

```php{3}
class Post extends Model
{
    protected $fillable = ['title', 'body', 'published_at'];

    // ...
}
```

## No fillable attributes

If you have no plans to have fillable attributes, you can set the `fillable` property to `false`. 

```yaml{12}
models:
  Post:
    title: string
    slug: string
    body: longText
    published_at: timestamp nullable
    user: belongsTo
    softDeletes: ~
      
    fillable: false
```