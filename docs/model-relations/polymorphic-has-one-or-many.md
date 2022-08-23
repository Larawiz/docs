# Polymorphic Has One or Many

For [polymorphic relations](https://laravel.com/docs/eloquent-relationships#polymorphic-relationships) like [has-one-polymorphic](https://laravel.com/docs/eloquent-relationships#one-to-one-polymorphic-relations) or [has-many-polymorphic](https://laravel.com/docs/eloquent-relationships#one-to-many-polymorphic-relations), you can just simply set it as `morphTo`, and the parent model as `morphOne` and `morphMany`. As always, no need to declare the model if Larawiz can guess it from the relation name.

::: warning Stranded in an ID-land
Because of the nature of Eloquent ORM polymorphic relations, only parent models using numeric or UUID primary keys are supported.

If you are using a custom primary key, you may create this type of relation after you receive your scaffolded app.
:::

In this example, both `Student` and `Teacher` share one `Classroom`, and share many `Courses`. The polymorphic relations will be fully aware of the names, and the migrations for both `Classroom` and `Course` will include the polymorphic columns automatically.

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

::: warning I'm a wizard, not a psychic
When the child model has many `morphTo` relations, you will need to pick one, like `morphOne:Classroom,assistable`.
:::

If all the related models use UUID as primary key, don't worry, Larawiz will automatically change the migration column to use `uuid`.

```yaml{3,8}
models:
  Photo:
    id: uuid
    title: string
    category: morphOne
  
  Video:
    id: uuid
    title: string
    category: morphOne

  Category:
    name: string
    categorizable: morphTo
```

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

```php{16}
Schema::create('photos', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->string('title');
    $table->timestamps();
});

Schema::create('videos', function (Blueprint $table) {
    $table->uuid('id')->primary();
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

## Nullable `morphTo`

For the case of a `morphTo` relation, you can use the `nullable` keyword to allow absent parents.

```yaml{3}
models:
  Image:
    imageable: morphTo nullable
```

```php
/**
 * @propery-read \App\Models\Post|null
 */
class Image extends Model
{
    public function imageable()
    {
        return $this->morphsTo();
    }
}
```

```php{3}
Schema::create('images', function (Blueprint $table) {
  $table->id();
  $table->nullableMorphs('imageable');
});
```
