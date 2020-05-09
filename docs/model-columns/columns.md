# Columns

Column names must be defined by their key name, while the type references the method calling in the `Blueprint` class.

Additional arguments for the method can be defined after the colon, and separated by comma.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="columns-yaml-1"
```yaml{3}
models:
  Post:
    claps: integer:true,true nullable
```
:::

::: tab "Migration" id="columns-migration-1"
```php{3}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->integer('claps', true, true)->nullable();
    $table->timestamps();
});
```
:::
::::

While the above syntax will work for [Quick Models](../model.md#quick-model), you can have total control on the model itself using [Custom Models](../model.md#custom-model). For the latter, put your columns and relations inside the `columns` key.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="columns-yaml-2"
```yaml{4}
models:
  Post:
    columns:
      claps: integer:true,true nullable
```
:::

::: tab "Migration" id="columns-migration-2"
```php{2}
Schema::create('posts', function (Blueprint $table) {
    $table->integer('claps', true, true)->nullable();
});
```
:::
::::

::: tip Custom methods
If you have a package adding custom columns types, like `$table->custom('foo')` or `$table->foo()`, no problem, you can type`foo: custom` or `foo: ~`, respectively.
:::

## Columns with no values

Column keys with null values will transform into method names with no arguments. This is used for timestamps, soft-deletes and other short-hands from the [Blueprint](https://laravel.com/docs/migrations#columns).

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="columns-with-no-values-yaml"
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
:::

::: tab "Migration" id="columns-with-no-values-migration"
```php
Schema::create('model_name', function (Blueprint $table) {
    $table->id();
    $table->uuid();
    $table->softDeletes();
    $table->timestampsTz();
    $table->rememberToken();
});
```
:::
::::