# Casts

When [Quick Models](../model.md#quick-model) or [Custom Models](../model.md#custom-model) are created, Larawiz will automatically [cast the column to their appropriate type](https://laravel.com/docs/eloquent-mutators#attribute-casting) in the `$casts` property, and annotate the casting in the model class PHPDoc, so you can have autocompletion in your code editor or IDE.

Larawiz magically casts attributes to `integer`, `float`, `bool`, `array`, `string` or `Carbon` by inferring the database column type.

```yaml
models:

  Player:
    name: string
    shirt_number: unsignedTinyInteger
    rating: decimal:2,1 # Like 10.0 or 3.5
    pitch_positions: json
    birthday: datetime nullable
    joined_at: timestamp
```

```php
/**
 * @property string $name
 * @property int $shirt_number
 * @property float $rating
 * @property array $pitch_positions
 * @property \Illuminate\Support\Carbon|null $birthday
 * @property \Illuminate\Support\Carbon $joined_at
 */
class Player extends Model
{
    protected $casts = [
        'shirt_number' => 'integer',
        'rating' => 'decimal',
        'pitch_positions' => 'array',
        'birthday' => 'datetime',
        'joined_at' => 'timestamp',
    ];

    // ...
}
```

## Custom casts

One of the key features of Eloquent ORM are [custom casts](https://laravel.com/docs/eloquent-mutators#custom-casts). You can set a custom cast for an attribute depending on what you want below the `casts` key of the model.

- To create a **cast class**, issue the class name.
- To create an **enum**, issue the Enum name and the state names separated by comma.

In this example we can see these options in action.

```yaml{10-11}
models:

  Player:
    name: string
    shirt_number: unsignedTinyInteger
    pitch_positions: json
    form: string nullable
        
    casts:
      pitch_positions: PitchPosition # Cast as a Class
      form: Form:excellent,good,fine,bad,horrible # Cast as an Enum
```

```php{3-4,9-10,16-17}
<?php

use App\Casts\PitchPosition;
use App\Enums\Form;

/**
 * ...
 *
 * @property string $pitch_positions
 * @property \App\Enums\Mood|null $mood
 */
class Player extends Model
{
    protected $casts = [
        'shirt_number' => 'integer',
        'pitch_positions' => PitchPosition::class,
        'form' => Form::class,
    ];
    
    // ...
}
```

```php
<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class PlayerPosition implements CastAttributes
{
    public function get($model, $key, $value, $attributes)
    {
        // TODO: Update the casting of the value.
        
        return $value;
    }

    public function set($model, $key, $value, $attributes)
    {
        // TODO: Update the casting of the value.
        
        return $value;
    }
}
```

```php
<?php

namespace App\Enums;

enum Form: string
{
    case Excellent = 'excellent';
    case Good = 'good';
    case Fine = 'fine';
    case Bad = 'bad';
    case Horrible = 'horrible';
}
```

::: warning Only string enums 
To keep your application _sane_, Larawiz only supports string-backed enums. Issuing a number will make an enum empty with a warning.
:::

To be sure you can find your classes, Larawiz takes the following liberties:

- Class Casts are created in `App\Casts`
- Enum Casts are created in `App\Enums`

### Custom cast annotation 

As you may have noted, when using a Custom Cast (not enums), the PHPDoc for the _cast_ property uses the column native PHP type. That is because Larawiz does not know what the custom cast class will return. You can easily override this with adding a cast type to annotate as second parameter.

```yaml{8}
models:

  Player:
    columns:
        pitch_positions: json nullable
        
    casts:
      pitch_positions: PitchPositionCast \Illuminate\Support\Collection<int, string>
```

```php{2}
/**
 * @property \Illuminate\Support\Collection<int, string>|null $pitch_positions
 */
class Player extends Model
{
    protected $casts = [
        'pitch_positions' => PitchPositionCast::class,
    ];
}
```

::: tip It's free real state
You can set any text as an annotated type, even a class that doesn't exist or a random paragraph of _Dune_. 

Larawiz will only add `null` if the column is nullable.
:::

## Laravel casts

You can also use [Laravel casts objects](https://laravel.com/docs/eloquent-mutators#array-object-and-collection-casting) like `AsArrayObject`, `AsCollection`, `AsEncryptedArrayObject`, `AsEncryptedCollection` and `AsStringable`, by only pointing them. Larawiz will automatically add the cast and change the apropiate annotated type for the attribute.

```yaml{8}
models:

  Player:
    columns:
        pitch_positions: json nullable
        
    casts:
      pitch_positions: AsCollection
```

```php{9}
use Illuminate\Database\Eloquent\Casts\AsCollection;

/**
 * @property \Illuminate\Support\Collection|null $pitch_positions
 */
class Player extends Model
{
    protected $casts = [
        'pitch_positions' => AsCollection::class,
    ];
}
```

## External Casts

If for some reason you're planning to use an external cast, like one included in an external package, all you have to do is append `\` to the class. This way Larawiz won't create the class or enum.

```yaml{8}
models:

  Player:
    columns:
        pitch_positions: json
        
    casts:
      pitch_positions: \Games\Baseball\PitchCast \Illuminate\Support\Collection<int, string>
```

```php
use Games\Baseball\PitchCast;

/**
 * @property \Illuminate\Support\Collection<int, string> $pitch_positions
 */
class Player extends Model
{
    protected $casts = [
        'pitch_positions' => PitchCast::class,
    ];
}
```