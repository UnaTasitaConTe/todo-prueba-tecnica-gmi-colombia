import { TaskDTO } from "@/domain/DTOs/Task/TaskDTO";
import type { Authentication } from "@/domain/Models/Api/Authentication/Authentication";
import type { Response } from "@/domain/Models/Api/Response";
import type { Task } from "@/domain/Models/ToDo/Task";
// import type { User } from "@/domain/Models/User/User";
// import { GET_AUTHENTICACION_ME_ENDPOINT, POST_AUTHENTICACION_LOGIN_ENDPOINT, POST_AUTHENTICACION_LOGOUT_ENDPOINT } from "@/infrastructure/Config/Endpoints/AuthenticationEndpoints";
import { DELETE_DESTROY_TASK_ENDPOINT, GET_TASK_ENDPOINT, POST_CREATE_TASK_ENDPOINT, POST_UPDATE_TASK_ENDPOINT } from "@/infrastructure/Config/Endpoints/TaskEndpoints";
import { settings } from "@/infrastructure/Config/env";
import { HttpClient } from "@/infrastructure/Config/HttpClient";

/**
 * Clase para manejar la obtención de puntos desde un servidor.
 */
export class TaskRepository {
    apiClient: HttpClient;
    /**
     * Crea una nueva instancia de Points.
     * Inicializa un cliente HTTP con la URL de conexión definida en las configuraciones.
     */
    constructor() {
        /**
         * El cliente HTTP utilizado para realizar solicitudes a la API.
         * @type {HttpClient}
         */
        this.apiClient = new HttpClient(settings.urlConnection);
    }

    async Create(datos: FormData) {
        let sessionStore = localStorage.getItem('session-store');
        if (sessionStore) {
            const session = JSON.parse(sessionStore) as Authentication;
            this.apiClient.token = session.access_token;
        }
        try {
            const response = await this.apiClient.post<Response<Task>>(POST_CREATE_TASK_ENDPOINT, datos);

            return response;
        } catch (error) {
            console.log(error);

        }
    }

    async Update(id: number, datos: FormData) {
        let sessionStore = localStorage.getItem('session-store');
        if (sessionStore) {
            const session = JSON.parse(sessionStore) as Authentication;
            this.apiClient.token = session.access_token;
        }
        const response = await this.apiClient.post<Response<boolean>>(POST_UPDATE_TASK_ENDPOINT + id, datos);
        return response;
    }
    async getByUser() {
        let sessionStore = localStorage.getItem('session-store');
        if (sessionStore) {
            const session = JSON.parse(sessionStore) as Authentication;
            this.apiClient.token = session.access_token;
        }
        const response = await this.apiClient.get<Response<Task[]>>(GET_TASK_ENDPOINT);
        const data = response.data.map(e => new TaskDTO(e))
        return {
            code: response.code,
            data: data,
            messages: response.messages
        };
    }

    async Delete(id: number) {
        let sessionStore = localStorage.getItem('session-store');
        if (sessionStore) {
            const session = JSON.parse(sessionStore) as Authentication;
            this.apiClient.token = session.access_token;
        }
        const response = await this.apiClient.delete<Response<boolean>>(DELETE_DESTROY_TASK_ENDPOINT + id);
        return response;
    }

}