import React from 'react';
import { List } from "antd";

export default function LineItem({ lineItems }) {

    //TEMPORARY CHECKBOX!! TO BE REPLACED
    const updateInput = (ref, checked) => {
        console.log(ref);
        const input = ref.current;
        if (input) {
            input.checked = checked;
            input.indeterminate = checked == null;
        }
    };
    const ThreeStateCheckbox = ({ name, checked, toggleCompliance}) => {
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
          if (toggleCompliance) {
            toggleCompliance(checkedRef.current);
          }
        };

        console.log(checkedRef);
        return (
            <input 
            ref={inputRef}
            type="checkbox"
            name={name}
            onClick={handleClick} />
        );
    };
    const [compliance, setCompliance] = React.useState(true);
    const toggleCompliance = (checked) => {
        console.log(`checked: ${checked}`);
    };
    //
    
    // console.log(lineItems);

    let lineItemsString = [];

    lineItems.forEach(lineItemObj => {
        lineItemsString = [...lineItemsString, lineItemObj.lineItem];
    });

    // console.log(lineItemsString);

    return (
        // <h1>{ lineItemsString[0] }</h1>
        <List
            dataSource={lineItemsString}
            renderItem={item => (
                <List.Item>
                    <div className="row justify-between">
                        {item}
                        <ThreeStateCheckbox checked={compliance} onChange={toggleCompliance}/>
                    </div>
                </List.Item>
            )}
        />
    )
}