# Timestamps

When using [Quick Models](../#quick-model), Larawiz automatically appends timestamps, so there is no need to re-declare them inside the model definition.

{% tabs %}
{% tab title="YAML" %}
```yaml
Post:
  title: string
  excerpt: string
  body: longText
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

If you need time-zone-aware timestamps, just add the `timestampsTz`. Larawiz will swap it automatically.

{% tabs %}
{% tab title="YAML" %}
```yaml
Post:
  title: string
  excerpt: string
  body: longText
  timestampsTz: ~
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestampsTz();
});
```
{% endtab %}
{% endtabs %}

## No Timestamps

When using [Custom Models](../#custom-model), if the model doesn't includes either `timestamps` or `timestampsTz`, timestamps will be disabled.

{% tabs %}
{% tab title="YAML" %}
```yaml
Post:
  columns:
    id: ~
    title: string
    excerpt: string
    body: longText
```
{% endtab %}

{% tab title="Model" %}
```php
class Podcast extends Model
{
    public $timestamps = false;
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
});
```
{% endtab %}
{% endtabs %}

## Custom Timestamps

When using [Custom Models](../#custom-model), you can change the default columns for _timestamping_ using the `timestamps` key. For example, you can disable the default timestamps for updates and only point out a column for the creation date.

{% tabs %}
{% tab title="YAML" %}
```yaml
Post:
  columns:
    id: ~
    title: string
    excerpt: string
    body: longText
    creation_date: timestamp nullable

  timestamps:
    created_at: creation_date
```
{% endtab %}

{% tab title="Model" %}
```php
class Podcast extends Model
{
    protected const CREATED_AT = 'creation_date';
    protected const UPDATED_AT = null;
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamp('creation_date')->nullable();
});
```
{% endtab %}
{% endtabs %}

