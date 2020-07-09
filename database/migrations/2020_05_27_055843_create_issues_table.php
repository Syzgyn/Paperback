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
            $table->timestamps();
            $table->foreignId('comic_id')->references('cvid')->on('comics')->onDelete('cascade');
            $table->unsignedInteger('issue_num');
            $table->date('release_date');
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->string('url');
            $table->boolean('monitored')->default(true);

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
        Schema::dropIfExists('issues');
    }
}
