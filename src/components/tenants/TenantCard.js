import { Button, Card, Tag } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Link } from "react-router-dom";
import { routes } from "../../const";

export default function TenantCard({ content, checkboxVisible }) {

    const tenantId = content.id;
    console.log(tenantId);

    const handleCheckbox = (e) => {
        console.log(`checked: ${e.target.checked}`)
    }

    return (
        <div className="mb-4">
            <Card title={content.name} bordered={false} 
                extra={ checkboxVisible && <Checkbox onChange={handleCheckbox} /> }>
                {/* style={{ width: 300 }}> */}
                <h3 className="text-sm uppercase mb-0">Institution</h3>
                <p>{ content.institution }</p>
                {/* <Tag color={color}>{ content.status }</Tag> */}
                <div className="flex justify-between mt-4">
                    <Button block className="mr-2">Notify</Button>
                    <Link to={routes.TEMPLATES} className="w-full ml-2">
                        <Button type="primary" block>Audit</Button>
                    </Link>
                </div>
                {/* <Button block>View</Button> */}
            </Card>
        </div>
    )
}