import { List } from "antd";

export default function LineItem({ lineItems }) {

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
                    {item}
                    {/* <ThreeStateCheckbox checked={checked} onChange={handleChange}>
                        {item}
                    </ThreeStateCheckbox> */}
                </List.Item>
            )}
        />
    )
}