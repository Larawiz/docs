# Eager Load

Some models may need to always [eager load](https://laravel.com/docs/eloquent-relationships#eager-loading-by-default) their relationships every time they are queried.

For example, we have a `Post` model that always needs to load the images, and the author along its avatar. You can do that easily on [Custom Models](../model.md#custom-model) using the `with` keyword.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="scopes-yaml"
```yaml{7-9}
models:
  Post:
    columns:
      uuid: ~
      title: string
      author: belongsTo
      images: hasMany
    with:
      - author.avatar
      - images

  Author:
    name: string
    email: string
    avatar: hasOne
    
  Avatar:
    author: belongsTo
    
  Image:
    post: belongsTo
```
:::

::: tab "Model" id="scopes-local-scope"
```php{5}
class Post extends Model
{
    // ...

    protected $with = ['author.avatar', 'images'];
}
```
:::
::::