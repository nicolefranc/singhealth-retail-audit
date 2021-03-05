import React from 'react';
import {csmc} from '../../data/report';

export default function ChecklistCOVID() {
    console.log(csmc); //covid safe management checklist

    const {ChecklistCovid} = require('./Checklist.js'); //import Checklist function

    return(
        <>
           <ChecklistCovid data={csmc} />
        </>
    )
}


