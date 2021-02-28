import '../../App.css';
import { Collapse, Divider,List,Input } from 'antd';
import React from 'react';
import {dataNonFB} from './ChecklistData';
// import {ThreeStateCheckbox} from './Checkbox';

export default function ChecklistNonFB() {
    
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
           <h2>Audit Checklist (Non-F&B)</h2> 

           <Divider />

            <div>
                <Collapse accordion defaultActiveKey="1">

                    <Panel header="1. Professionalism & Staff Hygiene (20%)" key="1">

                        <Collapse accordion defaultActiveKey="1">
                            <Panel header="Professionalism" key="1">
                                <List
                                    dataSource={dataNonFB.data1_1}
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

                            <Panel header="Staff Hygiene" key="2">
                                <List
                                    dataSource={dataNonFB.data1_2}
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

                    <Panel header="2. Housekeeping & General Cleanliness (40%)" key="2">
                        <Collapse accordion defaultActiveKey="1">
                            <Panel header="General Environment Cleanliness" key="1">
                                <List
                                    dataSource={dataNonFB.data2_1}
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

                    <Panel header="3. Workplace Safety & Health (40%)" key="3">
                        
                        <Collapse accordion defaultActiveKey="1">
                            <Panel header="General Safety" key="1">
                                <List
                                    dataSource={dataNonFB.data3_1}
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
                                    dataSource={dataNonFB.data3_2}
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
                                    dataSource={dataNonFB.data3_3}
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

                </Collapse>
            </div>

            <div class="padding-top">
                <TextArea placeholder="Remarks" allowClear onChange={onChange} />
            </div>
            
            <Divider />

            <div class="row">
                <div class="">Professionalism & Staff Hygiene</div>
                <div class="">__/20%</div>
            </div>
            <div class="row">
                <div class="">Housekeeping & General Cleanliness</div>
                <div class="">__/40%</div>
            </div>
            <div class="row">
                <div class="">Workplace Safety & Health</div>
                <div class="">__/40%</div>
            </div>
            <div class="row">
                <div class="">Total</div>
                <div class="">__/100%</div>
            </div>
        </>
        
    
        
    )

}


