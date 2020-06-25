<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('comic_id')->references('cvid')->on('comics')->onDelete('cascade');
            $table->foreignId('issue_id')->references('cvid')->on('issues')->onDelete('cascade');
            $table->timestamp('date');
            $table->string("file_name");
            $table->string("download_id");
            $table->integer("event_type");
            $table->json("data");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('histories');
    }
}
