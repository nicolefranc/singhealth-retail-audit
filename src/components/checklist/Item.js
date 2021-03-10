import { List } from "antd";
import { useState } from "react";
import Checkbox from "./Checkbox";

export default function Item({ items }) {
    const [lineItems, setLineItems] = useState(items); // Array of line item objects
    const [compliance] = useState(null);

    let itemsSrc = [];
    items.forEach(lineItemObj => {
        itemsSrc = [...itemsSrc, lineItemObj.lineItem];
    });

    const toggleCompliance = (complied, index) => {
        // Given the index, update the complied field in line item object
        let lineItem = lineItems[index];
        // console.log(lineItem);

        // console.log(index);
        if (complied) { // Not compliant
            lineItem.complied = false;
        } else if (complied === false) { // N/A
            lineItem.complied = null;
        } else if (complied === null) { // Compliant
            lineItem.complied = true;
        }

        // Update the lineItems array
        setLineItems(updateLineItems(lineItem, index));
    }

    const updateLineItems = (lineItem, index) => {
        return [
            ...lineItems.slice(0, index),
            lineItem,
            ...lineItems.slice(index + 1)
        ]
    }

    // console.log(lineItems);
    return (
        <List dataSource={itemsSrc} renderItem={(item, index) => (
            <List.Item>
                <div className="flex row justify-between items-center">
                    <p>{ item }</p>
                    <Checkbox index={index} compliance={compliance} toggleCompliance={toggleCompliance} />
                </div>
            </List.Item>
        )} />
    )
}