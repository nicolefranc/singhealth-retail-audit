import {gql} from '@apollo/client';

export const FETCH_TENANT_DETAILS =gql` 
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

export const FETCH_REPORT= gql`
query ($reportId: String!){
getReportById(reportId: $reportId) {
  id
  type
  tenantId
  auditorId
  auditDate
  auditScore
  status
  extension{
    proposed{
      date
      remarks
    }
    final{
      date
      remarks
    }
    status
  } 
  checklist{
    id
    weightage
    score
    subcategories{
      subcategory
      subcatScore
      lineItems{
        id
        lineItem
        complied
      }
    }
    category
    score
  }
} 
}

`