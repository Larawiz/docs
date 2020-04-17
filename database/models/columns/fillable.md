# Fillable

By default, using [Quick Models](../#quick-model) or Custom Models, Larawiz adds to the `$fillable` property of the Model every column that is not a **timestamp**, a **relation column**, **soft delete** or **primary key**, so most of the time there is no need to set the fillable columns manually.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  # ...
  
  Post:
    title: string
    excerpt: string
    body: longText
    published_at: timestamp nullable
    user: belongsTo:User
    softDeletes: ~
```
{% endtab %}

{% tab title="Model" %}
```php
class Post extends Model
{
    protected $fillable = [
        'title',
        'excerpt',
        'body',
    ];

    // ...
}
```
{% endtab %}
{% endtabs %}

When using [Custom Models](../#custom-model), the same rule will apply, but you can override the fillable properties using the `fillable` key. 

In this example, we will set only the `title` and the `body` columns for the Model.

{% tabs %}
{% tab title="YAML" %}
```yaml
Post:
  columns:
    id: ~
    title: string
    excerpt: string
    body: longText
    published_at: timestamp nullable
    user: belongsTo:User
    timestamps: ~
    softDeletes: ~
  fillable:
    - title
    - body
```
{% endtab %}

{% tab title="Model" %}
```php
class Post extends Model
{
    protected $fillable = [
        'title',
        'body',
    ];

    // ...
}
```
{% endtab %}
{% endtabs %}

