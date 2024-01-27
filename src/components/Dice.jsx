import React from "react"

export default function Die(props) {
    return (
        <button aria-label="dice" className="dice" onClick={props.holdDie} style={{backgroundColor: props.held ? '#4FBCAA' : 'whitesmoke'}}>
            {props.value}
            {props.held}
        </button>
    )
}