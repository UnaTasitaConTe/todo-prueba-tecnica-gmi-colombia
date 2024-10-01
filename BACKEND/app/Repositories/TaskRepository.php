<?php

namespace App\Repositories;
use App\DTOS\TaskDTO;
use App\Models\Task;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskRepository implements ITaskRepository
{
    public function create(array $datos)
    {
        $task = Task::create($datos);
        return new TaskDTO($task);
    }

    public function update($id, array $datos)
    {
        $task = Task::find($id);
        if (!$task) {
            throw new Exception("Tarea con ID {$id} no encontrada.");
        }

        return $task->update($datos);
    }

    public function delete($id)
    {
        $task = Task::find($id);
        if (!$task) {
            throw new Exception("Tarea con ID {$id} no encontrada.");
        }

        return $task->delete();
    }

    public function getAllByUserId($userId): array
    {
        $tasks = Task::where('userId', $userId)->get();

        return $tasks->map(function ($task) {
            return new TaskDTO($task);
        })->toArray();
    }

    public function taskInUser($id, $userId)
    {
        return Task::where([
            ['id', '=', $id],
            ['userId', '=', $userId]
        ])->exists(); 
    }

}
