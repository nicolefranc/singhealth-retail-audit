import { Button, Card, Tag } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";

export default function TenantCard({ content, checkboxVisible }) {

    var color;

    switch(content.status.toLowerCase()) {
        case 'due':
            color = 'red';
            break;
        case 'unrectified':
            color = 'cyan';
            break;
        default:
            color = 'green';
    }

    const handleCheckbox = (e) => {
        console.log(`checked: ${e.target.checked}`)
    }

    return (
        <div className="mb-4">
            <Card title={content.name} bordered={false} 
                extra={ checkboxVisible && <Checkbox onChange={handleCheckbox} /> }>
                {/* style={{ width: 300 }}> */}
                <h3 className="text-sm uppercase mb-0">Audit Date</h3>
                <p>{ content.date }</p>
                <Tag color={color}>{ content.status }</Tag>
                <div className="flex justify-between mt-4">
                    <Button block className="mr-2">Notify</Button>
                    <Button type="primary" block className="ml-2">Audit</Button>
                </div>
                {/* <Button block>View</Button> */}
            </Card>
        </div>
    )
}