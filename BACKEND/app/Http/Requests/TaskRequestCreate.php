<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequestCreate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return !!auth()->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
            '*' => 'prohibited',
            'title' => 'required|string|max:255',
            'tags' => 'required|array',
            'tags.*' => 'required|string',
            'descripcion' => 'required|string',
            'dateExpired' => 'nullable|date|after_or_equal:today', // La fecha debe ser igual o posterior a hoy
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048'  // Limitar a ciertos tipos de archivo e indicar el tamaño máximo
        ];
    }
}
