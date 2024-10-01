export interface Task {
    // Título de la tarea
    id?: number;

    title: string;
    // Descripción detallada de la tarea
    descripcion: string;
    // Fecha de creación de la tarea, puede ser nula si aún no se ha establecido
    created_at: string | null;
    // Usuario asociado a la tarea (puede ser el creador o el asignado)
    user: string;
    // Etiquetas asociadas para categorizar la tarea
    tags: string[];
    // Imagen relacionada con la tarea, se almacena como un archivo
    image: File | string;
    // Fecha de vencimiento de la tarea
    date_expired?: string;
}
