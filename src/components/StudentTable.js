import React from 'react';

const StudentTable = ({ students }) => {
  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Fecha de Nacimiento</th>
            <th>Edad</th>
            <th>Programa</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.nombre}</td>
              <td>{student.correo}</td>
              <td>{student.fechaNacimiento}</td>
              <td>{student.edad}</td>
              <td>{student.programa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;



