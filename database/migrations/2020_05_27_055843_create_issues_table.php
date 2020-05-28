<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIssuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issues', function (Blueprint $table) {
            $table->unsignedInteger('cvid')->first();
            $table->unsignedInteger('comic_id');
            $table->unsignedInteger('issue_num');
            $table->date('release_date');
            $table->text('description');
            $table->string('url');
            $table->string('status')->nullable();

            $table->primary('cvid');
            $table->foreignId('comic_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('issues');
    }
}
