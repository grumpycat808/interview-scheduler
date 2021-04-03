export function getAppointmentsForDay(state, day) {
    //... returns an array of appointments for that day
    const aptIds = state.days.filter((weekDay) => weekDay.name === day);
    
    return state.appointments.filter((apt) => aptIds[0].appointments.includes(apt.id));
    
}

export function getInterview(state, interview) {
  if(!interview) return null;
  const interviewer = state.interviewers.filter((intPerson) => interview.interviewer === intPerson.id);

  return {...interview, interviewer: interviewer[0]};
}