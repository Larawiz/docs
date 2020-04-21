# Per Page

By default, Eloquent Models retrieve 15 records from the database when paginating. Since this is usually a good number for most scenarios, you may want to change that for more or less for other kind of models.

To do that, just use `perPage` key with the number you want using [Custom Models](./#custom-model).

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    columns:
      # ...
    perPage: 30
```
{% endtab %}

{% tab title="Model" %}
```php
class Post extends Model
{
    protected $perPage = 30;
}
```
{% endtab %}
{% endtabs %}



