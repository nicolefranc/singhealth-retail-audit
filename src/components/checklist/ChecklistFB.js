import '../../App.css';
import { Collapse, Divider,List,Input } from 'antd';
import React from 'react';
import {dataFB} from './ChecklistData';
import fnb from '../../data/report';
import LineItem from './LineItem';
import Subcategory from './Subcategory';
import Checklist from './Checklist';

export default function ChecklistFB({ data }) {
    console.log(fnb);
    //FOR DROPDOWN
    const { Panel } = Collapse; 

    //FOR CHECKBOX:
    const updateInput = (ref, checked) => {
        const input = ref.current;
        if (input) {
            input.checked = checked;
            input.indeterminate = checked == null;
        }
    };

    const ThreeStateCheckbox = ({name, checked, onChange}) => {
        const inputRef = React.useRef(null);
        const checkedRef = React.useRef(checked);
        React.useEffect(() => {
            checkedRef.current = checked;
            updateInput(inputRef, checked);
        }, [checked]);
        const handleClick = () => {
            switch (checkedRef.current) {
                case false:
                    checkedRef.current = null;
                    break;
                case null:
                    checkedRef.current = true;
                    break;
                default: // true
                    checkedRef.current = false;
                break;
          }
          updateInput(inputRef, checkedRef.current);
          if (onChange) {
            onChange(checkedRef.current);
          }
        };
        return (
            <input 
            ref={inputRef}
            type="checkbox"
            name={name}
            onClick={handleClick} />
        );
    };

    const [checked, setChecked] = React.useState(true);
    const handleChange = (checked) => {
        console.log(`checked: ${checked}`);
    };

    //FOR REMARKS INPUT BOX
    const { TextArea } = Input;

    const onChange = e => {
    console.log(e);
    };

    console.log(fnb[0]);

    return(
        <>
            <h2>Audit Checklist (F&B)</h2> 

            <Divider />  
            <div>
                <Checklist data={fnb} />
                {/* <Collapse accordion defaultActiveKey="1">

                    <Panel header="1. Professionalism & Staff Hygiene (10%)" key="1">

                        <Collapse accordion defaultActiveKey="1">
                            <Subcategory subcategory={fnb[0]['subcategories'][0]} />
                            {
                                fnb[0].subcategories.map((subcategory, index) => {
                                    console.log(index);
                                    return <Panel header={subcategory.subcategory} key={index+1}>
                                        <LineItem lineItems={subcategory.lineItems} />
                                    </Panel>
                                })
                            }

                            <Panel header="Staff Hygiene" key="2">
                                <LineItem lineItems={fnb[0].subcategories[1].lineItems} />
                            </Panel>
                        </Collapse>
  
                    </Panel>

                    <Panel header="2. Housekeeping & General Cleanliness (20%)" key="2">
                        <Collapse accordion defaultActiveKey="1">

                            <Panel header="General Environment Cleanliness" key="1">
                                <List
                                    dataSource={dataFB.data2_1}
                                    renderItem={item => (
                                        <List.Item>
                                            {item}
                                            <ThreeStateCheckbox checked={checked} onChange={handleChange}>
                                                {item}
                                            </ThreeStateCheckbox>
                                        </List.Item>
                                    )}
                                />
                            </Panel>
                            <Panel header="Hand Hygiene Facilities" key="2">
                                <List
                                    dataSource={dataFB.data2_2}
                                    renderItem={item => (
                                        <List.Item>
                                            {item}
                                            <ThreeStateCheckbox checked={checked} onChange={handleChange}>
                                                {item}
                                            </ThreeStateCheckbox>
                                        </List.Item>
                                    )}
                                />
                            </Panel>

                        </Collapse>
                    </Panel>
                    
                    <Panel header="3. Food Hygiene (35%)" key="3">
                        
                        <Collapse accordion defaultActiveKey="1">
                            <Panel header="Storage & Preparation of Food" key="1">
                                <List
                                    dataSource={dataFB.data3_1}
                                    renderItem={item => (
                                        <List.Item>
                                            {item}
                                            <ThreeStateCheckbox checked={checked} onChange={handleChange}>
                                                {item}
                                            </ThreeStateCheckbox>
                                        </List.Item>
                                    )}
                                />
                            </Panel>

                            <Panel header="Storage of Food in Refrigerator/Warmer" key="2">
                                <List
                                    dataSource={dataFB.data3_2}
                                    renderItem={item => (
                                        <List.Item>
                                            {item}
                                            <ThreeStateCheckbox checked={checked} onChange={handleChange}>
                                                {item}
                                            </ThreeStateCheckbox>
                                        </List.Item>
                                    )}
                                />
                            </Panel>
                        </Collapse>

                    </Panel>

                    <Panel header="4. Healthier Choice in line with HPB’s Healthy Eating’s Initiative (15%)" key="4">
                        
                        <Collapse accordion defaultActiveKey="1">
                            <Panel header="Food" key="1">
                                <List
                                    dataSource={dataFB.data4_1}
                                    renderItem={item => (
                                        <List.Item>
                                            {item}
                                            <ThreeStateCheckbox checked={checked} onChange={handleChange}>
                                                {item}
                                            </ThreeStateCheckbox>
                                        </List.Item>
                                    )}
                                />
                            </Panel>

                            <Panel header="Beverage" key="2">
                                <List
                                    dataSource={dataFB.data4_2}
                                    renderItem={item => (
                                        <List.Item>
                                            {item}
                                            <ThreeStateCheckbox checked={checked} onChange={handleChange}>
                                                {item}
                                            </ThreeStateCheckbox>
                                        </List.Item>
                                    )}
                                />
                            </Panel>
                        </Collapse>

                    </Panel>

                    <Panel header="5. Workplace Safety & Health (20%)" key="5">
                        
                        <Collapse accordion defaultActiveKey="1">
                            <Panel header="General Safety" key="1">
                                <List
                                    dataSource={dataFB.data5_1}
                                    renderItem={item => (
                                        <List.Item>
                                            {item}
                                            <ThreeStateCheckbox checked={checked} onChange={handleChange}>
                                                {item}
                                            </ThreeStateCheckbox>
                                        </List.Item>
                                    )}
                                />
                            </Panel>

                            <Panel header="Fire & Emergency Safety" key="2">
                                <List
                                    dataSource={dataFB.data5_2}
                                    renderItem={item => (
                                        <List.Item>
                                            {item}
                                            <ThreeStateCheckbox checked={checked} onChange={handleChange}>
                                                {item}
                                            </ThreeStateCheckbox>
                                        </List.Item>
                                    )}
                                />
                            </Panel>

                            <Panel header="Electrical Safety" key="3">
                                <List
                                    dataSource={dataFB.data5_3}
                                    renderItem={item => (
                                        <List.Item>
                                            {item}
                                            <ThreeStateCheckbox checked={checked} onChange={handleChange}>
                                                {item}
                                            </ThreeStateCheckbox>
                                        </List.Item>
                                    )}
                                />
                            </Panel>
                        </Collapse>

                    </Panel>

                </Collapse> */}
            </div>
                                
            <div class="padding-top">
                <TextArea placeholder="Remarks" allowClear onChange={onChange} />
            </div>    
            
            <Divider />

            <div class="row">
                <div class="">Professionalism & Staff Hygiene</div>
                <div class="">__/10%</div>
            </div>
            <div class="row">
                <div class="">Housekeeping & General Cleanliness</div>
                <div class="">__/20%</div>
            </div>
            <div class="row">
                <div class="">Food Hygiene</div>
                <div class="">__/35%</div>
            </div>
            <div class="row">
                <div class="">Healthier Choice in line with HPB’s Healthy Eating’s Initiative</div>
                <div class="">__/15%</div>
            </div>
            <div class="row">
                <div class="">Workplace Safety & Health</div>
                <div class="">__/20%</div>
            </div>
            <div class="row">
                <div class="">Total</div>
                <div class="">__/100%</div>
            </div>
        </>
        
    
        
    )

}


