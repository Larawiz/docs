# Primary Key

Larawiz automatically creates the `id` as primary column when using [Quick Models](../model.md#quick-model), so there is no need to declare it.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="primary-key-yaml-1"
```yaml
models:
  Post:
    title: string
    excerpt: string
    body: longText
```
:::

::: tab "Migration" id="primary-key-migration-1"
```php{2}
Schema::create('podcasts', function (Blueprint $table) {
    $table->id(); // Added automatically
    $table->string('title');
    $table->string('slug');
    $table->longText('body');
    $table->timestamps(); 
});
```
:::
::::

You can change the name of the primary key using the `id` column followed by the new name. Larawiz will automatically point the primary key column name inside the model.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="primary-key-yaml-2"
```yaml{3}
models:
  Post:
    id: publication_number
    title: string
    excerpt: string
    body: longText
```
:::

::: tab "Model"  id="primary-key-model"
```php{3}
class Post extends Model
{
    protected $primaryKey = 'publication_number';
    
    // ...
}
```
:::

::: tab "Migration"  id="primary-key-migration-2"
```php{2}
Schema::create('podcasts', function (Blueprint $table) {
    $table->id('publication_number');
    $table->string('title');
    $table->string('slug');
    $table->longText('body');
    $table->timestamps(); 
});
```
:::
::::

::: tip ID is just better
Doing `id: name` instead of `name: id` ensures the model only has one primary key.
:::

## UUID as Primary Key

When using [Quick Models](../model.md#quick-model), you can exchange the default `id` column for a primary `uuid` column by just setting it. You can also change the default name, if you want, otherwise it will be `uuid` as default.

For both [Quick Models](../model.md#quick-model) and [Custom Models](../model.md#custom-model), Larawiz will automatically point and update the primary key inside the model, and include the `HasUuidPrimaryKey` trait for free alongside it, **right out of the box!**

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="uuid-as-primary-key-yaml"
```yaml{3}
models:
  Post:
    uuid: ~
    title: string
    excerpt: string
    body: longText
```
:::

::: tab "Model" id="uuid-as-primary-key-model"
```php{5-7}
class Post extends Model
{
    use HasUuidPrimaryKey;

    protected $primaryKey = 'uuid';
    protected $keyType = 'string';
    protected $incrementing = false;
    
    // ...
}
```
:::

::: tab "Trait" id="uuid-as-primary-key-trait"
```php
<?php

namespace App;

use Illuminate\Support\Str;

trait HasUuidPrimaryKey
{
    /**
     * Sets the primary key for the model as an UUID.
     *
     * @return void
     */
    protected function initializeHasUuidPrimaryKey()
    {
        $this->attributes[$this->getKeyName()] = $this->generateUuid();
    }

    /**
     * Generates an UUID to use as Primary Key.
     *
     * @return \Ramsey\Uuid\UuidInterface|string
     */
    protected function generateUuid()
    {
        return Str::uuid();
    }
}

```
:::

::: tab "Migration" id="uuid-as-primary-key-migration"
```php{2}
Schema::create('podcasts', function (Blueprint $table) {
    $table->uuid('uuid');
    $table->string('title');
    $table->string('slug');
    $table->longText('body');
    $table->timestamps(); 
});
```
:::
::::

::: tip Polymorphic UUID
Having `uuid` as primary column will automatically change `morphs` columns to `uuidMorphs` automatically when using the model on [polymorphic relations](../model-relations/polymorphic-has-one-or-many.md).
:::

## Custom Primary Key

Using [Custom Models](../model.md#custom-model), you will be in charge of adding the primary key. 

By default, if there is no `id` or other auto-incrementing column defined, it will be understood the model has no primary key, so it will be disabled for the model.

::: tip Always use Primary Keys
Primary keys identify a single row in the database. Most of the time you will want one in your table.
:::

If you're not using `id`, you can set any other column as primary by using the `primary` key. Larawiz will guess the rest based on the column you point as primary, like the type and incrementing nature.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="custom-primary-key-yaml"
```yaml{9}
models:
  Podcast:
    columns:
      title: string
      excerpt: string
      body: longText
      timestamps: ~

    primary: title
```
:::

::: tab "Model" id="custom-primary-key-model"
```php{3-5}
class Podcast extends Model
{
    protected $primary = 'title';
    protected $keyType = 'string';
    protected $incrementing = false;

    // ...
}
```
:::

::: tab "Migration" id="custom-primary-key-migration"
```php{7}
Schema::create('podcasts', function (Blueprint $table) {
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps();

    $table->primary('title');
});
```
:::
::::

::: danger No Composite Primary Keys
[Eloquent ORM doesn't support Composite Primary keys](https://github.com/laravel/framework/issues/5355) (made from multiple columns). For that reason, these are also no supported in Larawiz.
:::

On the other hand, if you want your model to not have any primary key, ensure you set `primary` to `false`.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="custom-primary-key-yaml-2" 
```yaml{8}
models:
  Podcast:
    columns:
      title: string
      slug: string
      # ...

    primary: false
```
:::

::: tab "Model" id="custom-primary-key-model-2"
```php{3-4}
class Podcast extends Model
{
    protected $primary = null;
    protected $incrementing = false;

    // ...
}
```
:::

::: tab "Migration" id="custom-primary-key-migration-2"
```php
Schema::create('podcasts', function (Blueprint $table) {
    $table->string('title');
    $table->string('slug');
});
```
:::
::::

::: warning [id] takes precedence
You will get an error if you set `primary` to `false` or any other column if you have an auto-incrementing column like `id`, since the latter takes precedence.

Instead, use `unsignedBigInteger` or edit the migration after scaffolding.
:::

If you need to manually set the primary key properties, for custom or non-standard columns, you can add `type` and `incrementing` values:

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML"  id="custom-primary-key-yaml-3"
```yaml{7-10}
models:
  Podcast:
    columns:
      foo: custom
      # ...

    primary:
      column: foo
      type: bar
      incrementing: false
```
:::

::: tab "Model" id="custom-primary-key-model-3"
```php{3-5}
class Podcast extends Model
{
    protected $primary = 'foo';
    protected $keyType = 'bar';
    protected $incrementing = false;

    // ...
}
```
:::

::: tab "Migration" id="custom-primary-key-migration-3"
```php{2}
Schema::create('podcasts', function (Blueprint $table) {
    $table->custom('foo');

    // ...
});
```
:::
::::