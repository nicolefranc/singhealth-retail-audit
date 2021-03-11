import { List } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCompliant } from "../../redux/actions/report";
import Checkbox from "./Checkbox";

export default function Item({ items, cIndex, sIndex }) {
    const [lineItems, setLineItems] = useState(items); // Array of line item objects
    const [compliance] = useState(null);
    const dispatch = useDispatch();

    // console.log(`Item load: ${cIndex}, ${sIndex}`);

    let itemsSrc = [];
    items.forEach(lineItemObj => {
        itemsSrc = [...itemsSrc, lineItemObj.lineItem];
    });

    // payload.checklist[cIndex].subcategories[sIndex].lineItems
    const toggleCompliance = (complied, index) => {
        // Given the index, update the complied field in line item object
        let lineItem = {...lineItems[index]};
        let compliance;

        // console.log(cIndex, sIndex);
        if (complied) { // Not compliant
            compliance = false;
            lineItem.complied = false;
        } else if (complied === false) { // N/A
            compliance = null;
            lineItem.complied = null;
        } else if (complied === null) { // Compliant
            compliance = true;
            lineItem.complied = true;
        }

        // console.log(lineItem);

        // Update the lineItems array
        const lineItemsArr = updateLineItems(lineItem, index)
        const compliant = lineItemsArr.filter(item => item.complied);
        const notNA = lineItemsArr.filter(item => item.complied !== null)
        let compliantCount = compliant.length;
        let totalCount = notNA.length;
        // console.log(`Compliant items: ${compliant.length}`);
        // console.log(`Total items: ${notNA.length}`);
        setLineItems(lineItemsArr);
        toggleCompliant(cIndex, sIndex, compliance, compliantCount, totalCount, lineItemsArr)(dispatch);
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