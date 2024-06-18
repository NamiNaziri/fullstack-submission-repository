
import Part from "./Part"

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const Content = (props) => {
  
  return (
    <>
    {props.parts.map(part => <Part key={getRandomInt(200000000)}  part={part} />)}
    </>
  )
}

export default Content