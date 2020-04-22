# Columns

Columns names are defined by their key name, while the type mimics the method calling in the `Blueprint` class.

Additional arguments for the method are defined after the colon, and separated by comma.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    claps: integer:true,true nullable
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->integer('claps', true, true)->nullable();
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

While the above syntax will work for [Quick Models](../#quick-model), you can have total control on the model itself using [Custom Models](../#custom-model). For the latter, put your columns and relations inside the `columns` key.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    columns:
      claps: integer:true,true nullable
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->integer('claps', true, true)->nullable();
});
```
{% endtab %}
{% endtabs %}

{% hint style="success" %}
If you have a package that adds custom columns types, like `$table->custom('foo')`, no problem, columns types will be pushed as the method name is using `foo: custom`.
{% endhint %}

## Columns with no values

Columns keys with null values will transform into method names with no arguments. This is used for timestamps, soft-deletes and other short-hands from the [Blueprint](https://laravel.com/docs/7.x/migrations#columns).

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Posts:
    columns:
      id: ~
      uuid: ~
      softDeletes: ~
      timestampsTz: ~
      rememberToken: ~
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('model_name', function (Blueprint $table) {
    $table->id();
    $table->uuid();
    $table->softDeletes();
    $table->timestampsTz();
    $table->rememberToken();
});
```
{% endtab %}
{% endtabs %}

