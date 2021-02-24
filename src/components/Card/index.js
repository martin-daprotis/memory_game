import React, { useState, useContext } from "react";
import MainContext from "../MainContext";
import { Card, Front, Back, CardContainer } from "./styles";

const CardComponent = ({ image, index, title, ...props }) => {
  const { state, dispatch } = useContext(MainContext);
  const { lastFlipped, arrayFlipped } = state;

  const addPair = () => {
    dispatch({ type: "ADD_PAIR" });
  };

  const setLastFlipped = () => {
    dispatch({
      type: "SET_LAST_FLIPPED",
      payload: { index, title, flipped: arrayFlipped[index] },
    });
  };

  const flipThisCard = () => {
    dispatch({
      type: "SET_FLIPPED",
      payload: { index, title, flipped: !arrayFlipped[index] },
    });
  };

  const flipPairOver = () => {
    setTimeout(() => {
      dispatch({
        type: "FLIP_PAIR",
        payload: { index, title, flipped: 1 },
      });
    }, 1000);
  };

  const handleClick = () => {
    if (arrayFlipped[index]) {
      flipThisCard();
      if (lastFlipped.index === -1) {
        setLastFlipped();
      } else {
        if (lastFlipped.title === title) {
          addPair();
        } else if (lastFlipped.title && lastFlipped.title !== title) {
          flipPairOver();
        }
      }
    }
  };

  return (
    <CardContainer onClick={handleClick}>
      <Card className={`${arrayFlipped[index] ? "flipped" : ""}`}>
        <Front image={image}>
          <h6>{title}</h6>
        </Front>
        <Back />
      </Card>
    </CardContainer>
  );
};

export default React.memo(CardComponent);
