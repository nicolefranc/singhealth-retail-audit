import { gql } from "@apollo/client";

export const FETCH_TENANT_DETAILS = gql`
    query($getAllReportsByTenantTenantId: String!, $getTenantByIdId: String!) {
        getAllReportsByTenant(tenantId: $getAllReportsByTenantTenantId) {
            id
            type
            tenantId {
                id
                name
                institution
            }
            auditorId {
                id
            }
            auditDate
            auditScore
            status
        }
        getTenantById(id: $getTenantByIdId) {
            name
            id
            type
            institution
            email
            expiry
            performance {
                month entry score
            }
        }
    }
`;

export const FETCH_REPORT_BY_TENANT = gql`
    query($getAllReportsByTenantTenantId: String!) {
        getAllReportsByTenant(tenantId: $getAllReportsByTenantTenantId) {
            id
            type
            auditDate
            auditScore
            status
            checklist {
                category
            }
        }
    }
`;

export const FETCH_REPORT_BY_AUDITOR_STATUS = gql`
    query(
        $getReportByAuditorAndStatusAuditorId: String!
        $getReportByAuditorAndStatusStatus: String!
    ) {
        getReportByAuditorAndStatus(
            auditorId: $getReportByAuditorAndStatusAuditorId
            status: $getReportByAuditorAndStatusStatus
        ) {
            id
            type
            tenantId {
                id
                name
                institution
                email
            }
            auditDate
            auditScore
            status
            checklist {
                category
            }
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
                email
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
            images {
                lineItemId
                lineItem
                nonCompliances
                nonComplRemarks
                rectifications
                rectRemarks
            }
            extension {
                proposed {
                    date
                    remarks
                }
                final {
                    date
                    remarks
                }
                status
            }
        }
    }
`;

export const FETCH_ALL_TENANTS_PERFORMANCE = gql`
  query{
  getAllTenants{
      name
    performance{
      month
      entry
      score
    }
  }
}
`;

export const FETCH_ALL_TENANT_PERFORMANCE = gql`
    query Query($name: String!) {
        getTenantByName(name: $name) {
            performance {
                month
                entry
                score
            }
        }
    }
`;

export const FETCH_TENANT = gql`
    query getTenantById($id: String!) {
        getTenantById(id: $id) {
            name
            id
            institution
            email
            expiry
        }
    }
`;
export const FETCH_AUDITOR = gql`
    query getAuditorById($id: String!) {
        getAuditorById(id: $id) {
            name
            id
            institutions
            email
        }
    }
`;
