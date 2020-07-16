import { HashRouterProps } from "react-router-dom";

//"2020-05-18T16:00:00Z"
interface ITimeTable {
  year: string
  month: string 
  day: string
  hours: string
  minutes: string
  seconds: string 
}

enum AMOrPM {
  AM,
  PM = 1
}

const getAMOrPM = (hours: string) => {
  if(Number(hours[0]) === 2){
    return AMOrPM.PM
  }
  if(Number(hours[0]) < 1){
    return AMOrPM.AM
  }
  else{
    if(Number(hours[1]) > 1)
      return AMOrPM.PM
    return AMOrPM.AM
  }
}

const NumberToHangeul = (enumParam: AMOrPM) => {
  if(enumParam){
    return "오후"
  } else {
    return "오전"
  }
}

const timeSlice = (raw: string) => {
  const [
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
  ] = raw.split(/[-=T:Z]/);

  return {
    year: year.slice(2,4),
    month,
    day,
    hours,
    minutes,
    seconds,
    AMOrPM: NumberToHangeul(getAMOrPM(hours)),
  };
}

export default timeSlice;