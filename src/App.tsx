import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Form } from '@unform/web';
import { Scope, SubmitHandler, FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from './components/Form/input';

const initialData = {
  email: 'david@rocketseat.com.br',
};
type FormData = {
  data: DataTypes;
};
type DataTypes = {
  name: string;
  email: string;
  password: string;
  address: {
    street: string;
    city: string;
    number: number;
  };
};
function App() {
  const [user, setUser] = useState({});
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<FormData> = async (data, { reset }) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required('O nome é obrigatorio')
          .min(3, 'Precisa ser um nome valido'),
        email: Yup.string().required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(5, 'No minimo 5 caracteres')
            .required('A cidade é obrigatoria'),
        }),
      });
      // if (data.name === '') {
      //   formRef.current?.setFieldError('name', 'O nome é obrigatorio');
      // }
      // if (data.email === '') {
      //   formRef.current?.setFieldError('email', 'digite outro email');
      // }

      await schema.validate(data, {
        abortEarly: false,
      });
      console.log(data);
      formRef.current?.setErrors({});
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages: any = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current?.setErrors(errorMessages);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      formRef.current?.setData({
        name: 'David dos Santos',
        email: 'david@pereira-16',
      });
    }, 2000);
  }, []);
  return (
    <div className="App">
      <h1>Hello world</h1>
      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        <Input type="password" name="password" />
        <Scope path="addres">
          <Input name="street" />
          <Input name="city" />
          <Input name="number" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
