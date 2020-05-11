# Indexes

A simple way to create an index or unique index for a table is just to add `index` or `unique` to the column definition:

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="indexes-yaml"
```yaml{3-4}
models:
  Post:
    title: string index  # Make an Index on the `title` column
    slug: string unique  # Make a Unique Index on the `slug` column
    body: longText
```
:::

::: tab "Migration" id="indexes-migration"
```php{3-4}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title')->index();
    $table->string('slug')->unique();
    $table->longText('body');
    $table->timestamps();
});
```
:::
::::

## Composite Indexes

For [Custom Models](../model.md#custom-model), additional and personalized indexes can be declared under the `indexes` key. 

Set one or many indexes with a custom name (especially if your SQL engine doesn't support large-named indexes) using a list. If you also want to name the index yourself, use `name:{index_name}` .

For unique indexes, you can add `unique` for the index.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="composite-indexes-yaml"
```yaml{10-11}
models:
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
:::

::: tab "Migration" id="composite-indexes-migration"
```php{8}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('slug');
    $table->longText('body');
    $table->timestamps();
    
    $table->unique(['slug', 'id'], 'slug_id_index');
});
```
:::
::::