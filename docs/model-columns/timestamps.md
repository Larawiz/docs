# Timestamps

When using [Quick Models](../model.md#quick-model), Larawiz automatically adds timestamps, so there is no need to declare them inside the model definition.

```yaml
models:
  Post:
    title: string
    excerpt: string
    body: longText
```

```php{6}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps();
});
```

## Timestamps with time zone

::: info You don't need time zones
Before going for timestamps with time zone, consider the following:

- PHP, like most languages, is aware of timezone shifts and DST in the future or past.
- Laravel always saves dates converted to UTC into the database.

In most scenarios, [using time zone is not needed](https://darkghosthunter.medium.com/laravel-timezones-in-the-database-1905020cc699) unless you expect to work on edge cases.
:::

When using [Quick Models](../model.md#quick-model), you can always use `timestampsTz` in the columns definitions to swap the normal timestamps to ones with time zone data.

```yaml{8}
models:
  Post:
    title: string
    body: string

  Comment:
    body: string
    timestampsTz: ~
```

```php{5,11}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('body');
    $table->timestamps();
});

Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('body');
    $table->timestampsTz(); // Overridden from `timestamps`.
});
```

## Disable Timestamps

To disable timestamps, use a [Custom Model](../model.md#custom-model). If the Custom Model doesn't include either `timestamps` or `timestampsTz` inside the columns declarations, timestamps will be disabled for the model.

```yaml
models:
  Post:
    columns:
      id: ~
      title: string
      excerpt: string
      body: longText
```

```php{3}
class Podcast extends Model
{
    public $timestamps = false;
}
```

```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
});
```

## Custom Timestamps

Only under a [Custom Models](../model.md#custom-model) you can change the default columns for _timestamping_ using the `timestamps` key. 

For example, we can disable the default timestamps for updates by setting it as `null` and point the column to use as creation date.

```yaml{10-12}
models:
  Post:
    columns:
      id: ~
      title: string
      excerpt: string
      body: longText
      creation_date: timestamp nullable

    timestamps:
      created_at: creation_date
      updated_at: ~
```

```php{3-4}
class Podcast extends Model
{
    protected const CREATED_AT = 'creation_date';
    protected const UPDATED_AT = null;
}
```

```php{6}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamp('creation_date')->nullable();
});
```