import React from 'react';
import { Link } from 'react-router-dom';

const PatientList = () => {
  // Datos de ejemplo para pacientes
  const patients = [
    { id: 1, name: 'Juan Pérez' },
  ];

  return (
    <div>
      <h2>Lista de Pacientes</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            <Link to={`/patient/${patient.id}`}>{patient.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
