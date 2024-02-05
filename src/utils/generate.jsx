import React from "react"
import { nanoid } from "nanoid"

//Generate random numbers and ID for dice
export default function genNum() {
    const numArray = [];
    for (let i = 0; i < 10; i++) {
        const ranNum = Math.ceil(Math.random() * 6);
        const thisDice = {
            value: ranNum, 
            isHeld: false,
            id: nanoid()
        };
        numArray.push(thisDice);
    }
    return numArray;
}