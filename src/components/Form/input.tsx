import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
// import { Container } from './styles';

type Props = {
  name: string;
};

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input = ({ name, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  console.log(inputRef.current);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <input ref={inputRef} placeholder={defaultValue} {...rest} />
      {error && <span style={{ color: '#f00' }}>{error}</span>}
    </div>
  );
};

export default Input;
