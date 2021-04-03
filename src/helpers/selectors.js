export function getAppointmentsForDay(state, day) {
    //... returns an array of appointments for that day
    if(state.days.length === 0) return [];
    const aptIds = state.days.filter((weekDay) => weekDay.name === day);
    if(aptIds.length === 0) return [];
    return state.appointments.filter((apt) => aptIds[0].appointments.includes(apt.id));
    
}

export function getInterview(state, interview) {
  if(!interview) return null;
  const interviewer = state.interviewers.filter((intPerson) => interview.interviewer === intPerson.id);

  return {...interview, interviewer: interviewer[0]};
}