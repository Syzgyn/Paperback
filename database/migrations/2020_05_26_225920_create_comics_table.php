<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comics', function (Blueprint $table) {
            #$table->id();
            $table->unsignedInteger("cvid")->first();
            $table->timestamps();
            $table->string('name');
            $table->text('description');
            $table->unsignedInteger('start_year');
            $table->string('url');
            $table->string('status')->nullable();

            $table->primary('cvid');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comics');
    }
}
