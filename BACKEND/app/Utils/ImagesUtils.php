<?php

namespace App\Utils;
use Exception;
use Illuminate\Http\UploadedFile;

class ImagesUtils
{
    /**
     * Genera un nombre de archivo único basado en el nombre original del archivo.
     *
     * @param string $originalName Nombre original del archivo
     * @return string Nombre de archivo único
     */
    protected function generateUniqueFileName($originalName)
    {
        // Obtener la extensión del archivo
        $extension = pathinfo($originalName, PATHINFO_EXTENSION);

        // Generar un nombre único usando un timestamp y un identificador aleatorio
        $uniqueName = uniqid() . '_' . time() . '.' . $extension;

        return $uniqueName;
    }
    /**
     * Guarda una imagen en el almacenamiento y retorna su URL.
     *
     * Este método guarda un archivo de imagen proporcionado en una ruta específica del almacenamiento público.
     * Primero valida que el archivo sea una imagen válida, luego genera un nombre de archivo único,
     * almacena la imagen y devuelve la URL de acceso a la imagen almacenada.
     *
     * @param UploadedFile $image Imagen a almacenar.
     * @param string $path Ruta de almacenamiento donde se guardará la imagen.
     * @throws Exception Si la imagen no es válida o si ocurre un error durante el almacenamiento.
     * @return string URL pública de la imagen almacenada.
     */
    public function saveImagen(UploadedFile $image, string $path)
    {
        // Validar si el archivo es una imagen
        if (!$image->isValid()) {
            throw new Exception("El archivo proporcionado no es una imagen válida.");
        }

        // Generar un nombre de archivo único
        $imageName = $this->generateUniqueFileName($image->getClientOriginalName());

        // Almacenar la imagen en el almacenamiento público
        $storedPath = $image->storeAs($path, $imageName, 'public');

        // Retornar la URL de la imagen almacenada
        return "storage/$storedPath";

    }
}
