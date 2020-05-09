# Timestamps

When using [Quick Models](../model.md#quick-model), Larawiz automatically appends timestamps, so there is no need to re-declare them inside the model definition.

:::: tabs
::: tab "YAML" id="timestamps-yaml"
```yaml
models:
  Post:
    title: string
    excerpt: string
    body: longText
```
:::

::: tab "Migration" id="timestamps-migration"
```php{6}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps();
});
```
:::
::::

## Timezone Timestamps

Laravel by default always saves dates converted to UTC into the database, so **in most scenarios using time zone is not needed**.

::: tip When to use timezones?
If you plan to **save and retrieve time using different time zones into the database**, like displaying it to users from different parts of the world or run jobs at each local time, **you may use time-zone-aware timestamps**.
:::

When using [Quick Models](../model.md#quick-model), you can always use `timestampsTz` in the columns definitions to swap the normal timestamps to these in a case-by-case scenario.

:::: tabs
::: tab "YAML" id="timezone-timestamps-yaml"
```yaml{8}
models:
  Post:
    title: string
    body: string

  Comment:
    body: string
    timestampsTz: ~
```
:::

::: tab "Migration" id="timezone-timestamps-migration"
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
:::
::::

## Disable Timestamps

When using [Custom Models](../model.md#custom-model), if the model doesn't includes either `timestamps` or `timestampsTz`, timestamps will be disabled.

:::: tabs
::: tab "YAML" id="no-timestamps-yaml"
```yaml
Post:
  columns:
    id: ~
    title: string
    excerpt: string
    body: longText
```
:::

::: tab "Model" id="no-timestamps-model"
```php{3}
class Podcast extends Model
{
    public $timestamps = false;
}
```
:::

::: tab "Migration" id="no-timestamps-migration"
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
});
```
:::
::::

## Custom Timestamps

When using [Custom Models](../#custom-model), you can change the default columns for _timestamping_ using the `timestamps` key. For example, you can disable the default timestamps for updates and only point out a column for the creation date.

:::: tabs
::: tab "YAML" id="custom-timestamps-yaml"
```yaml{9-10}
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
:::

::: tab "Model" id="custom-timestamps-model"
```php{3-4}
class Podcast extends Model
{
    protected const CREATED_AT = 'creation_date';
    protected const UPDATED_AT = null;
}
```
:::

::: tab "Migration" id="custom-timestamps-migration"
```php{6}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamp('creation_date')->nullable();
});
```
:::
::::