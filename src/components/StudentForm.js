import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StudentForm = ({ onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [programa, setPrograma] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = {
      nombre,
      correo,
      fechaNacimiento,
      programa
    };
    onSubmit(student);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <br />
      <DatePicker
        selected={fechaNacimiento}
        onChange={(date) => setFechaNacimiento(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Fecha de Nacimiento"
      />
      <br />
      <input
        type="text"
        placeholder="Programa"
        value={programa}
        onChange={(e) => setPrograma(e.target.value)}
      />
      <br />
      <button type="submit">Agregar Estudiante</button>
    </form>
  );
};

export default StudentForm;


