<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostSeeder extends Seeder
{
    /**
     * Creates a new PostSeeder instance.
     *
     * @return void
     */
    public function __construct()
    {
        // Bail out if we can't resolve the factory name, as it may not exist.
        if (! class_exists($name = Factory::resolveFactoryName(Post::class))) {
            throw new LogicException('The [Post] model has no factory: $name.');
        }
    }

    /**
     * Run the database seeder for PostSeeder.
     *
     * @return void
     */
    public function run()
    {
        // If you are using SQLite file instead of in-memory database, you may
        // want to wrap this run into a database transaction. It's known that
        // SQLite is very slow when each database statement runs one by one.
        //
        // @link https://laravel.com/docs/database#database-transactions

        $this->createRecords(static::factory(), $this->amount());

        $this->createStates(static::factory());

        $this->createAdditionalRecords(static::factory());
    }

    /**
     * Returns a useful number of records to create.
     *
     * @return int
     */
    protected function amount()
    {
        // We will conveniently create to two and a half pages of Post.
        return (int) ((new Post)->getPerPage() * 2.5);
    }

    /**
     * Populate the model records using the factory definition.
     *
     * @param  \Illuminate\Database\Eloquent\Factories\Factory  $factory
     * @param  int  $amount
     *
     * @return void
     */
    protected function createRecords(Factory $factory, int $amount)
    {
        $factory->times($amount)->create();
    }

    /**
     * Creates additional records to populate the database.
     *
     * @param  \Illuminate\Database\Eloquent\Factories\Factory  $factory
     *
     * @return void
     */
    protected function createAdditionalRecords(Factory $factory)
    {
        // This method is a convenient way to add personalized records.
        //
        // $factory->create(['name' => 'John Doe']);
    }

    /**
     * Creates additional records by using states.
     *
     * @param  \Illuminate\Database\Eloquent\Factories\Factory  $factory
     *
     * @return void
     */
    protected function createStates(Factory $factory)
    {
        // Add here any states you want to make.
        //
        // $factory->times(10)->myAwesomeState()->create();
    }

    /**
     * Returns the factory for the given model.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    protected static function factory()
    {
        return Factory::factoryForModel(Post::class);
    }
}
