import React from 'react'
import './InputOption.css'

function InputOption({Icon,title,color}) {
    return (
        <div className="inputOption">
            <Icon style = {{color:color}}/>
            <span className="pl-2">{title}</span>
        </div>
    )
}

export default InputOption
