<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIssueFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issue_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('comic_id')->references('cvid')->on('comics')->onDelete('cascade');
            $table->foreignId('issue_id')->unique()->references('cvid')->on('issues')->onDelete('cascade');
            $table->timestamp('date')->useCurrent();
            $table->string('relative_file_name');
            $table->string('original_file_name');
            $table->integer('size');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('issue_files');
    }
}
