import DayList from "components/DayList"
import "components/Application.scss";
import "components/Appointments"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "components/Appointments";
import {getAppointmentsForDay, getInterview} from "helpers/selectors"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: [],
    interviewers: []
  });

  // const dailyAppointments = [];
  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
    
    .then(function (response) {
      // handle success
      // console.log(response[0]);
      // console.log(Object.values(response[1].data));
      // console.log(response[2]);
      setState({...state, days: response[0].data, appointments: Object.values(response[1].data),
       interviewers: Object.values(response[2].data)})
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id-1],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id-1]: appointment
    };
    return new Promise((resolve, reject) => {
      axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        const aptArr = Object.values(appointments);
        setState({...state, appointments:aptArr});
        resolve(res);
      })
      .catch((err) => reject(err));
    })
  }

  function deleteInterview(id){
    return new Promise((resolve, reject) => {
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        const appointment = {
          ...state.appointments[id-1],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id-1]: appointment
        };
        const aptArr = Object.values(appointments);
        setState({...state, appointments:aptArr});
        resolve(res);
      })
      .catch((err) => reject(err));
    })
  }
  const appointments = getAppointmentsForDay(state, state.day).map((apt) => {
    const interview = getInterview(state, apt.interview);
    apt = {...apt, interview, interviewers:state.interviewers, bookInterview, deleteInterview, key:apt.id};
    return (
      <Appointment
        {...apt} 
        ></Appointment>
    );
  })

  const setDay = (dayName) => {
    setState({...state, day: dayName})
  }
  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
          
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointments}
      </section>
    </main>
  );
}
