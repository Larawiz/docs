# Indexes

The most simple way to create an index or a unique index for a column is just to add `index` or `unique` to the column definition:

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

## Composite Indexes

For [Custom Models](../#custom-model), additional and personalized indexes can be declared under the `indexes` key. 

Set one or many indexes with a custom name \(especially if your SQL engine doesn't support large-named indexes\) using a list. If you also want to name the index yourself, use `name:{index_name}` .

For unique indexes, you can add `unique` for the index.

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
    - slug id name:slug_id_index unique
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
    
    $table->unique(['slug', 'id'], 'slug_id_index');
});
```
{% endtab %}
{% endtabs %}

