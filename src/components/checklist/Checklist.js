import Title from "antd/lib/typography/Title";
import '../../App.css';
import { Collapse, Divider,List,Typography } from 'antd';
import React from 'react';

export default function Checklist() {
    //FOR LINE ITEMS:
    const { Panel } = Collapse;
    const data1_1 = [
        'Shop is open and ready to service patients/visitors according to operating hours.',
        'Staff Attendance: adequate staff for peak and non-peak hours.',
        'At least one (1) clearly assigned person in-charge on site.',
    ];
    const data1_2 = [
        'Staff uniform/attire is not soiled.',
        'Staff who are unfit for work due to illness should not report to work.',
        'Staff who are fit for work but suffering from the lingering effects of a cough and/or cold should cover their mouths with a surgical mask.',
    ];
    const data2_1=[
        'Adequate and regular pest control:\n-Pest control record.',
        'Goods and equipment are within shop boundary.',
        'Store display/ Shop front is neat and tidy.',
        'Work/ serving area is neat, clean and free of spillage.',
        'Uncluttered circulation space free of refuse/ furniture.',
        'Fixtures and fittings including shelves, cupboards and drawers are clean and dry and in a good state.',
        'Ceiling/ ceiling boards are free from stains/ dust with no gaps.',
        'Fans and air-con units are in proper working order and clean and free from dust. Proper maintenance and routine cleaning are carried out regularly.',
        'Equipment is clean, in good condition and serviced.',
        'Surfaces, walls and ceilings within customer areas are dry and clean.',
        'Floor within customer areas is clean and dry.',
        'Waste is properly managed and disposed:\n-Waste bins are not over-filled.\n-Waste Management: Proper disposal of general waste.',
    ];
    const data3_1=[
        'MSDS for all industrial chemicals are available and up to date.',
        'Proper chemicals storage.',
        'All detergent and bottles containing liquids are labelled appropriately.',
        'All personnel to wear safety shoes and safety attire where necessary.',
        'Knives and sharp objects are kept at a safe place.',
        'Area under the sink should not be cluttered with items other than washing agents.',
        'Delivery personnel do not stack goods above the shoulder level.',
        'Stacking of goods does not exceed 600mm from the ceiling and heavy items at the bottom, light items on top.',
        'Proper signage/ label (fire, hazards, warnings, food stuff) and Exit signs in working order.',
    ];
    const data3_2=[
        'Fire extinguishers access is unobstructed; Fire extinguishers are not expired and employees know how to use them.',
        'Escape route and exits are unobstructed.',
        'First aid box is available and well-equipped.',      
    ];
    const data3_3=[
        'Electrical sockets are not overloaded – one plug to one socket.',
        'Plugs and cords are intact and free from exposure/ tension with PSB safety mark.',
        'Power points that are in close proximity to flammable and/or water sources are installed with a plastic cover.',
        'Electrical panels / DBs are covered.',
    ];


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

    //

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
                                    dataSource={data1_1}
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
                                    dataSource={data1_2}
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
                                    dataSource={data2_1}
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
                                    dataSource={data3_1}
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
                                    dataSource={data3_2}
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
                                    dataSource={data3_3}
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


