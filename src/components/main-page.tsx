import axios from "axios";
import React from "react";
import { Player } from "../types/Player";



const MainPage = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [players, setPlayers] = React.useState<Player[]>([])

  React.useEffect(() => {
    const getPlayers = async () => {
      try {
        const { data } = await axios.get("/players");
        setPlayers(data); // Update state with fetched players
      } catch (error) {
        console.error("Error fetching players:", error);
      }
      finally {
        setIsLoading(false)
      }
    };

    getPlayers();
  }, []); // Empty dependency array to run effect only once

  return (
    <>
      <h1>Envite futbol</h1>

      {isLoading && <p>Cargando...</p>}

      <ul>
        {Array.isArray(players) && players.map(({ fullName, id }) => ( // Destructure name from player object
          <li key={id}>{fullName}</li>
        )
        )}
      </ul>
    </>
  );
};

export default MainPage;

