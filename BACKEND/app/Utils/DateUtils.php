<?php

namespace App\Utils;
use Carbon\Carbon;

class DateUtils
{
      /**
     * Normaliza una fecha al formato YYYY-MM-DD.
     *
     * @param string|\DateTime $date Fecha a normalizar.
     * @return string Fecha en formato 'Y-m-d'.
     * @throws \Exception Si la fecha no es válida.
     */
    public static function normalizeDate($date): string
    {
        try {
            $carbonDate = Carbon::parse($date);
            return $carbonDate->format('Y-m-d');
        } catch (\Exception $e) {
            throw new \Exception("Fecha no válida: " . $e->getMessage());
        }
    }

    /**
     * Comprueba si una fecha es anterior a la fecha actual.
     *
     * @param string|\DateTime $date Fecha a comprobar.
     * @return bool Retorna true si la fecha es anterior a hoy, false en caso contrario.
     * @throws \Exception Si la fecha no es válida.
     */
    public static function isDateInPast($date): bool
    {
        try {
            $carbonDate = Carbon::parse($date);
            return $carbonDate->isBefore(Carbon::today());
        } catch (\Exception $e) {
            throw new \Exception("Fecha no válida: " . $e->getMessage());
        }
    }
}
