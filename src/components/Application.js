import DayList from "components/DayList"
import "components/Application.scss";
import "components/Appointments"
import React, { useState, useEffect } from "react";

import Appointment from "components/Appointments";
import { getAppointmentsForDay, getInterview } from "helpers/selectors"
import useApplicationData from "hooks/useApplicationData"

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();
  
  const appointments = getAppointmentsForDay(state, state.day).map((apt) => {
    const interview = getInterview(state, apt.interview);
    apt = {...apt, interview, interviewers:state.interviewers, bookInterview, deleteInterview, key:apt.id};
    return (
      <Appointment
        {...apt} 
        ></Appointment>
    );
  })
  
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
