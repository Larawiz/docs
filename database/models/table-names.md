# Table names

With [Quick Models](./#quick-model), you don't need to name the model table, since it's automatically created as the plural name of the model.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    title: string
    excerpt: string
    body: longText
```
{% endtab %}

{% tab title="Model" %}
```php
class Podcast extends Model
{
     // ...
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

For a [Custom Model](./#custom-model), you can change the table name for your own. Just issue the `table` key with the name of the table to create for the model.

For example, we can set the `Post` model to use the `blog_posts` table. This will create a migration following the table name and reference it in the Model class, automatically.

{% tabs %}
{% tab title="YAML" %}
```yaml
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
{% endtab %}

{% tab title="Model" %}
```php
class Podcast extends Model
{
    protected $table = 'blog_posts';
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('blog_posts', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
If you issue the table name equally to the plural, Larawiz will still add the `$table` property.
{% endhint %}

