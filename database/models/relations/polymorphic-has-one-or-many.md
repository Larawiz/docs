# Polymorphic Has One or Many

For polymorphic relations, you can just simply set it as `morphTo`. If you don't add the column name to the `morphsTo` relation, it will be inferred in from the relation name.

{% hint style="warning" %}
Because of the nature of Eloquent ORM polymorphic relations, only parent models with `id` or `uuid` primary keys are supported.
{% endhint %}

In this example, both `Student` and `Teacher` have one `Classroom`, but many `Courses`. The polymorphic relations will be fully aware of the names, and the migrations for both `Classroom` and `Course` will include the morphs automatically.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Student:
    name: string
    classroom: morphOne:Classroom
    courses: morphMany:Course
  
  Teacher:
    title: string
    classroom: morphOne:Classroom
    courses: morphMany:Course
    
  Classroom:
    name: string
    assistable: morphTo

  Course:
    name: string
    coursable: morphTo
```
{% endtab %}

{% tab title="Models" %}
```php
class Student extends Model
{
    public function classroom()
    {
        return $this->morphOne(Category::class, 'assistable');
    }
    
    public function courses()
    {
        return $this->morphMany(Course::class, 'coursable');
    }
}

class Teacher extends Model
{
    public function classroom()
    {
        return $this->morphOne(Category::class, 'assistable');
    }
    
    public function courses()
    {
        return $this->morphMany(Course::class, 'coursable');
    }
}

class Classroom extends Model
{
    public function assistable()
    {
        return $this->morphTo();
    }
}

class Course extends Model
{
    public function coursable()
    {
        return $this->morphTo();
    }
}
```
{% endtab %}

{% tab title="Migrations" %}
```php
Schema::create('photos', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->timestamps();
});

Schema::create('videos', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->timestamps();
});

Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->morphs('categorizable');
    $table->timestamps();
});

Schema::create('tags', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->morphs('taggable');
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
If the child model has many `morphTo` relations, Larawiz will only pick the first if you don't issue the relation name, like `morphOne:Classroom,assistable`.
{% endhint %}

If all the related models use `uuid` as primary key, don't worry, Larawiz will automatically change the migration column to use `uuid`.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Photo:
    uuid: ~
    title: string
    category: morphOne:Category
  
  Video:
    uuid: ~
    title: string
    category: morphOne:Category

  Category:
    name: string
    categorizable: morphTo
```
{% endtab %}

{% tab title="Models" %}
```php
class Photo extends Model
{
    public function category()
    {
        return $this->morphOne(Category::class, 'categorizable');
    }
}

class Video extends Model
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
Schema::create('photos', function (Blueprint $table) {
    $table->uuid();
    $table->string('title');
    $table->timestamps();
});

Schema::create('videos', function (Blueprint $table) {
    $table->uuid();
    $table->string('title');
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

For the case of `morphTo` relation, an index is set automatically by Eloquent Blueprint. You can still use the `nullable` keyword to allow null relations:

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

