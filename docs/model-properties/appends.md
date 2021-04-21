# Appends

Custom models have the ability to set [appended attributes to JSON serialization](https://laravel.com/docs/8.x/eloquent-serialization#appending-values-to-json) with the `appends` key. Larawiz will automatically add the attribute getter, and its PHPDoc.

To add and append the attribute, set the name of the attribute in `snake_case`, and its primitive type, `collection`, `date` or `datetime`, or an existing PHP Class.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="traits-yaml"
```yaml{7-9}
models:

  Player:
    columns:
      # ...
    append:
      last_match: dateTime
      win_streak: int
      pose: App\Poses\BasePose
```
:::

::: tab "Model" id="traits-model"
```php{2-4,8,12-15,17-20,22-25}
/**
 * @property-read \Illuminate\Support\Carbon $lastMatch 
 * @property-read int $winStreak 
 * @property-read \App\Poses\BasePose $pose
 */
class Player extends Model
{
    protected $appends = ['last_match', 'win_streak', 'pose'];

    // ...
    
    public function getLastMatchAttribute()
    {
        // TODO: Code the 'last_match' getter.
    }
    
    public function getWinStreakAttribute()
    {
        // TODO: Code the 'win_streak' getter.
    }
    
    public function getPoseAttribute()
    {
        // TODO: Code the 'win_streak' getter.
    }
}
```
:::
::::

:::tip Collection and Carbon come free
when setting the type as `collection`, or any date-time type like `dateTimeTz` or `timestamp`, don't worry, Larawiz will cast it as a Collection or Carbon instance, respectively.

If you're using date-time, you should use the `dateTime` string to keep your scaffold file _uniform_. 
:::