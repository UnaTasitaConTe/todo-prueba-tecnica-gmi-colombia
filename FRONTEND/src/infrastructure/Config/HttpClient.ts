import type { Authentication } from "@/domain/Models/Api/Authentication/Authentication";
import { useSessionStore } from "@/stores/Session";

/**
 * Clase para manejar solicitudes HTTP.
 * Proporciona métodos convenientes para realizar solicitudes GET, POST, PUT y DELETE.
 */
export class HttpClient {
    baseURL: string;
    defaultHeaders: Record<string, string>;
    token?: string;

    /**
     * Crea una nueva instancia de HttpClient.
     * @param {string} [baseURL=""] - La URL base para todas las solicitudes.
     */
    constructor(baseURL = "") {
        this.baseURL = baseURL;

        this.defaultHeaders = {
            "Content-Type": "application/json",
        };
    }

    /**
     * Establece el token de autenticación.
     * @param {string} token - El token de autenticación.
     */
    setAuthToken(token: string): void {
        this.token = token;
    }

    /**
     * Establece encabezados predeterminados.
     * @param {Record<string, string>} headers - Los encabezados que se agregarán a los predeterminados.
     */
    setDefaultHeaders(headers: Record<string, string>): void {
        this.defaultHeaders = { ...this.defaultHeaders, ...headers };
    }

    /**
     * Método para manejar las solicitudes HTTP.
     * @param {string} url - El endpoint de la solicitud.
     * @param {RequestOptions} [options={}] - Opciones para la solicitud.
     * @returns {Promise<T>} La respuesta en formato JSON.
     * @throws {Error} Lanzará un error si la solicitud no es exitosa.
     */
    async request<T>(
        url: string,
        { method = "GET", headers = {}, body = null, ...options }: RequestOptions = {}
    ): Promise<T> {
        const mergedHeaders = { ...this.defaultHeaders, ...headers };
        // const session = JSON.parse(localStorage.getItem('session-store') ?? '') as Authentication;
        // console.log(session);
        if (body instanceof FormData) {
            delete mergedHeaders["Content-Type"];
        }

        // this.token = session.token;
        // Agregar el token de autenticación si existe

        if (this.token) {
            mergedHeaders["Authorization"] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(`${this.baseURL}${url}`, {
                method,
                headers: mergedHeaders,
                body: body instanceof FormData ? body : body ? JSON.stringify(body) : null,
                ...options,
            });

            if (!response.ok) {
                // Manejar error 401 - No autorizado
                if (response.status === 401) {
                    console.warn("Token expirado, intentando refrescar...");

                    // Intentar refrescar el token
                    await this.refreshToken();

                    // Volver a realizar la solicitud con el nuevo token
                    mergedHeaders["Authorization"] = `Bearer ${this.token}`;
                    const retryResponse = await fetch(`${this.baseURL}${url}`, {
                        method,
                        headers: mergedHeaders,
                        body: body instanceof FormData ? body : body ? JSON.stringify(body) : null,
                        ...options,
                    });

                    if (!retryResponse.ok) {
                        throw await this.createError(retryResponse);
                    }

                    return await retryResponse.json() as T;
                }

                throw await this.createError(response);
            }

            return await response.json() as T;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    }

    /**
     * Método para refrescar el token de autenticación.
     * Este método debería implementar la lógica necesaria para obtener un nuevo token.
     */
    private async refreshToken(): Promise<void> {
        // Aquí deberías implementar la lógica para refrescar el token.
        // Por ejemplo, haciendo una solicitud a un endpoint de actualización de token.
        // Después de obtener un nuevo token, actualiza `this.token`.
        const session = useSessionStore();
        // Simulando la obtención de un nuevo token
        const newToken = session.access_token; // Aquí debería ir la lógica real
        this.setAuthToken(newToken);
    }

    /**
     * Método para crear un error a partir de la respuesta HTTP.
     * @param {Response} response - La respuesta HTTP.
     * @returns {Promise<Error>} Un objeto de error personalizado.
     */
    private async createError(response: Response): Promise<Error> {
        const errorData = await response.json();
        const error: any = new Error("HTTP error");
        error.status = response.status;
        error.statusText = response.statusText;
        error.data = errorData;
        return error;
    }

    // Métodos GET, POST, PUT, DELETE...

    get<T>(url: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: "GET" });
    }

    post<T>(url: string, data: any, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: "POST", body: data });
    }

    put<T>(url: string, data: any, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: "PUT", body: data });
    }

    delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: "DELETE" });
    }
}

/**
 * Opciones para la solicitud HTTP.
 */
interface RequestOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    [key: string]: any;
}
