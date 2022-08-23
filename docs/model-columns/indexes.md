# Indexes

A simple way to create an index or unique index for a table is just to add `index` or `unique` to the column definition:

```yaml{3-4}
models:
  Post:
    title: string index  # Make an Index on the `title` column
    slug: string unique  # Make a Unique Index on the `slug` column
    body: longText
```

```php{3-4}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title')->index();
    $table->string('slug')->unique();
    $table->longText('body');
    $table->timestamps();
});
```

You can also set a [primary key](primary-key.md#using-another-column-as-primary-key) this way.

## Composite Indexes

Additional and personalized indexes can be declared under the `indexes` key, even for `belongsTo` relations that may be costly for your table without an index. While you only need to issue a list of columns, you can also set the index name (especially if your SQL engine doesn't support large-named indexes) and the type if is not a normal _index_, like `unique`.

```yaml{9-12}
models:
    Post:
      title: string
      slug: string
      body: longText
      author: belongsTo:User
      timestamps: ~
    
      indexes:
        - columns: slug id 
          name: slug_id_index
          type: unique
```

```php{9-11}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('slug');
    $table->longText('body');
    $table->timestamps();
});

Schema::table('posts', function (Blueprint $table) {
    $table->unique(['slug', 'id'], 'slug_id_index');
});
```

The indexes will be created in the migrations file, and executed _after_ the table is created.

::: tip Morphs are already indexed
Laravel migrations already create an index over the morph itself, so you don't need to declare an index over a `morphTo` relation.
:::