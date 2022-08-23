<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeder.
     *
     * @return void
     */
    public function run()
    {
        DB::transaction($this->before(...));
        DB::transaction($this->createRecords(...));
        DB::transaction($this->createAdditionalRecords(...));
        DB::transaction($this->createStates(...));
        DB::transaction($this->after(...));
    }

    /**
     * Run before seeding the database.
     *
     * @return void
     */
    protected function before()
    {
        // ...
    }

    /**
     * Populate the model records using the factory definition.
     *
     * @return void
     */
    protected function createRecords()
    {
        // This makes 2 and a half pages of your model. You can change it if you want.
        $amount = (int) ((new Post())->getPerPage() * 2.5);

        Post::factory()->times($amount)->create();
    }

    /**
     * Creates additional records to populate the database.
     *
     * @return void
     */
    protected function createAdditionalRecords()
    {
        // This method is a convenient way to add personalized records.
        //
        // Post::factory()->create(['name' => 'John Doe']);
    }

    /**
     * Creates additional records by using states.
     *
     * @return void
     */
    protected function createStates()
    {
        // Add here any states you want to make.
        //
        // Post::factory()->times(10)->myAwesomeState()->create();
    }

    /**
     * Run after seeding the database.
     *
     * @return void
     */
    protected function after()
    {
        // ...
    }
}