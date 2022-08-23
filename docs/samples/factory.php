<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @implements \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        throw new \RuntimeException("The factory for model [Post] has no defined attributes yet.");
        // return [
        //     // ...
        // ];
    }

    /**
     * Define the deleted state.
     *
     * @return static
     */
    public function trashed()
    {
        return $this->state(function (array $attributes): array {
            // Ensure it's marked as deleted *after* the date it was created.
            return [
                $this->newModel()->getDeletedAtColumn() => fake()->dateTimeBetween(
                    $attributes[$this->newModel()->getCreatedAtColumn()] ?? '-30 years', 'now'
                ),
            ];
        });
    }
}
