import { useNavigate } from "react-router-dom";
import "./Home.css";
//components
import Button from "../../components/button";
//assets
import Character from "../../assets/character-min.png";

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/quiz"); // Replace '/new-route' with the route you want to navigate to
  };

  return (
    <div className="home">
      <div className="home_container">
        <p className="home__text">You set the mood</p>
        <p className="home__text">We provide the movie</p>
      </div>
      <Button
        text="Start"
        onClick={handleButtonClick}
        className={"button_start"}
      ></Button>
      <img src={Character} className="character"></img>
    </div>
  );
};

export default Home;
