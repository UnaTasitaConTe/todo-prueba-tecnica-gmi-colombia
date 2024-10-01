// **Endpoints para la API de Tareas**

/**
 * Endpoint para obtener la lista de tareas.
 * @constant {string} GET_TASK_ENDPOINT
 * @example
 * fetch(GET_TASK_ENDPOINT)
 * // Utilizado para obtener todas las tareas existentes en el sistema.
 */
export const GET_TASK_ENDPOINT = "task";

/**
 * Endpoint para crear una nueva tarea.
 * @constant {string} POST_CREATE_TASK_ENDPOINT
 * @example
 * fetch(POST_CREATE_TASK_ENDPOINT, {
 *   method: 'POST',
 *   body: JSON.stringify({ title: 'Nueva tarea', description: 'Descripción de la tarea' })
 * })
 * // Utilizado para crear una nueva tarea proporcionando los datos requeridos.
 */
export const POST_CREATE_TASK_ENDPOINT = "task";

/**
 * Endpoint para actualizar una tarea existente.
 * Es necesario concatenar el ID de la tarea que se desea actualizar.
 * @constant {string} POST_UPDATE_TASK_ENDPOINT
 * @example
 * const taskId = 1;
 * fetch(`${POST_UPDATE_TASK_ENDPOINT}${taskId}`, {
 *   method: 'POST',
 *   body: JSON.stringify({ title: 'Tarea actualizada' })
 * })
 * // Utilizado para actualizar los datos de una tarea específica.
 */
export const POST_UPDATE_TASK_ENDPOINT = "task/";

/**
 * Endpoint para eliminar una tarea.
 * Es necesario concatenar el ID de la tarea que se desea eliminar.
 * @constant {string} DELETE_DESTROY_TASK_ENDPOINT
 * @example
 * const taskId = 1;
 * fetch(`${DELETE_DESTROY_TASK_ENDPOINT}${taskId}`, {
 *   method: 'DELETE'
 * })
 * // Utilizado para eliminar una tarea específica.
 */
export const DELETE_DESTROY_TASK_ENDPOINT = "task/";
