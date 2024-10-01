<?php

namespace App\Http\Controllers;

use App\DTOS\Request\Task\TaskCreateDTO;
use App\Http\Requests\TaskRequestCreate;
use App\Services\ITaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    protected $taskService;
    public function __construct(ITaskService $iTaskService)
    {
        $this->middleware('auth:api');
        $this->taskService = $iTaskService;
    }

    /**
     * Almacena un nuevo recurso en el almacenamiento.
     *
     * @param  TaskRequestCreate $taskRequestCreate Solicitud que contiene los datos de la tarea a crear.
     * @return JsonResponse Respuesta en formato JSON con la tarea creada.
     */
    public function store(TaskRequestCreate $taskRequestCreate): JsonResponse
    {
        $taskCreateDTO = new TaskCreateDTO($taskRequestCreate);
        // return response()->json($taskCreateDTO);
        $apiResponseDTO = $this->taskService->create($taskCreateDTO);
        return response()->json($apiResponseDTO, $apiResponseDTO->code);
    }

    /**
     * Muestra el recurso especificado.
     *
     * @return void Este método está actualmente vacío.
     */
    public function show()
    {
        // Método no implementado.

        $apiResponseDTO = $this->taskService->getByUserId();
        return response()->json($apiResponseDTO, $apiResponseDTO->code);
    }

    /**
     * Actualiza el recurso especificado en el almacenamiento.
     *
     * @param  TaskRequestCreate $taskRequestCreate Solicitud que contiene los datos actualizados de la tarea.
     * @param  int $id ID de la tarea a actualizar.
     * @return JsonResponse Respuesta en formato JSON con la tarea actualizada.
     */
    public function update(TaskRequestCreate $taskRequestCreate, int $id): JsonResponse
    {
        $taskCreateDTO = new TaskCreateDTO($taskRequestCreate);
        $apiResponseDTO = $this->taskService->update($taskCreateDTO, $id);
        return response()->json($apiResponseDTO, $apiResponseDTO->code);
    }

    /**
     * Elimina el recurso especificado del almacenamiento.
     *
     * @param  int $id ID de la tarea a eliminar.
     * @return \Illuminate\Http\JsonResponse Respuesta en formato JSON con el ID de la tarea eliminada.
     */
    public function destroy(int $id): JsonResponse
    {
        $apiResponseDTO = $this->taskService->delete($id);
        return response()->json($apiResponseDTO, $apiResponseDTO->code);
    }
}
