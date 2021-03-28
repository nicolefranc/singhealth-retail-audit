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
`

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
`