import React, { useEffect, useState } from "react"
import Die from "./Dice"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import "/src/styles/style.css"

export default function App() {

    const [tenzies, checkGame] = useState(false);
    const [dieNums, setDie] = useState(genNum);


    useEffect(() => {
        let held = false;
        let match = false;
        
        for (let i = 0; i < dieNums.length; i++) {
            if (dieNums[i].isHeld === false) {
                held = false;
                break;
            }
            else {
                held = true;
            }
        }

        for (let i = 0; i < dieNums.length - 1; i++) {
            if (dieNums[i].value === dieNums[i + 1].value) {
                match = true;
            }
            else {
                match = false;
                break;
            }
        }

        if (held && match) {
            checkGame(true);
        }
    }, [dieNums])

    //Generate random numbers and ID for dice
    function genNum() {
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

    //Checks if dice is being held, new dice is returned if held proeprty is false
    function rollDice() {
        const newDie = genNum();
        setDie(prevDice => prevDice.map(die => {
            return die.isHeld === true ? 
                die
                : newDie.pop();
        }))

        if (tenzies) {
            setDie(genNum);
            checkGame(false);
        }
    }

    //Sets held property of die to true when clicked
    function holdDie(diceId) {
        setDie(prevDice => prevDice.map(die => {
            return die.id === diceId ? 
                {
                    ...die,
                    isHeld: !die.isHeld
                } 
                : die;
        }))
    }

    //Generates array of dice
    const theDice = dieNums.map((aDie) => {
        return (
            <Die value={aDie.value} held={aDie.isHeld} key={aDie.id} holdDie={() => holdDie(aDie.id)}/>
        )
    })

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to 
            freeze it at its current value between rolls.</p>
            <div className="holder">
                {theDice}
                {tenzies && <Confetti />}
            </div>
            <button className="roll" onClick={rollDice} aria-label={tenzies === true ? 'Set New Game' : 'Roll Dice'}>{tenzies === true ? 'New Game' : 'Roll'}</button>
        </main>
    )
}