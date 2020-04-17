# Soft Deletes

To make a model [soft-deletable](https://laravel.com/docs/7.x/eloquent#soft-deleting), just issue the `softDeletes` or `softDeletesTz` into the columns list. Larawiz will automatically detect and use the `SoftDeletes` trait for the Model.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    title: string
    softDeletes: ~
```
{% endtab %}

{% tab title="Model" %}
```php
class Post extends Model
{
    use SoftDeletes;
    
    // ...
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->softDeletes();
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

Alternatively, you can issue the column name to use as soft-deletes, that will be reflected in the model itself.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    title: string
    softDeletes: soft_deleted_at
```
{% endtab %}

{% tab title="Model" %}
```php
class Podcast extends Model
{
    use SoftDeletes;

    protected const DELETED_AT = 'soft_deleted_at';
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->softDeletes('soft_deleted_at);
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Laravel, thus Larawiz, doesn't support non-timestamp soft delete columns, but you're free to create your own soft-deleted column logic after scaffolding.
{% endhint %}

