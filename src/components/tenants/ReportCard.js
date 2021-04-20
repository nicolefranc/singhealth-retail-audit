import React, { useState } from 'react';
import {Skeleton,Tag, Button,Empty,Spin,Row,Col,Checkbox,Divider } from "antd";
import {SwipeContentAction1} from '../swipe/SwipeContent';
import {SwipeableListItem} from '@sandstreamdev/react-swipeable-list';
import { MailOutlined } from "@ant-design/icons";
import SendPdf from '../audit/SendPdf';
import ReportModal from '../report/ReportModal';
import { AUDIT_ACTIONS, routes } from '../../const';
import { useHistory, useLocation } from 'react-router';
import TextArea from 'antd/lib/input/TextArea';
	
export default function ReportCard({ content }) {
    const { pathname } = useLocation();

    const reportId = content.id;
    // console.log("reportId is this :", reportId);
    const [itemSelected, setItemSelected] = useState(null);
    const history = useHistory();

    // for pop up
    const [visible,setVisible]=useState(false);


    //for self checkbox
    function onSelfChecked(e) {
        console.log(`self = ${e.target.checked}`);
        setSendSelf(e.target.checked);
    }
    //for tenant checkbox
    function onTenantChecked(e) {
        console.log(`tenant = ${e.target.checked}`);
        setSendTenant(e.target.checked);
    }

    function updateRemarks(e){
        setRemarks(e.target.value);
    }

    const [sendSelf, setSendSelf] = useState(false);
    const [sendTenant, setSendTenant] = useState(false);
    const [remarks, setRemarks] = useState("");

    
    const showModal = (index) => {
        setVisible(true);
        setItemSelected(index);
        console.log(index);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    // For swipe functionality  
    const swipeLeftOptions = () => ({
        content: (
            <SwipeContentAction1
            label="Email"
            icon={<MailOutlined />}
            />
        ),
        action: () => showModal(reportId)
    });

    const goToReport = () => {
        history.push(`${routes.REPORT}/${reportId}`)
    }

    if (content) {
        const inDashboard = pathname === '/';
        return (
            <>
                <SwipeableListItem swipeLeft={swipeLeftOptions(content.type)}>
                    <div className="swipeable-listitem px-4 py-5 flex-1 rounded-md" onClick={goToReport}>
                    { inDashboard ?
                        <>
                            <div className="font-semibold text-xl truncate">{content.tenantId.name}</div>
                            <span className="font-semibold truncate uppercase text-gray-500">{content.tenantId.institution}</span>
                        </>
                        : (
                        <>
                            <span className="text-xs font-semibold truncate uppercase text-gray-400">Date of Audit</span> 
                            <div className="font-semibold text-xl truncate">{content.auditDate}</div>
                        </>
                    )}
                    <div className="flex items-center mt-4">
                        {/* <Divider type="vertical" /> */}
                        <div className="mt-2 mr-4">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase">Type</h4>
                            <h3 className="text-base uppercase">{content.type}</h3>
                        </div>
                        {/* <Divider type="vertical" /> */}
                        {inDashboard && <div className="mt-2 mr-4">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase">Date of Audit</h4>
                            <h3 className="text-base">{content.auditDate}</h3>
                        </div>}
                        <div className="mt-2">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase">Status</h4>
                            <h3 className="text-base uppercase">
                            {( () => {
                                if (content.status==="audited"){
                                    return (<Tag color="success">{content.status.toUpperCase()}</Tag>)
                                } else if (content.status === AUDIT_ACTIONS.RECTIFIED_AUDIT) {
                                    return <Tag color="blue">{content.status.toUpperCase()}</Tag>
                                } else if (content.status==="unrectified"){
                                    return(<Tag color="error">{content.status.toUpperCase()}</Tag>)
                                }else if (content.status==="draft"){
                                    return(<Tag color="warning">{content.status.toUpperCase()}</Tag>)
                                }else{
                                    return (<div/>)
                                }
                            } ) ()}
                            </h3>
                        </div>
                    </div>
                        {/* TODO: fix extension */}
                        {/* <Tag>Due {getAllReportsByTenant[0].extension.final.date}</Tag> */}</div>
                </SwipeableListItem>
                
                <ReportModal
                    id={itemSelected}
                    title="Email Report PDF to..."
                    visible = {visible}
                    actions={[
                        <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                        <SendPdf reportId={itemSelected} sendSelf={sendSelf} sendTenant={sendTenant} remarks={remarks} addressee={["roxaswen@gmail.com"]}/>  //toh.kai.feng.2015@vjc.sg
                    ]}
                    functions={handleCancel}
                    maskClosable={false}
                >
                    <div className="flex flex-col">

                        <Row>
                            <Col span={6}><Checkbox onChange={onSelfChecked}>Self</Checkbox></Col>
                            <Col span={6}><Checkbox onChange={onTenantChecked}>Tenant</Checkbox></Col>
                        </Row>

                        <TextArea onChange={updateRemarks} placeholder="Remarks" autoSize className="mt-5" />
                    </div>  
                </ReportModal>

            </>
        )
    }
    return <Skeleton />
}