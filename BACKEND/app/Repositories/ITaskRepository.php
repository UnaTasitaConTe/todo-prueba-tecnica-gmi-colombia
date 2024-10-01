<?php

namespace App\Repositories;

interface ITaskRepository
{
    /**
     * Crea una nueva tarea.
     *
     * @param array $datos Datos para crear la tarea.
     * @return \App\DTOS\TaskDTO Objeto de transferencia de datos de la tarea creada.
     */
    public function create(array $datos);
    /**
     * Actualiza una tarea existente.
     *
     * @param int $id ID de la tarea a actualizar.
     * @param array $datos Datos para actualizar la tarea.
     * @return bool|null Retorna true si la actualización fue exitosa, false si falló, o null si no se encuentra la tarea.
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si la tarea no se encuentra.
     */
    public function update($id, array $datos);

    /**
     * Elimina una tarea existente.
     *
     * @param int $id ID de la tarea a eliminar.
     * @return bool|null Retorna true si la eliminación fue exitosa, false si falló, o null si no se encuentra la tarea.
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si la tarea no se encuentra.
     */
    public function delete($id);
    /**
     * Obtiene todas las tareas por id del usuario.
     *
     * @return \App\DTOS\TaskDTO[] Array de objetos TaskDTO representando todas las tareas.
     */
    public function getAllByUserId($userId);
    /**
     * Comprueba si una tarea pertenece a un usuario específico.
     *
     * Este método verifica si existe una tarea con el ID proporcionado que pertenezca a un usuario específico (userId).
     *
     * @param int $id ID de la tarea a verificar.
     * @param int $userId ID del usuario propietario de la tarea.
     * @return bool Retorna true si la tarea existe y pertenece al usuario, false en caso contrario.
     */
    public function taskInUser($id, $userId);
}
