import Prompt from "./Prompt";
import Audio from "./Audio";
import ReflectionTextEntry from "./ReflectionTextEntry";

function ReflectionArea() {
  // Get reflection info and pass it to components
  return (
    <div>
      <Prompt />
      <Audio />
      <ReflectionTextEntry />
    </div>
  );
}

export default ReflectionArea;