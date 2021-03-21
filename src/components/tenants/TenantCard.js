import { Button, Card, Divider, Skeleton,Tag } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Link } from "react-router-dom";

//REPLACED BY TENANTLISTITEM
export default function TenantCard({ content, checkboxVisible }) {

    const tenantId = content.id;
    console.log(tenantId);

    const handleCheckbox = (e) => {
        console.log(`checked: ${e.target.checked}`)
    }

    if (content)
        return (
            <div >

                <Card extra={ checkboxVisible && <Checkbox onChange={handleCheckbox} /> }>
                    <div className="flex flex-row justify-between">
                        <h3 className="uppercase mb-0 font-bold">{content.name}</h3>
                        <Tag color="red">Unrectified</Tag>
                    </div>
                    <div className="flex flex-row ">
                        <h3 className="text-sm uppercase mb-0 mr-2">{ content.institution }</h3>
                        <Tag >Last Audit: 19/3/2021</Tag>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                        <Button block className="mr-2">Notify</Button>
                        <Link to={`report/${tenantId}`} className="w-full ml-2">
                            <Button type="primary" block>Audit</Button>
                        </Link>
                    </div>
                </Card>

            </div>
        )
    
    return <Skeleton />
}