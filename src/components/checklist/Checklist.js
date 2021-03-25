import React, { useEffect, useState } from 'react';
import '../../App.css';
import { Collapse, Input , Divider, Button } from "antd";
import Item from './Item';
import { useSelector } from 'react-redux';
import { round } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { routes } from '../../const';

export default function Checklist({ data }) {
    // data is an array of category objects

    //for dropdown
    const { Panel } = Collapse; 

    //for 'remarks' input box
    const { TextArea } = Input; 
    const checklist = useSelector(state => state.report.checklist);
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
        let scores = [];
        if (checklist) {
            let total = 0;
            scores = checklist.map(category => {
                total += category.score;
                return category.score
            });
            setTotal(total);
            // console.log(scores);

        }
    }, [checklist]);
    
    const onChange = e => {
        // console.log(e);
    };

    return (
        <>  
            <Collapse accordion defaultActiveKey='1' >
                {data.map((category, cIndex) => {    
                    let indexes = { 'category': cIndex }
                    // console.log(cIndex);
                    // console.log(`Category score for ${category.category} is ${category.score}`)
                    let score = checklist ? round(checklist[cIndex].score, 1): 0; 

                    return (<Panel header={category.category} key={cIndex + 1} className="bg-orange ">
                            <Collapse accordion defaultActiveKey="1" >
                                {   
                                    category.subcategories.map((subcategory, sIndex) => {
                                        // console.log('Subcat: ' + sIndex);
                                        indexes['subcategory'] = sIndex
                                        // console.log(indexes);
                                        return <Panel header={subcategory.subcategory} key={sIndex+1} className="bg-orange ">
                                            {/* <LineItem lineItems={subcategory.lineItems}/> */}
                                            {/* {console.log(indexes)} */}
                                            <Item items={subcategory.lineItems} cIndex={cIndex} sIndex={sIndex} />
                                        </Panel>
                                        // return <Subcategory key={index} index={index} subcategory={subcategory} />
                                    })
                                }
                            </Collapse>
                    
                            <div className="pt-10 font-bold text-right">Score: {score}/{category.weightage}%</div>
                        </Panel>
                    )}
                )}
            </Collapse>
            
            <div className="pt-20">
                <TextArea placeholder="Remarks" allowClear onChange={onChange} />
            </div> 

            <Divider />
            {
                <div className="font-bold text-right">Total: {round(total, 1)}/100%</div>
            }
            <Link to={routes.PHOTOS} >
                <Button className="float-right">Next</Button>
            </Link>  
        </>
    )
}
