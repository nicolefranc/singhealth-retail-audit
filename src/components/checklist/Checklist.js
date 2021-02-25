import Title from "antd/lib/typography/Title";
// import ReactDOM from 'react-dom';
import { Collapse, Divider,List,Typography } from 'antd';

export default function Checklist() {
    const { Panel } = Collapse;

    const data1 = [
        'Shop is open and ready to service patients/visitors according to operating hours.',
        'Staff Attendance: adequate staff for peak and non-peak hours.',
        'At least one (1) clearly assigned person in-charge on site.',
    ];

    const data2=[
         
    ];

    return(
        <>
           <h2>Audit Checklist (Non-F&B)</h2> 

           <Divider />

            <div>
                <Collapse accordion>
                    <Panel header="1. Professionalism & Staff Hygiene (20%)" key="1">
                        <List
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>{item}</List.Item>
                            )}
                        />
                    </Panel>

                    <Panel header="2. Housekeeping & General Cleanliness (40%)" key="2">
                        {/* <p>{text}</p> */}
                    </Panel>

                    <Panel header="3. Workplace Safety & Health (40%)" key="3">
                        {/* <p>{text}</p> */}
                    </Panel>
                </Collapse>
            </div>
        </>
        
    
        
    )

}


