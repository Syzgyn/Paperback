<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMonitoredField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comics', function (Blueprint $table) {
            $table->boolean('monitored')->default(true);
        });

        Schema::table('issues', function (Blueprint $table) {
            $table->boolean('monitored')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('comics', function (Blueprint $table) {
            $table->dropColumn('monitored');
        });

        Schema::table('issues', function (Blueprint $table) {
            $table->dropColumn('monitored');
        });
    }
}
