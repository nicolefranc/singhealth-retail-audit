import { Checklist } from "../components/checklist/Checklist";
import { fnb } from "../data/report";
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Skeleton } from "antd";

export default function Report() { // TODO: accept report type from query params later
    const templateType = "fnb";
    const query = useQuery(FETCH_REPORT_TEMPLATE_QUERY, {
        variables: { templateType }
    })

    if (query.data)
        console.log('add state here');

    return query.data ? (
        <> 
            <h1>{ query.data.getReportTemplate.templateType }</h1>
            <Checklist data={query.data.getReportTemplate.checklist} />
        </>
    ) : <Skeleton loading={true} />
}

const FETCH_REPORT_TEMPLATE_QUERY = gql`
    query($templateType: String!) {
        getReportTemplate(templateType: $templateType) {
            templateType
            tenantId
            auditorId
            auditDate
            auditScore
            extension {
                status
                proposed {
                    date
                    remarks
                }
                final {
                    date
                    remarks
                }
            }
            checklist {
                category
                weightage
                subcategories {
                    subcategory
                    subcatScore
                    lineItems {
                    lineItem
                    complied
                    images {
                        nonCompliances
                        nonComplRemarks
                        rectifications
                        rectRemarks
                    }
                    }
                }
            }
        }
    }
`