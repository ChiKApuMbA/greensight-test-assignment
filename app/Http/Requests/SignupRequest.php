<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'surname' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:8|max:25|confirmed',
        ];

    }

    public function messages()
    {
        return[
            'name.required' => 'Имя не должно быть пустым',
            'surname.required' => 'Фамилия не должна быть пустой',
            
            'email.required' => 'Email должен быть заполнен',
            'email.email' => 'Требуется корректный запрос электронной почты ',
            
            'password.required' => 'Пароль обязателен для заполнения',
            'password.min' => 'Пароль должен содержать как минимум 8 символов',
            'password.max' => 'Пароль не должен содержать более 25 символов',
            'password.confirmed' => 'Пароли должны совпадать'

        ];
    }
}
