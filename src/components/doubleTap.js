import React, { useState } from 'react'
import {TouchableOpacity} from 'react-native'

function DoubleTap(props) {

    const [timer, setTimer] = useState(0)

    function onDoubleTap(){
        if(timer==0){
            toggleTimer()
        }else if(timer==1){
            setTimer(0)
            props.onDoubleTap()
        }else if(timer>1){
            setTimer(0)
            onDoubleTap()
        }
    }

    function toggleTimer() {
        let localTimer = timer

        let x = setInterval(()=> {
            localTimer++
            if(localTimer> 1){
                setTimer(0)
            }
            
        }, 300)
    }

    return(
        <TouchableOpacity onPress={()=> toggleTimer()} >
            
        </TouchableOpacity>
    )
}
