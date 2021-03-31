import {gql} from '@apollo/client';

export const FETCH_TENANT_DETAILS =gql` 
    query($getAllReportsByTenantTenantId: String!){
        getAllReportsByTenant(tenantId: $getAllReportsByTenantTenantId){
            id
            type
            tenantId{
                id
                name
                institution
            }
            auditorId{
                id
            }
            auditDate
            auditScore
            status
        }
    }
`

// export const FETCH_TENANT_STATUS_DETAILS=gql`
//     query($getReportByTenantAndStatusTenantId: String!, $getReportByTenantAndStatusStatus: String!){
//         getReportByTenantAndStatus(tenantId: $getReportByTenantAndStatusTenantId, status: $getReportByTenantAndStatusStatus){
//             tenantId{
//                 id
//                 name
//                 institution
//             }
//             status
//             auditDate
//         }
//     }
// `