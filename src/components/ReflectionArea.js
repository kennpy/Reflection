import Prompt from "./Prompt";
import Audio from "./Audio";
import FetchTemplateButton from "./FetchTemplateButton";
import ReflectionTextEntry from "./ReflectionTextEntry";

function ReflectionArea() {
  // Get reflection info and pass it to components
  return (
    <div className="reflectionArea">
      <FetchTemplateButton />
      <Prompt />
      <Audio />
      <ReflectionTextEntry />
    </div>
  );
}

export default ReflectionArea;
