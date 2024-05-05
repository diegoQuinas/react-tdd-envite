import axios from "axios";
import React from "react";
import { Player } from "../types/Player";



const MainPage = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [players, setPlayers] = React.useState<Player[]>([])
  const [divisionals, setDivisionals] = React.useState<string[]>([])


  React.useEffect(() => {
    const getPlayers = async () => {
      try {
        const { data } = await axios.get("/players");
        setPlayers(data); // Update state with fetched players
        getDivs();
      } catch (error) {
        console.error("Error fetching players:", error);
      }
      finally {
        setIsLoading(false)
      }
    };
    getPlayers();

  }, []); // Empty dependency array to run effect only once

  React.useEffect(() => {
    const getDivs = () => {
      let result: string[] = [];
      if (Array.isArray(players)) {
        players.forEach((player) => {
          if (!result.includes(player.divisional)) {
            result.push(player.divisional)
          }
        });
      }
      setDivisionals(result)
    }

    getDivs()
  }, [players])

  return (
    <>
      <h1>Envite futbol</h1>

      {isLoading && <p>Cargando...</p>}

      {Array.isArray(players) && divisionals.map((divisionalTitle) => (
        <div key={divisionalTitle}> {/* Añade una clave única para el fragmento */}
          <h2>Divisional {divisionalTitle}</h2>
          <ul>
            {players.map(({ fullName, id, divisional }) => (
              divisional === divisionalTitle && <li key={id}>{fullName}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default MainPage;

