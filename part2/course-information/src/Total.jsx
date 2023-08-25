const Total = ({ parts }) => {
  const total = parts.reduce((acc, obj) => acc + obj.exercises, 0);

  return <div style={{ fontWeight: "bold" }}>Total of {total} exercises</div>;
};

export default Total;
