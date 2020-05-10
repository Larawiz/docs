<?php

use App\Post;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factory;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @param  \Illuminate\Database\Eloquent\Factory  $factory
     * @param  \App\Post  $post
     * @return void
     */
    public function run(Factory $factory, Post $post)
    {
        if ($this->modelHasFactory($factory)) {
            $this->createRecords($factory, $this->amount($post));

            $this->additionalRecords($factory);

            return $this->createStates($factory);
        }

        throw new LogicException('The [Post] model has no factory defined to use for seeding.');
    }

    /**
     * Creates additional records to populate the database.
     *
     * @param  \Illuminate\Database\Eloquent\Factory  $factory
     */
    protected function additionalRecords($factory)
    {
        // This method is a convenient way to add personalized records.
        //
        // $factory->of(Post::class)->create(['name' => 'John Doe']);
    }

    /**
     * Creates additional record by using states.
     *
     * @param  \Illuminate\Database\Eloquent\Factory  $factory
     * @return void
     */
    public function createStates($factory)
    {
        // If your Schematic model has states defined, you can add them here too.
        //
        // $factory->of(Post::class)->times(10)->state('state')->create();
    }

    /**
     * Returns a useful amount of records to create.
     *
     * @param \App\Post $post
     * @return int
     */
    protected function amount($post)
    {
        // We will conveniently create to two and a half pages of Schematic.
        return (int) ($post->getPerPage() * 2.5);
    }

    /**
     * Check if the model has a factory defined.
     *
     * @param  \Illuminate\Database\Eloquent\Factory  $factory
     * @return bool
     */
    protected function modelHasFactory($factory)
    {
        return isset($factory[Post::class]);
    }

    /**
     * Populate the model records using the factory definition.
     *
     * @param  \Illuminate\Database\Eloquent\Factory  $factory
     * @param  int  $amount
     */
    protected function createRecords($factory, int $amount)
    {
        $factory->of(Post::class)->times($amount)->create();
    }
}
