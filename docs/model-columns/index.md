# Columns

Define a column with a name, and the value as the method to call from `Blueprint` class instance. Additional arguments for the method can be defined after the colon, and separated by comma.

```yaml{3}
models:
  Post:
    claps: integer:true,true nullable
```

```php{3}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->integer('claps', true, true)->nullable();
    $table->timestamps();
});
```

While the above syntax will work for [Quick Models](../model.md#quick-model), you can have total control on the model itself using [Custom Models](../model.md#custom-model). For the latter, put your columns and relations inside the `columns` key.

```yaml{4}
models:
  Post:
    columns:
      claps: integer:true,true nullable
```

```php{2}
Schema::create('posts', function (Blueprint $table) {
    $table->integer('claps', true, true)->nullable();
});
```

::: tip I'll use my own method
If you have a package adding custom columns types, like `$table->custom('foo')` or `$table->foo()`, no problem, you can type`foo: custom` or `foo: ~`, respectively.

Since there is no method checking, you should be careful of typos, as `cool_at: timetsamp` will become `$table->timetsamp('cool_at')`.
:::

## Columns with no values

Column keys with null values, for both [Quick Models](../model.md#quick-model) and [Custom Models](../model.md#custom-model), will transform into method names with no arguments. This is used for timestamps, soft-deletes and other short-hands from the [Blueprint](https://laravel.com/docs/migrations#columns).

```yaml
models:
  Posts:
    columns:
      id: ~
      uuid: ~
      softDeletes: ~
      timestampsTz: ~
      rememberToken: ~
      myCustomMethod: ~
```

```php
Schema::create('model_name', function (Blueprint $table) {
    $table->id();
    $table->uuid();
    $table->softDeletes();
    $table->timestampsTz();
    $table->rememberToken();
    $table->myCustomMethod();
});
```

::: warning Prefer the wavy thing
To issue a null value, use `~`. Some YAML parsers run in circles when a value is empty. 
:::