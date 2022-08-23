# Table names

When creating a Model, you won't need to name the model table. Larawiz automatically creates the table using the plural name of the model.

```yaml{2}
models:
  Post:
    title: string
    excerpt: string
    body: longText
```

```php
class Podcast extends Model
{
     // ...
}
```

```php{1}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps();
});
```

You can override the automatic table name with the `table` key and the new name of the table. Larawiz will make the changes on both the Model and the migration.

For example, we can set the `Post` model to use the `blog_posts` table:

```yaml{8}
models:
  Post:
    title: string
    excerpt: string
    body: longText
    timestamps: ~
  
    table: blog_posts
```

```php{3}
class Podcast extends Model
{
    protected $table = 'blog_posts';
}
```

```php{1}
Schema::create('blog_posts', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps();
});
```

::: tip It's your table name
If you issue the table name equally to the plural, Larawiz will still add the `$table` property.
:::

## Table names on Pivot Models

Larawiz uses Laravel conventions to name the table of a [Pivot Model](../model-relations/pivot-models.md).

```yaml{7}
models:
  User:
    # ...
  Podcast:
    # ...

  Subscription:
    # ...
```

```php{1}
Schema::create('podcast_user', function (Blueprint $table) {
    // ...
})
```

You can [override the table name using the `table` key with a Custom Model](../model-relations/pivot-models.md#table-names).

```yaml{7}
models:
  # ...

  Subscription:
    columns:
      # ...
    table: subscriptions
```

```php{1}
Schema::create('subscriptions', function (Blueprint $table) {
    // ...
})
```