<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRemotePathMapping extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('remote_path_mapping', function (Blueprint $table) {
            $table->unsignedInteger("id")->autoIncrement();
            $table->string('host');
            $table->string('remote_path');
            $table->string('local_path');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('remote_path_mapping');
    }
}
