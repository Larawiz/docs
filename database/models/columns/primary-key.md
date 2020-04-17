# Primary Key

Larawiz automatically creates the `id` as primary column when using [Quick Models](../#quick-model), so there is no need to re-declare it.

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
Schema::create('podcasts', function (Blueprint $table) {
    $table->id(); // Added automatically
    $table->string('title');
    $table->string('slug');
    $table->longText('body');
    $table->timestamps(); 
});
```
{% endtab %}
{% endtabs %}

You can change the name of the primary key using the `id` column followed by the new name. Larawiz will automatically point the primary key name inside the model.

{% tabs %}
{% tab title="YAML" %}
```yaml
Post:
  id: publication_number
  title: string
  excerpt: string
  body: longText
```
{% endtab %}

{% tab title="Model" %}
```php
class Post extends Model
{
    protected $primaryKey = 'publication_number';
    
    // ...
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('podcasts', function (Blueprint $table) {
    $table->id('publication_number');
    $table->string('title');
    $table->string('slug');
    $table->longText('body');
    $table->timestamps(); 
});
```
{% endtab %}
{% endtabs %}

## UUID as Primary Key

When using Quick Models, you can exchange the default `id` column for a primary `uuid` column by just setting it. You can also change the default name, if you want, otherwise it will be `uuid` as default.

Larawiz will automatically point and update the primary key inside the model.

{% tabs %}
{% tab title="YAML" %}
```yaml
Post:
  uuid: ~
  title: string
  excerpt: string
  body: longText
```
{% endtab %}

{% tab title="Model" %}
```php
class Post extends Model
{
    protected $primaryKey = 'uuid';
    protected $keyType = 'string';
    protected $incrementing = false;
    
    // ...
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('podcasts', function (Blueprint $table) {
    $table->uuid('uuid');
    $table->string('title');
    $table->string('slug');
    $table->longText('body');
    $table->timestamps(); 
});
```
{% endtab %}
{% endtabs %}

{% hint style="success" %}
Having `uuid` as primary column will automatically change `morphs` columns to `uuidMorphs` automatically when using polymorphic relations.
{% endhint %}

## Custom Primary Key

Using [Custom Models](../#custom-model), you will be in charge of adding the primary key. 

By default, if there is no `id` or other auto-incrementing column defined, it will be understood the model has no primary key, so it will be disabled for the model.

{% hint style="success" %}
Don't regret it later: it's always recommended to have a primary key.
{% endhint %}

To manually set a primary key column, you can by using the `primary` key. Larawiz will guess the rest based on the column you point as primary. Larawiz, on the other hand, will guess the rest of the information like the type and incrementing nature in the Model.

{% tabs %}
{% tab title="YAML" %}
```yaml
Podcast:
  columns:
    title: string
    excerpt: string
    body: longText
    timestamps: ~
  primary: title
```
{% endtab %}

{% tab title="Model" %}
```php
class Podcast extends Model
{
    protected $primary = 'title';
    protected $keyType = 'string';
    protected $incrementing = false;

    // ...
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('podcasts', function (Blueprint $table) {
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps();

    $table->primary('slug');
});
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
[Eloquent ORM doesn't support Composite Primary keys](https://github.com/laravel/framework/issues/5355) \(made from multiple columns\). For that reason, these are also no supported in Larawiz.
{% endhint %}

On the other hand, if you want your model to not have any primary key, ensure you set `primary` to `false`.

{% tabs %}
{% tab title="YAML" %}
```yaml
Podcast:
  columns:
    title: string
    slug: string
    # ...
  primary: false
```
{% endtab %}

{% tab title="Model" %}
```php
class Podcast extends Model
{
    protected $primary = null;
    protected $incrementing = false;

    // ...
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('podcasts', function (Blueprint $table) {
    $table->string('title');
    $table->string('slug');
});
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
You will get an error if you set `primary` to `false` or any other column if you have an auto-incrementing column like `id` .  The latter takes precedence. Instead, use `unsignedBigInteger` or edit the migration after scaffolding.
{% endhint %}

If you need to manually set the primary key properties, for custom or non-standard columns, you can add `type` and `incrementing` values:

{% tabs %}
{% tab title="YAML" %}
```yaml
Podcast:
  columns:
    foo: custom
    # ...
  primary:
    column: foo
    type: bar
    incrementing: false
```
{% endtab %}

{% tab title="Model" %}
```php
class Podcast extends Model
{
    protected $primary = 'foo';
    protected $keyType = 'bar';
    protected $incrementing = false;

    // ...
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('podcasts', function (Blueprint $table) {
    $table->custom('foo');

    // ...
});
```
{% endtab %}
{% endtabs %}

