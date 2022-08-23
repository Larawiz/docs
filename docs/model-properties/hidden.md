# Hidden

When using [Quick Models](../model.md#quick-model) or [Custom Models](../model.md#custom-model), Larawiz will automatically set as [hidden](https://laravel.com/docs/eloquent-serialization#hiding-attributes-from-json) any attribute that contains the words:
 
* `password`,
* `token` (like `remember_token`),
* `secret`,
* `private`,
* or `hidden`.

```yaml{5-7,12-13}
models:
  User:
    name: string
    email: string
    password: string
    auth_token: string
    rememberToken: ~
  Post:
    columns: 
      title: string
      body: text
      private_notes: json
      hidden_informer: string
```

```php{4,11}
class User extends Authenticatable
{
    protected $hidden = [
        'password', 'auth_token', 'remember_token'
    ];
}

class Post extends Model
{
    protected $hidden = [
        'private_notes', 'hidden_informer'
    ];
}
```

## Override hidden attributes

You may use the `hidden` key inside the model declaration to override the list of attributes that should be hidden. Larawiz won't check if these attributes exist or not.

```yaml{9-11}
models:
  Post:
    columns: 
      title: string
      body: text
      private_notes: json
      editor_notes: json
      magic_token: string
    hidden:
      - author_notes
      - private_notes
```

```php{4}
class Post extends Model
{
    protected $hidden = [
        'author_notes', 'private_notes',
    ];
}
```

## No hidden attributes

Alternatively, you can make all attributes visible by issuing `hidden` with `false`. 

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