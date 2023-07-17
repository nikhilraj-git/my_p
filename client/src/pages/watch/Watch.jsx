import { ArrowBackOutlined } from "@material-ui/icons";
import "./watch.scss";
import {Link} from "react-router-dom";


export default function Watch() {
  return (
    <div className="watch">
      <Link to="/">
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
      </Link>
      <video
        className="video"
        autoPlay
        controls
        src="http://127.0.0.1:3000/pages/watch/video.mp4"
      />
    </div>
  );
}