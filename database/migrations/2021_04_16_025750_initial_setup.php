<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitialSetup extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comics', function (Blueprint $table) {
            $table->unsignedInteger("cvid")->first();
            $table->string('title');
            $table->integer('status');
            $table->text('overview')->nullable();
            $table->text('images');
            $table->text('path');
            $table->boolean('monitored');
            $table->text('publisher')->nullable();
            $table->unsignedInteger('year')->nullable();
            $table->text('tags');
            $table->timestamp('created_at');
            $table->timestamp('last_info_sync')->nullable();
            $table->text('add_options')->nullable();

            $table->primary('cvid');
        });

        Schema::create('issues', function (Blueprint $table) {
            $table->unsignedInteger('cvid')->first();
            $table->foreignId('comic_id')->references('cvid')->on('comics')->onDelete('cascade');
            $table->unsignedInteger('issue_num');
            $table->string('title')->nullable();
            $table->text('overview')->nullable();
            $table->integer('issue_file')->nullable();
            $table->boolean('monitored')->nullable();
            $table->date('store_date')->nullable();
            $table->date('cover_date')->nullable();
            $table->text('images')->nullable();

            $table->primary('cvid');
        });

        Schema::create('issue_files', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->foreignId('comic_id')->references('cvid')->on('comics')->onDelete('cascade');
            $table->unsignedInteger('size');
            $table->timestamp('created_at');
            $table->text('relative_path')->nullable();
            $table->text('original_file_path')->nullable();
        });

        Schema::create('indexers', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->text('name');
            $table->text('implementation');
            $table->text('settings')->nullable();
            $table->text('settings_schema')->nullable();
            $table->boolean('enable_rss')->nullable();
            $table->boolean('enable_automatic_search')->nullable();
            $table->boolean('enable_interactive_search');
            $table->integer('priority')->default('25');
        });

        Schema::create('indexer_status', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->foreignId('provider_id')->references('id')->on('indexers')->onDelete('cascade');
            $table->timestamp('initial_failure')->nullable();
            $table->timestamp('latest_failure')->nullable();
            $table->integer('escalation_level');
            $table->timestamp('disabled_till')->nullable();
            $table->text('last_rss_sync_release_info')->nullable();
        });

        Schema::create('download_clients', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->text('name');
            $table->text('implementation');
            $table->text('settings');
            $table->text('settings_schema');
            $table->boolean('enable')->nullable();
            $table->integer('priority')->default('25');

        });

        Schema::create('download_client_status', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->foreignId('provider_id')->references('id')->on('indexers')->onDelete('cascade');
            $table->timestamp('initial_failure')->nullable();
            $table->timestamp('latest_failure')->nullable();
            $table->integer('escalation_level');
            $table->timestamp('disabled_till')->nullable();
        });

        Schema::create('blacklist', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->foreignId('comic_id')->references('cvid')->on('comics')->onDelete('cascade');
            $table->foreignId('issue_id')->references('cvid')->on('issues')->onDelete('cascade');
            $table->text('source_title');
            $table->timestamp('date');
            $table->timestamp('published_date')->nullable();
            $table->integer('size')->nullable();
            $table->integer('protocol')->nullable();
            $table->foreignId('indexer_id')->references('id')->on('indexers')->onDelete('set null')->nullable();
            $table->text('message')->nullable();
            $table->text('torrent_info_hash')->nullable();
        });

        Schema::create('commands', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->text('name');
            $table->text('body');
            $table->integer('priority');
            $table->integer('status');
            $table->timestamp('queued_at');
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->text('duration')->nullable();
            $table->text('exception')->nullable();
            $table->integer('trigger');
        });

        Schema::create('history', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->foreignId('comic_id')->references('cvid')->on('comics')->onDelete('cascade');
            $table->foreignId('issue_id')->references('cvid')->on('issues')->onDelete('cascade');
            $table->text('source_title');
            $table->timestamp('date');
            $table->text('data');
            $table->integer('event_type')->nullable();
            $table->text('download_id')->nullable();
        });

        Schema::create('download_history', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->foreignId('comic_id')->references('cvid')->on('comics')->onDelete('cascade');
            $table->string('download_id');
            $table->integer('event_type');
            $table->text('source_title');
            $table->timestamp('date');
            $table->integer('protocol')->nullable();
            $table->foreignId('indexer_id')->nullable()->references('id')->on('indexers')->onDelete('set null');
            $table->foreignId('download_client_id')->nullable()->references('id')->on('download_clients')->onDelete('set null');
            $table->text('release')->nullable();
            $table->text('data')->nullable();
        });

        Schema::create('root_folders', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->text('path');

        });

        Schema::create('scheduled_tasks', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->text('type_name');
            $table->integer('interval');
            $table->timestamp('last_execution');
        });

        Schema::create('tags', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->text('label');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('comics');
        Schema::drop('issues');
        Schema::drop('issue_files');
        Schema::drop('indexers');
        Schema::drop('indexer_status');
        Schema::drop('download_clients');
        Schema::drop('download_client_status');
        Schema::drop('download_history');
        Schema::drop('blacklist');
        Schema::drop('commands');
        Schema::drop('history');
        Schema::drop('root_folders');
        Schema::drop('scheduled_tasks');
        Schema::drop('tags');
    }
}
