<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection("logs")->create('logs', function (Blueprint $table) {
            $table->id();
            $table->text("message");
            $table->dateTime("time");
            $table->text("logger");
            $table->text("exception")->nullable();
            $table->text("exception_type")->nullable();
            $table->text("level");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection("logs")->dropIfExists('logs');
    }
}
