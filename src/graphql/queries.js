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
            institution
            email
            expiry
        }
    }
`;

export const FETCH_REPORT_BY_TENANT_STATUS = gql` 
    query Query($getReportByTenantAndStatusTenantId: String!, $getReportByTenantAndStatusStatus: String!){
        getReportByTenantAndStatus(tenantId: $getReportByTenantAndStatusTenantId, status: $getReportByTenantAndStatusStatus){
            id
            type
            tenantId{
                id
                name
                institution
                email
            }
            auditorId{
                id
            }
            auditDate
            auditScore
            status
            checklist{
                category
            }
        }
    }
`;

export const FETCH_REPORT_BY_AUDITOR_STATUS = gql` 
    query($getReportByAuditorAndStatusAuditorId: String!, $getReportByAuditorAndStatusStatus: String!){
        getReportByAuditorAndStatus(auditorId: $getReportByAuditorAndStatusAuditorId, status: $getReportByAuditorAndStatusStatus){
            id
            type
            tenantId{
                id
                name
                institution
            }
            auditDate
            auditScore
            status
            checklist{
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

const FETCH_ALL_TENANTS_PERFORMANCE = gql`
  query getAllTenants{
    performance{
      month
      key
      score
    }
  }
`;

const FETCH_ALL_TENANT_PERFORMANCE = gql`
    query Query($id: String) {
        getTenantById(id: $id) {
            name
            performance {
                month
                entries
                score
            }
        }
    }
`;
