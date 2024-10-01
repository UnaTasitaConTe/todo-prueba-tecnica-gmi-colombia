export interface Authentication {
    // Token de autenticación que se emite después de una autenticación exitosa
    access_token: string;
    // Tipo del token, por ejemplo, "Bearer"
    type: string;
    // Fecha y hora de vencimiento del token
    expires_in: string;
}
