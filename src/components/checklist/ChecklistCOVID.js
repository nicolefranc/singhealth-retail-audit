import '../../App.css';
import { Collapse, Divider,List,Input } from 'antd';
import React from 'react';
import {dataCOVID} from './ChecklistData';

export default function ChecklistCOVID() {
    
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

    return(
        <>
           <h2>COVID SAFE MANAGEMENT MEASURES COMPLIANCE CHECKLIST GUIDE</h2> 

           <Divider />

            <div>
                <Collapse accordion defaultActiveKey="1">

                    <Panel header="Part 1: Safe Management Measures for Front-of-house" key="1">
                        <List
                            dataSource={dataCOVID.data1}
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

                    <Panel header="Part 2: Staff Hygiene & Safe Management Measures" key="2">
                        <List
                            dataSource={dataCOVID.data2}
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


