# Appends

Models have the ability to [append new attributes on JSON serialization](https://laravel.com/docs/8.x/eloquent-serialization#appending-values-to-json) with the `appends` key. Larawiz will automatically add the attribute getter and its annotated value type.

To append a new attribute, set the name of the attribute in `snake_case` and annotate with either:

- a primitive PHP type, 
- a PHP Class with full namespace,
- a `collection`,
- or `timestamp|datetime`.

Larawiz won't enforce any annotation type, so you're free to put whatever you want.

```yaml{6-10}
models:

  Player:
    # ...
      
    appends:
      last_match: timestamp
      win_streak: int
      position: \App\Position
      past_teams: collection
```

```php
/**
 * @property-read \Illuminate\Support\Carbon $lastMatch 
 * @property-read int $winStreak 
 * @property-read App\Position $position
 * @property-read \Illuminate\Support\Collection $past_teams
 */
class Player extends Model
{
    protected $appends = ['last_match', 'win_streak', 'position', 'past_teams'];

    // ...
    
    public function getLastMatchAttribute()
    {
        // TODO: Code the 'last_match' getter.
    }
    
    public function getWinStreakAttribute()
    {
        // TODO: Code the 'win_streak' getter.
    }
    
    public function getPositionAttribute()
    {
        // TODO: Code the 'position' getter.
    }
    
    public function getPastTeamsAttribute()
    {
        // TODO: Code the 'past_teams' getter.
    }
}
```

::: tip Little helps that count
When issuing `timestamp|datetime` or `collection`, Larawiz will automatically change the annotation to `Carbon` and `Collection`, respectively.  
:::