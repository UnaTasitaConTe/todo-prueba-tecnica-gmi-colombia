import type { LoginModel } from "@/domain/Models/Authentication/LoginModel";

/**
 * Clase LoginDTO que implementa la interfaz LoginModel.
 * Esta clase se utiliza para manejar las credenciales del usuario 
 * y convertirlas en un formato adecuado para el envío, como FormData.
 */
export class LoginDTO implements LoginModel {
    email: string;
    password: string;

    /**
     * Crea una instancia de LoginDTO.
     * @param {LoginModel | null} credenciales - Objeto que contiene el email y la contraseña del usuario.
     */
    constructor(credenciales: LoginModel | null) {
        this.email = credenciales?.email || '';
        this.password = credenciales?.password || '';
    }

    /**
     * Convierte las credenciales en un objeto FormData.
     * @returns {FormData} - Un objeto FormData que contiene el email y la contraseña.
     */
    toFormData(): FormData {
        const formData = new FormData();
        formData.append('email', this.email);
        formData.append('password', this.password);
        return formData;
    }
    toObject() {
        return this;
    }
}
