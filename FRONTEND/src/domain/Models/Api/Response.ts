export type Response<T> = {
    // Array de mensajes relacionados con la respuesta, por ejemplo, mensajes de error o información
    messages: string[];
    // Datos principales de la respuesta, que pueden ser de cualquier tipo (genérico)
    data: T;
    // Código de estado de la respuesta, por ejemplo, 200 para éxito, 400 para error de solicitud
    code: number;
}
