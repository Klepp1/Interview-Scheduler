import React from 'react';
import DayListItem from "./DayListItem";
export default function DayList(props) {
  // map through the days and pass the props to the daylistitem so we can show all the days
  const dayData = props.days.map((data) => {
    return (
      <DayListItem
      key={data.id}
      name={data.name} 
      spots={data.spots} 
      selected={data.name === props.value}
      setDay={props.onChange} 
      />
    );
  });
  return (
    <ul>
      {dayData}
    </ul>
  );
}