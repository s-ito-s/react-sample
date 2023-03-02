import { Link } from "react-router-dom";
import { Button } from "component-library-module";
import "./index.css";

function SampleComponentLibrary() {
  const onClick = () => {
    console.log("click!!!");
  };

  return (
    <div>
      <h1>Sample Component Library</h1>
      <div>
        <div className="btn-wrapper">
          <Button variant="primary" onClick={onClick}>
            Primary
          </Button>
        </div>
        <div className="btn-wrapper">
          <Button variant="secondary" onClick={onClick}>
            Secondary
          </Button>
        </div>
        <div className="btn-wrapper">
          <Button variant="tertiary" onClick={onClick}>
            Tertiary
          </Button>
        </div>
        <div className="btn-wrapper">
          <Button variant="destructive" onClick={onClick}>
            Destructive
          </Button>
        </div>
      </div>
      <div>
        <Link to={`/`}>back</Link>
      </div>
    </div>
  );
}

export default SampleComponentLibrary;
