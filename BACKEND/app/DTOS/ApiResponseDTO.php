<?php

namespace App\DTOS;
use Symfony\Component\HttpFoundation\Response;

class ApiResponseDTO
{
    /**
     * @var string|array<string> Mensaje(s) de la respuesta.
     */
    public $messages;

    /**
     * @var mixed Datos asociados a la respuesta.
     */
    public $data;

    /**
     * @var int Código de estado HTTP de la respuesta.
     */
    public $code;

    /**
     * Constructor de ResponseDTO.
     *
     * @param string|array<string> $messages Mensaje(s) de la respuesta.
     * @param mixed $data Datos asociados a la respuesta.
     * @param int $status Código de estado HTTP (por defecto: 200 OK).
     */
    public function __construct($messages = '', $data = [], int $code = Response::HTTP_OK)
    {
        $this->messages = $messages;
        $this->data = $data;
        $this->code = $code;
    }
}
