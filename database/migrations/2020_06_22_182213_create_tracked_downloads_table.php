<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrackedDownloadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tracked_downloads', function (Blueprint $table) {
            $table->id();
            $table->timestamp('date')->useCurrent();
            $table->foreignId('comic_id')->references('cvid')->on('comics')->onDelete('cascade');
            $table->foreignId('issue_id')->references('cvid')->on('issues')->onDelete('cascade');
            $table->foreignId('download_client_id')->nullable()->references('id')->on('downloaders');
            $table->string('download_id')->nullable();
            $table->string('guid');
            $table->integer('status')->default(0);
            $table->string('protocol');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tracked_downloads');
    }
}
