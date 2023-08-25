import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  return (
    <div>
      {course.map((element) => (
        <>
          <Header text={element.name} />
          <Content parts={element.parts} />
        </>
      ))}
    </div>
  );
};

export default Course;
