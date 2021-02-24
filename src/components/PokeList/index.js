import React, { useEffect, useState, useContext, useMemo } from "react";
import MainContext from "../MainContext";
import Card from "../Card";
import { Grid } from "@material-ui/core";
import axios from "axios";

const PokeList = ({ ...props }) => {
  const { state } = useContext(MainContext);
  const { count } = state;
  const [pokemons, setPokemons] = useState([]);

  const getPokemonsData = async (result) => {
    const req = await axios.get(result.url);
    const image =
      req.data.sprites.other["official-artwork"].front_default || false;
    if (req.status === 200 && req.data && image) {
      return { title: result.name, image };
    } else {
      return null;
    }
  };
  const shuffle = (list) => list.sort(() => Math.random() - 0.5);
  const purge = (list) => list.filter((p) => p);
  const duplicate = (list) => [...list, ...list];

  useEffect(() => {
    const request = async () => {
      const req = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${count}`
      );
      if (req.status === 200 && req.data) {
        let pokeList = await Promise.all(
          req.data.results.map((r) => getPokemonsData(r))
        );
        pokeList = purge(pokeList).slice(0, count / 2);
        pokeList = duplicate(pokeList);
        pokeList = shuffle(pokeList);
        setPokemons(pokeList);
      }
    };
    request();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      {pokemons &&
        pokemons.map((p, i) => (
          <Grid item xs={2} key={i}>
            <Card title={p.title} image={p.image} index={i} />
          </Grid>
        ))}
    </Grid>
  );
};

export default PokeList;
