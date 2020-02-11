import React from "react";
import styled from "@emotion/styled";

// @ts-ignore
import pizza from "../../asset/image/1f32e.png";
// @ts-ignore
import burrito from "../../asset/image/1f32f.png";
// @ts-ignore
import fries from "../../asset/image/1f355.png";
// @ts-ignore
import taco from "../../asset/image/1f35f.png";

// @ts-ignore
import pizza64 from "../../asset/image/1f32e-64.png";
// @ts-ignore
import burrito64 from "../../asset/image/1f32f-64.png";
// @ts-ignore
import fries64 from "../../asset/image/1f355-64.png";
// @ts-ignore
import taco64 from "../../asset/image/1f35f-64.png";

export const food_image = {
  taco,
  fries,
  pizza,
  burrito
};
export const food_image_small = {
  taco: taco64,
  fries: fries64,
  pizza: pizza64,
  burrito: burrito64
};

export const FoodIcon = ({ food, ...props }) => (
  <Img {...props} alt={`${food} icon`} src={food_image[food]} />
);

const Img = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  object-position: center;
`;
