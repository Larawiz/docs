# Table names

With [Quick Models](../model.md#quick-model), you don't need to name the model table, since it's automatically created as the plural name of the model.

:::: tabs
::: tab "YAML" id="table-names-yaml"
```yaml{2}
models:
  Post:
    title: string
    excerpt: string
    body: longText
```
:::

::: tab "Model" id="table-names-model"
```php
class Podcast extends Model
{
     // ...
}
```
:::

::: tab "Migration" id="table-names-migration"
```php{1}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps();
});
```
:::
::::

For a [Custom Model](../model.md#custom-model), you can change the table name for your own. Just issue the `table` key with the name of the table to create for the model.

For example, we can set the `Post` model to use the `blog_posts` table. This will create a migration following the table name and reference it in the Model class, automatically.

:::: tabs
::: tab "YAML" id="table-names-yaml-2"
```yaml{10}
models:
  Post:
    columns:
      id: ~
      title: string
      excerpt: string
      body: longText
      timestamps: ~
  
    table: blog_posts
```
:::

::: tab "Model" id="table-names-model-2"
```php{3}
class Podcast extends Model
{
    protected $table = 'blog_posts';
}
```
:::

::: tab "Migration" id="table-names-migration-2"
```php{1}
Schema::create('blog_posts', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps();
});
```
:::
::::

::: tip It's your table name
If you issue the table name equally to the plural, Larawiz will still add the `$table` property.
:::

