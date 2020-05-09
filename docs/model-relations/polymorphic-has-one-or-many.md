# Polymorphic Has One or Many

For [polymorphic relations](https://laravel.com/docs/eloquent-relationships#polymorphic-relationships) like [has-one-polymorphic](https://laravel.com/docs/eloquent-relationships#one-to-one-polymorphic-relations) or [has-many-polymorphic](https://laravel.com/docs/eloquent-relationships#one-to-many-polymorphic-relations), you can just simply set it as `morphTo`, and the parent model as `morphOne` and `morphMany`. As always, no need to declare the model if Larawiz can guess it from the relation name.

::: warning ID or UUID land
Because of the nature of Eloquent ORM polymorphic relations, only parent models with `id` or `uuid` primary keys are supported.
:::

In this example, both `Student` and `Teacher` share one `Classroom`, and share many `Courses`. The polymorphic relations will be fully aware of the names, and the migrations for both `Classroom` and `Course` will include the polymorphic columns automatically.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="polymorphic-has-one-or-many-yaml"
```yaml{4-5,9-10,14,18}
models:
  Student:
    name: string
    classroom: morphOne
    courses: morphMany
  
  Teacher:
    title: string
    classroom: morphOne
    courses: morphMany
    
  Classroom:
    name: string
    assistable: morphTo

  Course:
    name: string
    coursable: morphTo
```
:::

::: tab "Models" id="polymorphic-has-one-or-many-models"
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
:::

::: tab "Migrations" id="polymorphic-has-one-or-many-migrations"
```php{16,23}
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
:::
::::

::: warning Too many to guess which
When the child model has many `morphTo` relations, you will need to pick one, like `morphOne:Classroom,assistable`.
:::

If all the related models use `uuid` as primary key, don't worry, Larawiz will automatically change the migration column to use `uuid`.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="polymorphic-has-one-or-many-yaml-2"
```yaml{3,8}
models:
  Photo:
    uuid: ~
    title: string
    category: morphOne
  
  Video:
    uuid: ~
    title: string
    category: morphOne

  Category:
    name: string
    categorizable: morphTo
```
:::

::: tab "Models" id="polymorphic-has-one-or-many-models-2"
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
:::

::: tab "Migrations" id="polymorphic-has-one-or-many-migrations-2"
```php{16}
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
:::
::::

## Nullable morphTo

For the case of `morphTo` relation, you can use the `nullable` keyword that allows null relations:

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="nullable-morphto-yaml"
```yaml{3}
models:
  Image:
    imageable: morphTo nullable
```
:::

::: tab "Model" id="nullable-morphto-model"
```php
class Image extends Model
{
    public function imageable()
    {
        return $this->morphsTo();
    }
}
```
:::

::: tab "Migration" id="nullable-morphto-migration"
```php{3}
Schema::create('images', function (Blueprint $table) {
  $table->id();
  $table->nullableMorphs('imageable');
});
```
:::
::::

::: tip Guessable UUID
Larawiz will automatically use `nullableMorphs` or `nullableUuidMorphs` depending on the primary keys of the parent Models. No worries!
:::

## UUID morphTo

You can force Larawiz to create an UUID polymorphic relation using `uuidMorphs` in the column relation by issuing `uuid` to the relation declaration. You can also mix it with [nullable morphTo](polymorphic-has-one-or-many.md#nullable-morphto).

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="uuid-morphto-yaml"
```yaml{3,6}
models:
  Image:
    imageable: morphTo uuid nullable
    
  Tag:
    taggable: morphTo uuid
```
:::

::: tab "Models" id="uuid-morphto-models"
```php
class Image extends Model
{
    public function imageable()
    {
        return $this->morphsTo();
    }
}

class Tag extends Model
{
    public function taggable()
    {
        return $this->morphsTo();
    }
}
```
:::

::: tab "Migration" id="uuid-morphto-migration"
```php{3,8}
Schema::create('images', function (Blueprint $table) {
  $table->id();
  $table->nullableUuidMorphs('imageable');
});

Schema::create('images', function (Blueprint $table) {
  $table->id();
  $table->uuidMorphs('taggable');
});
```
:::
::::

::: tip Mind the pivot
You should do this when using [polymorphic pivot models](pivots.md#polymorphic-many-to-many-pivot-models).
:::

