import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './PatientDetail.css'; 

const PatientDetail = ({ role }) => {
  
  const initialData = {
    name: 'Juan',
    lastName: 'Perez',
    medicalInfo: {
      bloodType: 'O+',
      documentNumber: '123456789',
      familyPhone: '555-1234',
      allergies: 'Ninguna',
      medications: 'Ibuprofeno',
      medicalHistory: 'Diabetes tipo 2',
    },
    status: {
      ate: null,
      meal: '',
      mealTime: '',
      medicationsGiven: '',
      attendedActivity: null,
      activityDescription: '',
      activityTime: '',
    },
    visitHistory: [
      { date: '2023-10-01', time: '10:00 AM' },
      { date: '2023-10-02', time: '02:00 PM' },
    ],
  };

  const [patientData, setPatientData] = useState(initialData); 
  const [appointment, setAppointment] = useState({ datetime: '' });

  const handleStatusChange = (ate) => {
    const updatedData = { ...patientData, status: { ...patientData.status, ate } };
    setPatientData(updatedData);
  };

  const handleActivityChange = (attendedActivity) => {
    const updatedData = { 
      ...patientData, 
      status: {
        ...patientData.status,
        attendedActivity,
        activityDescription: attendedActivity ? patientData.status.activityDescription : '',
      },
    };
    setPatientData(updatedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...patientData, status: { ...patientData.status, [name]: value } };
    setPatientData(updatedData);
  };

  const handleSave = () => {
    alert('Datos guardados correctamente.'); 
  };

  const handleAppointmentChange = (e) => {
    const { value } = e.target;
    setAppointment({ datetime: value }); 
  };

  const handleAppointmentSubmit = () => {
    if (appointment.datetime) {
      const date = new Date(appointment.datetime);
      const formattedDate = date.toLocaleDateString(); 
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
      alert(`Cita agendada para el ${formattedDate} y a las ${formattedTime}`); 
    } else {
      alert('Por favor, selecciona una fecha y hora válidas.');
    }
  };

  return (
    <div className="container">
      <h1>Detalles de Paciente</h1>
      <div className="profile-picture-container">
        <img src="/perfil.jpg" alt="Perfil" className="profile-picture" />
      </div>
      <h2>
        Paciente: {patientData.name} {patientData.lastName} CC: {patientData.medicalInfo.documentNumber}
      </h2>

      <Tabs>
        <TabList>
          <Tab>Datos Médicos</Tab>
          <Tab>Estado</Tab>
          <Tab>Historial de Visitas</Tab>
          {role === 'Visitante' && <Tab>Agendar Cita</Tab>}
        </TabList>

        <TabPanel>
          <h2>Datos Médicos</h2>
          <p>Tipo de Sangre: {patientData.medicalInfo.bloodType}</p>
          <p>Teléfono Familiar: {patientData.medicalInfo.familyPhone}</p>
          <p>Alérgias: {patientData.medicalInfo.allergies}</p>
          <p>Medicamentos: {patientData.medicalInfo.medications}</p>
          <p>Historial Médico: {patientData.medicalInfo.medicalHistory}</p>
        </TabPanel>

        <TabPanel>
          <h2>Estado</h2>
          <div>
            <p>¿Comió?</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="ate"
                  value="Sí"
                  className="radio-input"
                  checked={patientData.status.ate === 'Sí'}
                  onChange={() => handleStatusChange('Sí')}
                  disabled={role === 'Visitante'} 
                />
                <span className="radio-label">
                  <span className="radio-inner-circle"></span> Sí
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="ate"
                  value="No"
                  className="radio-input"
                  checked={patientData.status.ate === 'No'}
                  onChange={() => handleStatusChange('No')}
                  disabled={role === 'Visitante'} 
                />
                <span className="radio-label">
                  <span className="radio-inner-circle"></span> No
                </span>
              </label>
            </div>
            <br />
            <label>¿Qué comió?</label>
            <input
              type="text"
              name="meal"
              value={patientData.status.meal}
              onChange={handleInputChange}
              className="input" // Clase agregada
              disabled={patientData.status.ate !== 'Sí' || role === 'Visitante'} 
            />
            <br />
            <label>Hora de Comida:</label>
            <input
              type="time"
              name="mealTime"
              value={patientData.status.mealTime}
              onChange={handleInputChange}
              className="input" // Clase agregada
              disabled={patientData.status.ate !== 'Sí' || role === 'Visitante'} 
            />
          </div>
          <br />
          <div>
            <label>Medicamentos suministrados:</label>
            <input
              type="text"
              name="medicationsGiven"
              value={patientData.status.medicationsGiven}
              onChange={handleInputChange}
              className="input" // Clase agregada
              disabled={role === 'Visitante'} 
            />
            <label>Hora de Medicamento:</label>
            <input
              type="time"
              name="medicationTime"
              value={patientData.status.medicationTime}
              onChange={handleInputChange}
              className="input" // Clase agregada
              disabled={role === 'Visitante'} 
            />
          </div>
          <br />
          <div>
            <p>¿Participó en una actividad?</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="attendedActivity"
                  value="Sí"
                  className="radio-input"
                  checked={patientData.status.attendedActivity === 'Sí'}
                  onChange={() => handleActivityChange('Sí')}
                  disabled={role === 'Visitante'} 
                />
                <span className="radio-label">
                  <span className="radio-inner-circle"></span> Sí
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="attendedActivity"
                  value="No"
                  className="radio-input"
                  checked={patientData.status.attendedActivity === 'No'}
                  onChange={() => handleActivityChange('No')}
                  disabled={role === 'Visitante'} 
                />
                <span className="radio-label">
                  <span className="radio-inner-circle"></span> No
                </span>
              </label>
            </div>
            <br />
            <label>¿Qué actividad fue?</label>
            <input
              type="text"
              name="activityDescription"
              value={patientData.status.activityDescription}
              onChange={handleInputChange}
              className="input" // Clase agregada
              disabled={patientData.status.attendedActivity !== 'Sí' || role === 'Visitante'} 
            />
            <br />
            <label>Hora de Actividad:</label>
            <input
              type="time"
              name="activityTime"
              value={patientData.status.activityTime}
              onChange={handleInputChange}
              className="input" // Clase agregada
              disabled={patientData.status.attendedActivity !== 'Sí' || role === 'Visitante'} 
            />
          </div>
          <button onClick={handleSave} disabled={role === 'Visitante'}>Guardar Estado</button>
        </TabPanel>

        <TabPanel>
          <h2>Historial de Visitas</h2>
          <ul>
            {patientData.visitHistory.map((visit, index) => (
              <li key={index}>
                {visit.date} - {visit.time}
              </li>
            ))}
          </ul>
        </TabPanel>

        {role === 'Visitante' && (
          <TabPanel>
            <h2>Agendar Cita</h2>
            <div>
              <label>Seleccione la fecha y hora de la visita:</label>
              <input 
                type="datetime-local" 
                name="datetime" 
                value={appointment.datetime} 
                onChange={handleAppointmentChange} 
              />
            </div>
            <button onClick={handleAppointmentSubmit}>Agendar Cita</button>
          </TabPanel>
        )}
      </Tabs>
    </div>
  );
};

export default PatientDetail;
