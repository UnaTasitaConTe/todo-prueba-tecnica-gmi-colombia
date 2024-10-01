<?php

namespace App\Services;
use App\DTOS\Request\Task\TaskCreateDTO;

interface ITaskService
{
    /**
     * Crea una nueva tarea.
     *
     * @param TaskCreateDTO $taskCreateDTO DTO que contiene los datos de la tarea a crear.
     * @return \App\DTOS\ApiResponseDTO Respuesta con los detalles de la tarea creada o un mensaje de error.
     */
    public function create(TaskCreateDTO $taskCreateDTO);
    /**
     * Actualiza una tarea existente.
     *
     * @param TaskCreateDTO $taskCreateDTO DTO que contiene los datos actualizados de la tarea.
     * @param int $id ID de la tarea a actualizar.
     * @return \App\DTOS\ApiResponseDTO Respuesta con los detalles de la tarea actualizada o un mensaje de error.
     */
    public function update(TaskCreateDTO $taskCreateDTO, $id);
    /**
     * Elimina una tarea específica.
     *
     * @param int $id ID de la tarea a eliminar.
     * @return \App\DTOS\ApiResponseDTO Respuesta con el resultado de la eliminación o un mensaje de error.
     */
    public function delete($id);

    /**
     * Obtiene todas las tareas de un usuario específico.
     *
    //  * @param int $userId ID del usuario cuyas tareas se quieren obtener.
     * @return \App\DTOS\ApiResponseDTO Respuesta con las tareas del usuario.
     */
    public function getByUserId();
}
