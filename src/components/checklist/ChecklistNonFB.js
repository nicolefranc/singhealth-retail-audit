import '../../App.css';
import { Divider} from 'antd';
import React from 'react';
import {nonFnb} from '../../data/report';
import Subcategory from './Subcategory';

export default function ChecklistNonFB() {
    console.log(nonFnb);

    const {Checklist} = require('./Checklist.js'); //import Checklist function

    return(
        <>
            <h2>Audit Checklist (Non-F&B)</h2> 

            <Divider />

            <Checklist data={nonFnb} />
        </>
    )
}
