<?php

namespace App\DTOS;

class TaskDTO
{
    public $id;
    public $title;
    public $descripcion;
    public $userId;
    public $tags;
    public $date_expired;
    public $image;

    public function __construct($task = null)
    {
        $this->id = $task->id ?? null;
        $this->title = $task->title ?? null;
        $this->descripcion = $task->descripcion ?? null;
        $this->userId = $task->userId ?? null;
        $this->tags = json_decode($task->tags) ?? [];
        $this->date_expired = $task->date_expired ?? null;
        $this->image = $task->image ? url($task->image) : null;
    }
}
