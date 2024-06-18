
const Total = (props) => {

  const initialValue = 0;
  const sumWithInitial = props.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    initialValue,
  );

  return (
    <strong>Number of exercises {sumWithInitial}</strong>
  )
}

export default Total