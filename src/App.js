import React, { useEffect, useState } from 'react';
import './styles/StudentForm.css';
import './styles/StudentTable.css';

import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const response = await fetch('http://localhost:8080/api/estudiantes');
    const data = await response.json();
    setStudents(data);
  };

  const addStudent = async (student) => {
    await fetch('http://localhost:8080/api/estudiantes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="App">
      <h1>Gestión de Estudiantes</h1>
      <StudentForm onSubmit={addStudent} />
      <StudentTable students={students} />
    </div>
  );
}

export default App;


