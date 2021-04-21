# Hidden

When using [Quick Models](../model.md#quick-model) or [Custom Models](../model.md#custom-model), Larawiz will automatically set as [hidden](https://laravel.com/docs/eloquent-serialization#hiding-attributes-from-json) any attribute that contains the words:
 
* `password`,
* `secret`,
* `private`,
* `hidden`,
* or is a `rememberToken`.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="hidden-yaml"
```yaml{4-6,11}
models:
  User:
    name: string
    email: string
    password: string
    rememberToken: ~
  Post:
    columns: 
      title: string
      body: text
      private_notes: json
```
:::

::: tab "Model" id="hidden-model"
```php{4,11}
class User extends Authenticatable
{
    protected $hidden = [
        'password', 'remember_token'
    ];
}

class Post extends Model
{
    protected $hidden = [
        'private_notes'
    ];
}
```
:::
::::

If you're using a [Custom Model](../model.md#custom-model), you have full control on what is hidden or not by using the `hidden` key inside the model declaration.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="hidden-yaml-2"
```yaml{8-10}
models:
  Post:
    columns: 
      title: string
      body: text
      private_notes: json
      editor_notes: json
    hidden:
      - author_notes
      - private_notes
```
:::

::: tab "Model" id="hidden-model-2"
```php{4}
class Post extends Model
{
    protected $hidden = [
        'author_notes', 'private_notes',
    ];
}
```
:::
::::

::: warning Don't bother me
Larawiz won't bother checking if the hidden properties doesn't exist in the column definitions.
:::

Alternatively, you can disable any hidden guessing by issuing `hidden` with `false`. No hidden properties will be added to the model.

```yaml{8}
models:
  Post:
    columns: 
      title: string
      body: text
      private_notes: json
      editor_notes: json
    hidden: false
```

