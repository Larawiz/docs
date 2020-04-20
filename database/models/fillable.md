# Fillable

By default, using [Quick Models](./#quick-model) or [Custom Models](./#custom-model), Larawiz adds to the `$fillable` property every column that is not a **timestamp**, a **boolean**, a **relation column**, **soft delete** or **primary key**, so most of the time there is no need to set the fillable columns manually.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  # ...
  
  Post:
    title: string
    slug: string
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
        'slug',
        'body',
    ];

    // ...
}
```
{% endtab %}
{% endtabs %}

When using [Custom Models](./#custom-model), the same rule will apply, but you can override the fillable properties using the `fillable` key. 

{% hint style="info" %}
Note that the `published_at` wasn't included in the `$fillable` array because is a `timestamp` . If you want it fillable, you can always use `datetime`.

```yaml
Post:
  # ...
  publised_at: datetime nullable
```

```php
class Post extends Model
{
    protected $fillable = [
        // ...
        'published_at'
    ];
}
```
{% endhint %}

In this example, we will set only the `title` and the `body` columns for the Model, since we plan to automatically create the `slug` from the title itself.

{% tabs %}
{% tab title="YAML" %}
```yaml
Post:
  columns:
    id: ~
    title: string
    slug: string
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

