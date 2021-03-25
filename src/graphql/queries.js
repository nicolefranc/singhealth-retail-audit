import {gql} from '@apollo/client';

export const TENANT_DETAILS =gql` 
    query($getAllReportsByTenantTenantId: String!){
        getAllReportsByTenant(tenantId: $getAllReportsByTenantTenantId){
            id
            type
            tenantId
            auditorId
            auditDate
            auditScore
            status
        }
    }
`