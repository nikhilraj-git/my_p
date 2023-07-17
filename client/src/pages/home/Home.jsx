import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
import FeaturedHome from "../../components/featured/FeaturedHome";


const Home = ({type}) => {

  
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  //axios = axios.create({ baseURL: "/" });


  useEffect(() => {
    
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `/lists`,
          {
            headers: {
              token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
        //console.log("List for home------",lists);

        
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  
  }, [type]);

  return (
    <div className="home">
      <Navbar />
      <FeaturedHome type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;