export function calcularTiempoRestante(expiration_date: string | undefined) {
    if (!expiration_date) {
        return "No hay fecha de vencimiento";
    }

    // const ahora = new Date();
    const ahora = new Date().getTime(); // convierte la fecha a un valor numérico en milisegundos
    const fechaVencimiento = new Date(expiration_date).getTime(); // convierte la fecha de vencimiento a milisegundos
    const diferenciaMilisegundos = fechaVencimiento - ahora;

    if (diferenciaMilisegundos <= 0) {
        return "La fecha ya ha vencido";
    }

    // Convertir milisegundos a días, horas, minutos
    const dias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenciaMilisegundos % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenciaMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenciaMilisegundos % (1000 * 60)) / 1000);

    return `Quedan ${dias} días, ${horas} horas, ${minutos} minutos, y ${segundos} segundos.`;
}
