import DayList from "components/DayList"
import "components/Application.scss";
import "components/Appointments"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "components/Appointments";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
    .then(function (response) {
      // handle success
      console.log(response.data);
      setDays(response.data);

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])
  const appointments = props.appointments.map((apt) => {
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
          days={days}
          day={day}
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
