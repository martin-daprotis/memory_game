import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Typography,
  TextField,
  Container,
  FormControl,
  Select,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import MainContext from "../MainContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { state, dispatch } = useContext(MainContext);
  const { count } = state;
  const [name, setName] = useState("");
  const [level, setLevel] = useState(count);
  let history = useHistory();

  const handleChange = (e) => {
    let givenName = e.target.value;
    setName(givenName);
    setUser(givenName);
  };

  const setUser = (givenName) => {
    let users = JSON.parse(Cookies.get("users"));
    users[givenName] = 0;
    Cookies.set("users", JSON.stringify(users));
  };

  const handleClick = () => {
    if (name.replace(/\s+/g, "") === "") {
      alert("ERROR: you must enter a name");
    } else {
      dispatch({ type: "SET_COUNTER", payload: parseInt(level) });
      history.push("/memory_game");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            val={name}
            onChange={handleChange}
          />
          <FormControl variant="outlined" className={classes.form}>
            <InputLabel htmlFor="level">Difficulty Level</InputLabel>
            <Select
              native
              autoWidth={true}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              label="Choose a level"
              inputProps={{
                name: "level",
              }}
            >
              <option aria-label="None" value="" />
              <option value={20}>20 Pokemons</option>
              <option value={30}>30 Pokemons</option>
              <option value={40}>40 Pokemons</option>
              <option value={30}>60 Pokemons</option>
              <option value={40}>80 Pokemons</option>
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClick}
            style={{ marginTop: "10px" }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
