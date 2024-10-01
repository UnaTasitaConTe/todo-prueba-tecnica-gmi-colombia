<?php

namespace App\DTOS\Request\Task;

class TaskCreateDTO
{

    public $title;
    /**
     *
     * @var array
     */
    public $tags;
    public $descripcion;
    /**
     * @var null|string
     */
    public $dateExpired;
    // public $createdAt;
    /**
     * @var \Illuminate\Http\UploadedFile|null
     */
    public $image;
    /**
     * @var string|null
     */
    public $path;

    public $userId;

    public function __construct($taskRequestCreate = null)
    {
        $this->title = $taskRequestCreate->title ?? null;
        $this->tags = $taskRequestCreate->tags ?? [];
        $this->descripcion = $taskRequestCreate->descripcion ?? null;
        $this->dateExpired = $taskRequestCreate->dateExpired ?? null;
        $this->image = $taskRequestCreate->image ?? null;
        $this->path = $taskRequestCreate->path ?? null;
    }

    public function toArray()
    {
        return [
            "title" => $this->title,
            "tags" => json_encode($this->tags),
            "descripcion" => $this->descripcion,
            "date_expired" => $this->dateExpired,
            "image" => $this->path,
            "userId" => $this->userId,
        ];
    }
}
