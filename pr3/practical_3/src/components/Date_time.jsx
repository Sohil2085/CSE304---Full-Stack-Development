import React, { useEffect, useState } from "react";
import './DateTime.css';


const DateTime = () => {
  const [time, setTime] = useState(new Date());

  const [dateInfo, setDateInfo] = useState({
    day: '',
    daynum: '',
    month: '',
    year: '',
  });

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const today = new Date();
    const dayWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ];
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];

    setDateInfo({
      day: dayWeek[today.getDay()],
      daynum: today.getDate(),
      month: months[today.getMonth()],
      year: today.getFullYear(),
    });

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="container text-center">
      <h1 className="welcome-text mb-5">Welcome to CHARUSAT !!!!</h1>
      
      <div className="display-date mb-5">
        <span id="day">{dateInfo.day}</span>,
        <span id="daynum"> {dateInfo.daynum} </span>
        <span id="month">{dateInfo.month}</span>
        <span id="year"> {dateInfo.year}</span>
      </div>

      <div className="display-time mb-5">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default DateTime;
