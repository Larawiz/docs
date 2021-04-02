<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

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
        return [
            'uuid' => $this->faker->uuid,
            'title' => $this->faker->name,
            'body' => $this->faker->body,
            'published_at' => $this->faker->datetime,
        ];
    }

    /**
     * Define the deleted state.
     *
     * @return array
     */
    public function deleted()
    {
        return [
            (new Post)->getDeletedAtColumn() => $this->faker->datetime,
        ];
    }
}
