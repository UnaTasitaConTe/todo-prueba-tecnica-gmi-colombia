import type { Task } from "@/domain/Models/ToDo/Task";
import { calcularTiempoRestante } from "@/utils/Date";

/**
 * Clase LoginDTO que implementa la interfaz LoginModel.
 * Esta clase se utiliza para manejar las credenciales del usuario 
 * y convertirlas en un formato adecuado para el envío, como FormData.
 */
export class TaskDTO implements Task {
    id?: number;
    created_at: string | null;
    descripcion: string;
    date_expired?: string;
    image: string | File;
    tags: string[];
    title: string;
    user: string;
    tiempoRestante: string;
    finally: boolean;

    /**
     * Crea una instancia de LoginDTO.
     * @param {LoginModel | null} credenciales - Objeto que contiene el email y la contraseña del usuario.
     */
    constructor(task: Task | null) {
        this.id = task?.id;
        this.created_at = task?.created_at ?? new Date().toISOString().split('T')[0];
        this.descripcion = task?.descripcion ?? "";
        this.date_expired = task?.date_expired;
        this.image = task?.image ?? '';
        this.tags = task?.tags ?? [];
        this.title = task?.title ?? '';
        this.user = task?.user ?? '';
        this.tiempoRestante = calcularTiempoRestante(task?.date_expired);
        this.finally = false;
    }

    /**
     * Convierte las credenciales en un objeto FormData.
     * @returns {FormData} - Un objeto FormData que contiene el email y la contraseña.
     */
    toFormData(): FormData {
        const formData = new FormData();

        formData.append('descripcion', this.descripcion);
        formData.append('title', this.title);
        if (this.image && this.image instanceof File) {
            formData.append('image', this.image);
        }
        if (this.date_expired) {
            formData.append('dateExpired', this.date_expired);
        }
        this.tags.forEach((element, index) => {
            formData.append(`tags[${index}]`, element)
        });
        return formData;
    }
}
