import React, { useEffect, useState } from "react"
import Die from "./Dice"
import Confetti from 'react-confetti'
import "/src/styles/style.css"
import genNum from "/src/utils/generate"

export default function App() {

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

    const [tenzies, setTenzie] = useState(false);
    const [dieNums, setDie] = useState(genNum);

    useEffect(() => {
        //Check if every die is currently hedl
        let held = dieNums.every(die => die.isHeld == true);

        let finNum = dieNums[0].value;
        //Checks if all die have the same value
        let match = dieNums.every(die => die.value == finNum);

        if (held && match) {
            setTenzie(true);
        }
    }, [dieNums])

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to 
            freeze it at its current value between rolls.</p>
            <div className="holder">
            {
                dieNums.map((aDie) => {
                    return (
                        <Die value={aDie.value} held={aDie.isHeld} key={aDie.id} holdDie={() => holdDie(aDie.id)}/>
                    )
                })
            }
            {tenzies && <Confetti />}
            </div>
            <button className="roll" onClick={rollDice} aria-label={tenzies === true ? 'Set New Game' : 'Roll Dice'}>{tenzies === true ? 'New Game' : 'Roll'}</button>
        </main>
    )
}