import React, { useEffect, useState } from 'react';
import '../../App.css';
import { Collapse, Input , Divider, Button,Typography } from "antd";
import Item from './Item';
import { useSelector } from 'react-redux';
import { round } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { routes } from '../../const';

export default function Checklist({ data }) {
    // data is an array of category objects

    const { Title } = Typography;

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
        <div class="relative w-full h-full">  
            <Collapse accordion defaultActiveKey='1'  className="site-collapse-custom-collapse">
                {data.map((category, cIndex) => {    
                    let indexes = { 'category': cIndex }
                    // console.log(cIndex);
                    // console.log(`Category score for ${category.category} is ${category.score}`)
                    let score = checklist ? round(checklist[cIndex].score, 1): 0; 

                    return (<Panel header={category.category} key={cIndex + 1} className="font-semibold">
                            <Collapse accordion defaultActiveKey="1"  className="site-collapse-custom-collapse">
                                {   
                                    category.subcategories.map((subcategory, sIndex) => {
                                        // console.log('Subcat: ' + sIndex);
                                        indexes['subcategory'] = sIndex
                                        // console.log(indexes);
                                        return <Panel header={subcategory.subcategory} key={sIndex+1} >
                                            {/* <LineItem lineItems={subcategory.lineItems}/> */}
                                            {/* {console.log(indexes)} */}
                                            <Item items={subcategory.lineItems} cIndex={cIndex} sIndex={sIndex} />
                                        </Panel>
                                        // return <Subcategory key={index} index={index} subcategory={subcategory} />
                                    })
                                }
                            </Collapse>
                    
                            <Title level={5} className="pt-5 text-right">Score: {score}/{category.weightage}%</Title>
                        </Panel>
                    )}
                )}
            </Collapse>
            
            <div className="pt-5">
                <TextArea placeholder="Remarks" allowClear onChange={onChange} />
            </div> 

            <Divider />
            
            <Title level={4} className="text-right ">Total: {round(total, 1)}/100%</Title>
            
            <Link to={routes.PHOTOS} class="absolute bottom-0 right-0">
                <Button type="primary" >Next</Button>
            </Link>  
        </div>
    )
}
