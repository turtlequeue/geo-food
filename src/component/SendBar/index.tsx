import React from "react";
import styled from "@emotion/styled/macro";
import { food_image_small, FoodIcon } from "../FoodIcon";

export const SendBar = ({ publish }) => (
  <Container>
    <GroupButton>
      {Object.keys(food_image_small).map((food:any) => (
        <FoodButton key={food} food={food} onClick={() => publish(food)} />
      ))}
    </GroupButton>
  </Container>
);

const FoodButton = styled(FoodIcon)`
  cursor: pointer;
  margin: 4px;

  transition: transform 240ms ease;

  &:hover {
    transform: scale(1.08, 1.08);
  }
  &:active {
    transition: none;
    transform: scale(0.94, 0.94);
  }
`;

const GroupButton = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  position: fixed;
  bottom: 16px;
  right: 0;
  left: 0;
  z-index: 10;
  padding: 4px;
`;
