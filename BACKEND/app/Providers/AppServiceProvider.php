<?php

namespace App\Providers;

use App\Repositories\ITaskRepository;
use App\Repositories\TaskRepository;
use App\Services\ITaskService;
use App\Services\TaskService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        $this->app->bind(ITaskRepository::class, TaskRepository::class);
        $this->app->bind(ITaskService::class, TaskService::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
