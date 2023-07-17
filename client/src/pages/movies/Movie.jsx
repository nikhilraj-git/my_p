import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";

const Movie = ({ type }) => {
  console.log("Movie component is called");
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const ans = [];

  //axios = axios.create({ baseURL: "/" });

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `/lists?type=Movies`,
          {
            headers: {
              token:
                "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        {
          res.data.map((item) => {
            if (item.type === "Movies") {
              ans.push(item);
            }
          })
        }
        console.log("Movie")
        setLists(ans);

      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();


  }, []);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type}/>
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );

}

export default Movie;