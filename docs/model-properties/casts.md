# Casts

When quick models and custom models are created, Larawiz will automatically [cast the column to their appropriate type](https://laravel.com/docs/8.x/eloquent-mutators#attribute-casting) in the `$casts` property, and annotate the casting in the model class PHPDoc.

Larawiz magically casts `integer`, `decimal`, `bool`, `array`, `double`, and `datetimes` automatically from the database column type.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="traits-yaml"
```yaml
models:

  Player:
    name: string
    shirt_number: unsignedTinyInteger
    rating: decimal:2,1 # Like 10.0 or 3.5
    pitch_positions: json
    birthday: datetime
    joined_at: timestamp
```
:::

::: tab "Model" id="traits-model"
```php
class Player extends Model
{
    protected $casts = [
        'shirt_number' => 'integer',
        'rating' => 'decimal:2',
        'pitch_positions' => 'array',
        'bithday' => 'datetime',
        'joined_at' => 'datetime',
    ];

    // ...
}
```
:::
::::

## Disabling casts

To disable any automatic cast in custom models, set the `casts` key to `false`. 

```yaml{9}
models:

  Player:
    columns:
      name: string
      shirt_number: unsignedTinyInteger
      pitch_positions: json
      
    casts: false
```

::: warning Cast are king
If casts are disabled, PHPDoc `@properties` will reflect that and treat each column as a `string`.
:::

## Set or override a cast type

While Larawiz tries to guess a cast column by their type if it's not a string, you can always set the [cast type](https://laravel.com/docs/eloquent-mutators#attribute-casting) for each column manually in the `casts` key:

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="set-cast-yaml"
```yaml{8,11}
models:

  Player:
    columns:
        name: string
        shirt_number: unsignedTinyInteger
        pitch_positions: json
        birthday: datetime
        
    casts:
      birthday: date
```
:::

::: tab "Model" id="set-cast-model"
```php{4,11}
/**
 * ...
 *
 * @property \Illuminate\Support\Carbon $birthday
 */
class Player extends Model
{
    protected $casts = [
        'shirt_number' => 'integer',
        'pitch_positions' => 'array',
        'bithday' => 'date',
    ];
    
    // ...
}
```
:::
::::

::: tip PHPDoc understands
Setting manually a native cast for a column will be reflected in its PHPDoc.
:::

## Custom casts

One of the key features of Eloquent ORM are [custom casts](https://laravel.com/docs/eloquent-mutators#custom-casts). You can **create custom casts on the fly** by just listing the column to cast, and the cast class name (capitalized), and reuse them across all models that use the same.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="custom-cast-yaml"
```yaml{7,10}
models:

  Player:
    columns:
        name: string
        shirt_number: unsignedTinyInteger
        pitch_positions: json
        
    casts:
      pitch_positions: PitchPositionCast
```
:::

::: tab "Model" id="custom-cast-model"
```php{3,8,15}
<?php

use App\Casts\PitchPositionCast;

/**
 * ...
 *
 * @property mixed $pitch_positions
 */
class Player extends Model
{
    protected $casts = [
        'shirt_number' => 'integer',
        'pitch_positions' => PitchPositionCast::class,
    ];
    
    // ...
}
```
:::

::: tab "Custom Cast" id="custom-cast-class"
```php
<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class PlayerPositionCast extends CastAttributes
{
    /**
     * Cast the given value.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  mixed  $value
     * @param  array  $attributes
     * @return array
     */
    public function get($model, $key, $value, $attributes)
    {
        // TODO: Update the casting of the value.
        return $key;
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  array  $value
     * @param  array  $attributes
     * @return string
     */
    public function set($model, $key, $value, $attributes)
    {
        // TODO: Update the casting of the value.
        return $key;
    }
}
```
:::
::::

### Overriding PHPDoc type on custom cast

As you may have noted, when using a custom cast, the PHPDoc for the casted property becomes `mixed`. You can easily override this with adding a cast type as second parameter. If it's `nullable`, it will be added before the type.

If you're using a class as a type, check that it exists, otherwise Larawiz will panic.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="custom-cast-phpdoc-yaml"
```yaml{8,15}
models:

  Player:
    columns:
        pitch_positions: json
        
    casts:
      pitch_positions: PitchPositionCast \App\Types\PitchPosition

  Substitute:
    columns:
        pitch_positions: json nullable
        
    casts:
      pitch_positions: PitchPositionCast
```
:::

::: tab "Model" id="custom-cast-phpdoc-model"
```php{2,10}
/**
 * @property \App\Types\PitchPosition $pitch_positions
 */
class Player extends Model
{
    // ...
}

/**
 * @property null|\App\Types\PitchPosition $pitch_positions
 */
class Substitute extends Model
{
    // ...
}
```
:::

::::

::: tip Include once, forget later
If you use custom cast second parameter (type override), all other models that share the same custom cast will also use the same type... unless your override it again.
:::

### External casts

If you have a package that includes a cast class already, and you want to use it, you can always reference it with the full namespace. Larawiz will find it and include it in your Model automatically.

For the sake of this example, we are going to install a package that has a handy [Cast BASE64](https://github.com/DarkGhostHunter/Laratraits). We can immediately use the cast that comes with the package by just issuing it into the list.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="external-cast-yaml"
```yaml{9}
models:

  AuthenticationKey:
    columns:
        device: string
        private_key: string 
        
    casts:
      private_key: \DarkGhostHunter\Laratraits\Eloquent\Casts\CastsBase64 string
```
:::

::: tab "Model" id="external-cast-model"
```php{3,8,13}
<?php

use DarkGhostHunter\Laratraits\Eloquent\Casts\CastsBase64;

/**
 * ...
 *
 * @property string $private_key
 */
class AuthenticationKey extends Model
{
    protected $casts = [
        'private_key' => CastsBase64::class,
    ];
    
    // ...
}
```
:::

::::

::: warning Ensure the cast exists
If a cast doesn't exist, watch out, it will be created inside casts directory, which is `App\Casts`.
:::

