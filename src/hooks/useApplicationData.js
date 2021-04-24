
import React, { useState, useEffect } from "react";
import { updateSpotsRemaining } from "helpers/selectors"
import axios from "axios";

export default function useApplicationData() { 
    const [state, setState] = useState({
        day: "Monday",
        days: [],
       
        appointments: [],
        interviewers: []
    });

    useEffect(() => {

        Promise.all([
          axios.get('http://localhost:8001/api/days'),
          axios.get('http://localhost:8001/api/appointments'),
          axios.get('http://localhost:8001/api/interviewers')
        ])
        .then(function (response) {
          setState({...state, days: response[0].data, appointments: Object.values(response[1].data),
           interviewers: Object.values(response[2].data)})
        })
        .catch(function (error) {
          
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

        // const newDays = 
        return new Promise((resolve, reject) => {
          axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
          .then((res) => {
            const newDays = updateSpotsRemaining(state, id, true);
            const aptArr = Object.values(appointments);
            setState({...state, appointments:aptArr, days:newDays});
            //appointments.slice(2, 3);
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

            const newDays = updateSpotsRemaining(state, id, false);
            const aptArr = Object.values(appointments);
            setState({...state, appointments:aptArr, days: newDays});
            resolve(res);
          })
          .catch((err) => {
              console.log(err)
              reject(err)
            });
        })
      }
    const setDay = (dayName) => {
        setState({...state, day: dayName})
      }
    return {state, setDay, bookInterview, deleteInterview };
}