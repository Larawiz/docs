# Fillable

By default, using [Quick Models](../model.md#quick-model) or [Custom Models](../model.md#custom-model), Larawiz adds to the `$fillable` property every column that is not:

* a **timestamp**, 
* a **boolean**, 
* a **relation column** (for `belongsTo` or `morphTo`), 
* a **soft delete** column,
* or a **primary key**.

Considering that these types depend most on the application rather than inputs from a Request, most of the time there is no need to set the fillable columns manually.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="fillable-yaml"
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
:::

::: tab "Model" id="fillable-model"
```php
class Post extends Model
{
    protected $fillable = ['title', 'slug', 'body'];

    // ...
}
```
:::
::::

::: tip No timestamps are fillable
Note that the `published_at` wasn't included in the `$fillable` array because is a `timestamp` . If you want it fillable, you can always use `datetime`.

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

When using [Custom Models](../model.md#custom-model), the same rule will apply, but you can override the fillable properties using the `fillable` key. Larawiz won't check the fillable properties, so you can go full manual.

In this example, we will set only the `title` and the `body` columns for the Model, since we plan to automatically create the `slug` from the title itself after scaffolding.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="fillable-yaml-2"
```yaml{12-14}
models:
  Post:
    columns:
      id: ~
      title: string
      slug: string
      body: longText
      published_at: timestamp nullable
      user: belongsTo
      timestamps: ~
      softDeletes: ~
    fillable:
      - title
      - body
```
:::

::: tab "Model" id="fillable-model-2"
```php{4-5}
class Post extends Model
{
    protected $fillable = ['title', 'body'];

    // ...
}
```
:::
::::

## Disabling Fillable

If you have no plans to have fillable properties, you can set the `fillable` property to `false`.

```yaml{11}
models:
  Post:
    columns:
      id: ~
      title: string
      slug: string
      body: longText
      published_at: timestamp nullable
      user: belongsTo
      timestamps: ~
      softDeletes: ~
    fillable: false
```

