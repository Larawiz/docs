# Polymorphic Has One or Many

For polymorphic relations, you can just simply set it as `morphTo`. If you don't add the column name to the `morphsTo` relation, it will be inferred in from the relation name.

{% hint style="warning" %}
Because of the nature of Eloquent ORM polymorphic relations, only parent models with `id` or `uuid` primary keys are supported.
{% endhint %}

In this example, this will create the `Post` , `Article` and `Category`models with the relationships set, fully aware of the `Category` relation name. The migration for the `Category` model will include the morphs automatically.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    title: string
    body: string
    category: morphOne:Category
  
  Article:
    title: string
    body: string
    category: morphOne:Category

  Category:
    name: string
    categorizable: morphTo
```
{% endtab %}

{% tab title="Models" %}
```php
class Post extends Model
{
    public function category()
    {
        return $this->morphOne(Category::class, 'categorizable');
    }
}

class Article extends Model
{
    public function category()
    {
        return $this->morphOne(Category::class, 'categorizable');
    }
}

class Category extends Model
{
    public function categorizable()
    {
        return $this->morphTo();
    }
}
```
{% endtab %}

{% tab title="Migrations" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('body');
    $table->timestamps();
});

Schema::create('articles', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('body');
    $table->timestamps();
});

Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->morphs('categorizable');
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
If the child model has many `morphTo` relations, Larawiz will only pick the first if you don't issue the relation name, like `morphOne:Category,categorizable`.
{% endhint %}

If all the related models use `uuid` as primary key, don't worry, Larawiz will automatically change the migration column to use `uuid`.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    uuid: ~
    title: string
    body: string
    category: morphOne:Category
  
  Article:
    uuid: ~
    title: string
    body: string
    category: morphOne:Category

  Category:
    name: string
    categorizable: morphTo
```
{% endtab %}

{% tab title="Models" %}
```php
class Post extends Model
{
    public function category()
    {
        return $this->morphOne(Category::class, 'categorizable');
    }
}

class Article extends Model
{
    public function category()
    {
        return $this->morphOne(Category::class, 'categorizable');
    }
}

class Category extends Model
{
    public function categorizable()
    {
        return $this->morphTo();
    }
}
```
{% endtab %}

{% tab title="Migrations" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->uuid();
    $table->string('title');
    $table->string('body');
    $table->timestamps();
});

Schema::create('articles', function (Blueprint $table) {
    $table->uuid();
    $table->string('title');
    $table->string('body');
    $table->timestamps();
});

Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->uuidMorphs('categorizable');
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

## Nullable morphTo

For the case of `morphTo` relation, an index is set automatically by Eloquent Blueprint. Instead, you can use the `nullable` keyword to allow null relations:

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Image:
    imageable: morphTo nullable
```
{% endtab %}

{% tab title="Model" %}
```php
class Image extends Model
{
    public function imageable()
    {
        return $this->morphsTo();
    }
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('images', function (Blueprint $table) {
  $table->id();
  $table->nullableMorphs('imageable');
});
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Larawiz will automatically use `nullableMorphs` or `nullableUuidMorphs` depending on the primary keys of the parent Models. No worries!
{% endhint %}

