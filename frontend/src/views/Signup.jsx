import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signup() {
  const nameRef = createRef();
  const surnameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false); // Состояние для отслеживания успешной регистрации

  const onSubmit = ev => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      surname: surnameRef.current.value, // Исправил ошибку, чтобы использовать значение из правильного рефа
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient.post('/signup', payload)
      .then(() => {
        setErrors(null); // Сброс ошибок валидации
        setSuccess(true); // Установка состояния успешной регистрации
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        {success ? (
          <Alert variant="success">
            Регистрация прошла успешно!
          </Alert>
        ) : (
          <Form onSubmit={onSubmit}>
            <h1 className="title">Signup for Free</h1>
            {errors && (
              <Alert variant="danger">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </Alert>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Имя</Form.Label>
              <Form.Control type="text" ref={nameRef} placeholder="Name" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control type="text" ref={surnameRef} placeholder="Surname" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} placeholder="Email Address" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Password" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Потверждение пароля</Form.Label>
              <Form.Control type="password" ref={passwordConfirmationRef} placeholder="Repeat Password" required />
            </Form.Group>
            <Button type="submit" block="true" variant="primary">Signup</Button>
          </Form>
        )}
      </div>
    </div>
  );
}
