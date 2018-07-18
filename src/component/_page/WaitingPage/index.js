import React from 'react'
import { food_image, FoodIcon } from '../../FoodIcon'
import styled, { keyframes } from 'react-emotion'

export const WaitingPage = ({ connected, events, location, ...props }) => (
  <Container>
    <Center>
      {Object.keys(food_image).map((food, i) => (
        <Ball key={food} food={food} i={i} />
      ))}
    </Center>
  </Container>
)

const rotateAnim = Array.from(Object.keys(food_image)).map((_, i, arr) => {
  const frames = Array.from({ length: 20 })
    .map((_, j, arr2) => {
      const a = i / arr.length
      const b = j / (arr2.length - 1)

      const phy = (a + b) * Math.PI * 2
      const A = 50

      // const s = (1 + Math.sin(a + b + 123)) * 1
      const k = (b + a + 0.75) % 1
      const s = 0.2 + Math.abs(k - 0.5) * 2.8

      const fl = x => Math.round(x * 100) / 100

      return [
        Math.round(b * 100) + '%',
        '{',
        'transform:',
        `translate3d(${fl(Math.cos(phy) * A)}px,${fl(Math.sin(phy) * A)}px,0)`,
        `scale(${s},${s})`,
        '}',
      ].join(' ')
    })
    .join('\n')

  return keyframes`${frames}`
})

const Ball = styled(FoodIcon)`
  width: 50px;
  height: 50px;
  position: absolute;
  transform-origin: center;
  animation: ${props => rotateAnim[props.i]} 1500ms infinite;
  z-index: 2;
`

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  display: column;
  align-items: center;
  justify-content: center;
`
const Center = styled.div`
  width: 120px;
  height: 100px;
  display: flex;
  display: column;
  align-items: center;
  justify-content: center;
  border: solid 5px rgba(255, 255, 255, 0.5);
  border-radius: 50%;

  &:before {
    content: '';
    position: absolute;
    width: 140px;
    height: 120px;
    border: solid 5px rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }
  &:after {
    content: '';
    position: absolute;
    width: 98px;
    height: 80px;
    border: solid 3px rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }
`
