# Hidden

When using [Quick Models](./#quick-model) or [Custom Models](./#custom-model), Larawiz will automatically set as [hidden](https://laravel.com/docs/7.x/eloquent-serialization#hiding-attributes-from-json) any attribute that contains `password`, `secret`, `private` , `hidden` or is a `rememberToken` .

{% tabs %}
{% tab title="YAML" %}
```yaml
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
{% endtab %}

{% tab title="Model" %}
```php
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
{% endtab %}
{% endtabs %}

If you're using a [Custom Model](./#custom-model), you have full control on what is hidden or not by using the `hidden` key inside the model declaration.

{% tabs %}
{% tab title="YAML" %}
```yaml
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
{% endtab %}

{% tab title="Model" %}
```php
class Post extends Model
{
    protected $hidden = [
        'author_notes', 'private_notes',
    ];
}
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Larawiz won't bother checking if the hidden properties doesn't exists in the column definitions.
{% endhint %}

Alternatively, you can disable any hidden guessing by issuing `hidden` with `false`. No hidden properties will be added to the model.

```yaml
models:
  Post:
    columns: 
      title: string
      body: text
      private_notes: json
      editor_notes: json
    hidden: false
```

