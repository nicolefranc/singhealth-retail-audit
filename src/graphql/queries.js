import {gql} from '@apollo/client';

export const FETCH_TENANT_DETAILS = gql` 
    query($getAllReportsByTenantTenantId: String!){
        getAllReportsByTenant(tenantId: $getAllReportsByTenantTenantId){
            id
            type
            tenantId {
                id
            }
            auditorId {
                id
            }
            auditDate
            auditScore
            status
        }
    }
`;

export const FETCH_CHECKLIST = gql`
    query Query($getReportTemplateType: String!, $getTenantByIdId: String!) {
        getReportTemplate(type: $getReportTemplateType) {
            type
            checklist {
                id
                category
                weightage
                score
                subcategories {
                    id
                    subcategory
                    subcatScore
                    lineItems {
                        id
                        lineItem
                        complied
                    }
                }
            }
        }
        getTenantById(id: $getTenantByIdId) {
            name
            id
            institution
            email
        }
    }
`;

export const FETCH_REPORT_BY_ID = gql`
    query Query($getReportByIdReportId: String!) {
        getReportById(reportId: $getReportByIdReportId) {
            id
            type
            tenantId {
                id
                name
                institution
                type
            }
            auditorId {
                id
                institutions
                name
                email
            }
            auditDate
            auditScore
            status
            checklist {
                id
                category
                weightage
                score
                subcategories {
                    id
                    subcategory
                    subcatScore
                    lineItems {
                        id
                        lineItem
                        complied
                    }
                }
            }
            images
            extension {
                proposed {
                    date
                    remarks
                }
            }
        }
    }
`;
