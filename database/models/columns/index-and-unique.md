# Index and Unique

The most simple way to create an index, or a unique index, for a column is just to add `index` or `unique` to the column definition:

{% tabs %}
{% tab title="YAML" %}
```yaml
Post:
  title: string index  # Make an Index on the `title` column
  slug: string unique  # Make a Unique Index on the `slug` column
  body: longText
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title')->index();
    $table->string('slug')->unique();
    $table->longText('body');
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

Additional and personalized indexes can be declared under the `indexes` key. Set one or many indexes with a custom name \(specially if your SQL engine doesn't support large-named indexes\) using a key-value list:

{% tabs %}
{% tab title="YAML" %}
```yaml
Post:
  columns:
    id: ~
    title: string
    slug: string
    body: longText
    timestamps: ~
  indexes:
    slug_id_index: slug id
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('slug');
    $table->longText('body');
    $table->timestamps();
    
    $table->index(['slug', 'id'], 'slug_id_index');
});
```
{% endtab %}
{% endtabs %}

If you issue just a list, Larawiz will let Eloquent Schema to come with a proper name for them.

{% tabs %}
{% tab title="YAML" %}
```yaml
Post:
  columns:
    id: ~
    title: string
    slug: string
    body: longText
    timestamps: ~
  indexes:
    - slug id
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('slug');
    $table->longText('body');
    $table->timestamps();
    
    $table->index(['slug', 'id']);
});
```
{% endtab %}
{% endtabs %}

