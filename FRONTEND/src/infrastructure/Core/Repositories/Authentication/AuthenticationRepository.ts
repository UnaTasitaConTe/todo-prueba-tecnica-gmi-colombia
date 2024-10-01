import type { Authentication } from "@/domain/Models/Api/Authentication/Authentication";
import type { Response } from "@/domain/Models/Api/Response";
import type { User } from "@/domain/Models/User/User";
import { GET_AUTHENTICACION_ME_ENDPOINT, POST_AUTHENTICACION_LOGIN_ENDPOINT, POST_AUTHENTICACION_LOGOUT_ENDPOINT } from "@/infrastructure/Config/Endpoints/AuthenticationEndpoints";
import { settings } from "@/infrastructure/Config/env";
import { HttpClient } from "@/infrastructure/Config/HttpClient";

/**
 * Clase para manejar la obtención de puntos desde un servidor.
 */
export class AuthenticationRepository {
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

    async login(credenciales: any) {

        const response = await this.apiClient.post<Response<Authentication>>(POST_AUTHENTICACION_LOGIN_ENDPOINT, credenciales);
        return response;
    }

    async logout() {
        let sessionStore = localStorage.getItem('session-store');
        if (sessionStore) {
            const session = JSON.parse(sessionStore) as Authentication;
            this.apiClient.token = session.access_token;
        }
        const response = await this.apiClient.post<Response<boolean>>(POST_AUTHENTICACION_LOGOUT_ENDPOINT, null);
        return response;
    }

    async me() {
        let sessionStore = localStorage.getItem('session-store');
        if (sessionStore) {
            const session = JSON.parse(sessionStore) as Authentication;
            this.apiClient.token = session.access_token;
        }
        const response = await this.apiClient.post<Response<User>>(GET_AUTHENTICACION_ME_ENDPOINT, null);
        return response;
    }
}