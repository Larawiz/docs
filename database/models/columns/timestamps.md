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

## Timezone Timestamps

Laravel by default always saves dates converted to UTC into the database, so in most scenarios using **time zone is not needed**.

{% hint style="warning" %}
If you plan to **save and retrieve time using different time zones into the database**, like displaying it to users from different parts of the world or run logic for each of them at a given time, **you may use time-zone-aware timestamps**.
{% endhint %}

When using [Quick Models](../#quick-model), you can always use `timestampsTz` in the columns definitions to swap the normal timestamps to these in a case-by-case scenario.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    title: string
    body: string

  Comment:
    body: string
    timestampsTz: ~
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('body');
    $table->timestamps();
)};

Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('body');
    $table->timestampsTz(); // Overridden from `timestamps`.
)};
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
If you're using [Custom Models](../#custom-model), you need to set the `timestamps` or `timestampsTz` manually.
{% endhint %}

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

