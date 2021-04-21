import { Divider, message, Skeleton,Tag,Button, Spin, Result } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/client';
import TextArea from 'antd/lib/input/TextArea';
import {SwipeContentAction1,SwipeContentAction2} from '../../components/swipe/SwipeContent';
import {SwipeableListItem} from '@sandstreamdev/react-swipeable-list';
import { NotificationOutlined,EditOutlined } from "@ant-design/icons";
import React, { useState } from 'react';
import CustomModal from '../../components/modals/CustomModal';
import SendEmailDemo from './SendEmailDemo';
import { FETCH_REPORT_BY_TENANT } from "../../graphql/queries";

export default function TenantListItem({ content, checkboxVisible, auditable }) {

    const tenantId = content.id;
    const tenantEmail = content.email;
    const { loading, error, data } = useQuery(FETCH_REPORT_BY_TENANT, {
        variables: { getAllReportsByTenantTenantId: tenantId}
    });

    const [itemSelected, setItemSelected] = useState(null);

    const handleClick = () => {
        console.log(`TenantDetail/${tenantId}`)
        history.push(`TenantDetail/${tenantId}`)
    }

    const handleCheckbox = (e) => {
        console.log(`checked: ${e.target.checked}`)
    }

    // for modal
    const [visible,setVisible]=useState(false);

    function updateSubject(e){
        setSubject(e.target.value);
    }
    const [subject, setSubject] = useState("");

    function updateRemarks(e){
        setRemarks(e.target.value);
    }
    const [remarks, setRemarks] = useState("");

    const showModal = (index) => {
        setVisible(true);
        setItemSelected(index);
    };
    const handleCancel = () => {
        setVisible(false);
    };

    // swipe functionalities
    let history = useHistory();
    const swipeToAudit = () => {
        console.log(content);
        if (auditable)
            history.push(`audit/${tenantId}/${content.type}`);
        else
            message.error("Can't audit tenant from another institution");
    }

    const swipeNotifyOptions = () => ({
        content: (
            <SwipeContentAction2
            label="Notify"
            icon={<NotificationOutlined />}
            />
        ),
        action: () => showModal(tenantId)
    });
    
    const swipeAuditOptions = () => ({
        content: (
            <SwipeContentAction1
            label="Audit"
            icon={<EditOutlined />}
            />
        ),
        action: () => swipeToAudit()
    });

    const [swipeProgress, handleSwipeProgress] = useState(0);

    const handleSwipeEnd = () => {
        handleSwipeProgress(0);
    };

    if (loading) return (
        <div className="px-4 pt-2 pb-5 rounded-md shadow-md bg-white">
            <Skeleton loading={loading} />
        </div>
    )
    else if (error) return <Result status="500" title="500" subTitle="Sorry, something went wrong" />

    const { getAllReportsByTenant } = data ? data : [] ;
    if (getAllReportsByTenant && getAllReportsByTenant.length>0){
        console.log(getAllReportsByTenant);
    }

    if (content)
        return (
            <>
                <SwipeableListItem 
                    threshold={0}
                    extra={ checkboxVisible && <Checkbox onChange={handleCheckbox}/>}
                    swipeLeft={(swipeProgress<40) ? swipeAuditOptions(content.name) : swipeNotifyOptions(content.name)}
                    onSwipeProgress={handleSwipeProgress }
                    onSwipeEnd={handleSwipeEnd}
                    // key={id}
                >
                    <div className="swipeable-listitem px-4 py-5 flex-1 rounded-md" onClickCapture={handleClick}>
                        {/* <span className="font-semibold text-xl truncate">{content.name}</span> */}
                        <div className="font-semibold text-xl truncate">{content.name}</div>
                        <span className="font-semibold truncate uppercase text-gray-500">{content.institution}</span>
                        
                        { (getAllReportsByTenant && getAllReportsByTenant.length > 0) && <div className="flex items-center mt-4">
                            {/* <Divider type="vertical" /> */}
                            <div className="mt-2 mr-4">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase">Type</h4>
                                <h3 className="text-base uppercase">{getAllReportsByTenant[0].type}</h3>
                            </div>
                            <div className="mt-2 mr-4">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase">Date of Audit</h4>
                                <h3 className="text-base">{getAllReportsByTenant[0].auditDate}</h3>
                            </div>
                            <div className="mt-2">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase">Status</h4>
                                <h3 className="text-base uppercase">
                                    {( () => {
                                        if (getAllReportsByTenant && getAllReportsByTenant.length>0) {
                                            if (getAllReportsByTenant[0].status==="audited"){
                                                return (<Tag color="success">{getAllReportsByTenant[0].status.toUpperCase()}</Tag>)
                                            } else if (getAllReportsByTenant[0].status==="rectified") {
                                                return (<Tag color="blue">{getAllReportsByTenant[0].status.toUpperCase()}</Tag>)
                                            } else if (getAllReportsByTenant[0].status==="unrectified"){
                                                return(<Tag color="error">{getAllReportsByTenant[0].status.toUpperCase()}</Tag>)
                                            }else if (getAllReportsByTenant[0].status==="draft"){
                                                return(<Tag color="warning">{getAllReportsByTenant[0].status.toUpperCase()}</Tag>)
                                            }else{
                                                return (<div/>)
                                            }
                                        } else {
                                            return (<div/>)
                                        }
                                    } ) ()}
                                </h3>
                            </div>
                        </div>}
                    </div>
                </SwipeableListItem>

                <CustomModal
                    title="Notify Tenant"
                    visible = {visible}
                    actions={[
                        <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                        <SendEmailDemo to={tenantEmail} title={subject} body={remarks}/>
                    ]}
                    functions={handleCancel}
                    maskClosable={false}
                >
                    <TextArea onChange={updateSubject} placeholder="Subject" autoSize/>
                    <TextArea onChange={updateRemarks} placeholder="Message" autoSize={{ minRows: 4}} className="mt-5" />
                    
                </CustomModal>

            </>
        )
    
    return <Skeleton />
}