import { DatePicker, Descriptions } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { DATE_FORMAT, EXT_INITIAL } from "../../const";
import { updateAuditDetails } from "../../redux/actions/report";

export default function Details({ tenant, template }) {
    const { auditDate, extension } = useSelector(state => state.report);
    const dispatch = useDispatch();
    const onAuditDateChange = (date, dateString) => {
        updateAuditDetails('auditDate', dateString)(dispatch);
    }

    const onDueDateChange = (date, dateString) => {
        console.log(date, dateString)
        const extension = {
            proposed: { date: null, remarks: null },
            final: { date: dateString, remarks: null },
            status: EXT_INITIAL,
        }
        updateAuditDetails('extension', extension)(dispatch);
    }

    return (
        <>
            <Descriptions size="small" column={1} layout="horizontal" bordered>
                {/* TODO: auditor details */}
                <Descriptions.Item label="Auditor">Beatrice</Descriptions.Item>
                <Descriptions.Item label="Auditee">{ tenant.name }</Descriptions.Item>
                <Descriptions.Item label="Institution">{ tenant.institution }</Descriptions.Item>
                <Descriptions.Item label="Checklist Type">{ template[0] }</Descriptions.Item>
                <Descriptions.Item label="Audit Date">
                    <DatePicker onChange={onAuditDateChange} format={DATE_FORMAT} defaultValue={auditDate && moment(auditDate, DATE_FORMAT)} />
                </Descriptions.Item>
                <Descriptions.Item label="Due Date">
                    <DatePicker onChange={onDueDateChange} format={DATE_FORMAT} defaultValue={extension && moment(extension.final.date, DATE_FORMAT)} />
                </Descriptions.Item>
            </Descriptions>
        </>
    )
}