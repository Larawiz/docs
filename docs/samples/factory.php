<?php

use App\Post;
use Faker\Generator as Faker;

// TODO: Review the Factory for the Post model.

/** @var \Illuminate\Database\Eloquent\Factory $factory */

$factory->define(Post::class, function (Faker $faker) {
    return [
        'uuid' => $faker->uuid,
        'title' => $faker->sentence,
        'body' => $faker->text,
        'published_at' => $faker->dateTime,
    ];
});

$factory->state(Post::class, 'deleted', function (Faker $faker) {
    return [
        'deleted_at' => $faker->dateTime,
    ];
});
