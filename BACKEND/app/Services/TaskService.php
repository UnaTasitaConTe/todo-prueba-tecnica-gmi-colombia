<?php

namespace App\Services;
use App\DTOS\ApiResponseDTO;
use App\DTOS\Request\Task\TaskCreateDTO;
use App\DTOS\UserDTO;
use App\Repositories\ITaskRepository;
use App\Utils\DateUtils;
use App\Utils\Images;
use App\Utils\ImagesUtils;

class TaskService implements ITaskService
{
    protected $taskRepository;
    public function __construct(ITaskRepository $taskRepository = null)
    {
        $this->taskRepository = $taskRepository;
    }
    public function create(TaskCreateDTO $taskCreateDTO)
    {
        $images = new ImagesUtils();
        // $dateUtils = new DateUtils();
        $userDTO = new UserDTO(auth()->user());

        if ($taskCreateDTO->image) {
            $tiempo = time();
            $taskCreateDTO->path = $images->saveImagen($taskCreateDTO->image, "task/{$userDTO->name}/{$taskCreateDTO->title}/$tiempo");
        }
        // $dateUtils->
        if ($taskCreateDTO->dateExpired && DateUtils::isDateInPast(DateUtils::normalizeDate($taskCreateDTO->dateExpired))) {
            return new ApiResponseDTO('Fecha de expiración no aceptada debido a que es inferior de la fecha actual', $taskCreateDTO, 409);
        }

        $taskCreateDTO->dateExpired = DateUtils::normalizeDate($taskCreateDTO->dateExpired);
        $taskCreateDTO->userId = $userDTO->userId;

        $taskDTO = $this->taskRepository->create($taskCreateDTO->toArray());

        return new ApiResponseDTO('Tarea Creada Correctamente', $taskDTO, 201);
    }
    public function update(TaskCreateDTO $taskCreateDTO, $id)
    {
        $images = new ImagesUtils();
        // $dateUtils = new DateUtils();
        $userDTO = new UserDTO(auth()->user());


        if (!$this->taskRepository->taskInUser($id, $userDTO->userId)) {
            return new ApiResponseDTO('Esta Tarea No es de su pertenencia y no la puede eliminar', false, 401);
        }

        if ($taskCreateDTO->image) {
            $tiempo = time();
            $taskCreateDTO->path = $images->saveImagen($taskCreateDTO->image, "task/{$userDTO->name}/{$taskCreateDTO->title}/$tiempo");
        }
        // $dateUtils->
        if ($taskCreateDTO->dateExpired && DateUtils::isDateInPast(DateUtils::normalizeDate($taskCreateDTO->dateExpired))) {
            return new ApiResponseDTO('Fecha de expiración no aceptada debido a que es inferior de la fecha actual', $taskCreateDTO, 409);
        }

        if ($taskCreateDTO->dateExpired) {
            $taskCreateDTO->dateExpired = DateUtils::normalizeDate($taskCreateDTO->dateExpired);
        }
        $taskCreateDTO->userId = $userDTO->userId;

        $taskDTO = $this->taskRepository->update($id, $taskCreateDTO->toArray());

        return new ApiResponseDTO('Tarea Actualizada Correctamente', $taskDTO, 200);
    }
    public function delete($id)
    {
        $userDTO = new UserDTO(auth()->user());

        if (!$this->taskRepository->taskInUser($id, $userDTO->userId)) {
            return new ApiResponseDTO('Esta Tarea No es de su pertenencia y no la puede eliminar', false, 401);
        }

        $this->taskRepository->delete($id);

        return new ApiResponseDTO('Tarea Eliminada Correctamente', true, 200);

    }
    public function getByUserId()
    {
        $userDTO = new UserDTO(auth()->user());
        $taskDTOS = $this->taskRepository->getAllByUserId($userDTO->userId);
        return new ApiResponseDTO("Datos Traidos Exitosamente", $taskDTOS, 200);
    }
}
