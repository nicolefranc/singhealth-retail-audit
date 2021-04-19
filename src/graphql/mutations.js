import { gql } from "@apollo/client";

export const SINGLE_UPLOAD = gql`
    mutation($file: Upload!) {
        singleUpload(file: $file) {
            filename
            mimetype
            uri
        }
    }
`;

export const MULTIPLE_UPLOADS = gql`
    mutation($files: [Upload], $id: String!) {
        multipleUploads(files: $files, id: $id) {
            filename
            mimetype
            uri
        }
    }
`;

export const RECTIFICATION_UPLOADS = gql`
    mutation($files: [Upload], $id: String!) {
        rectificationUploads(files: $files, id: $id) {
            filename
            mimetype
            uri
        }
    }
`;



export const CREATE_RECTIFICATION = gql`
    mutation CreateRectificationMutation($createRectificationId: String, $createRectificationImages: [IImages]) {
        createRectification(id: $createRectificationId, images: $createRectificationImages) {
            id
            status
            images {
                lineItemId
                lineItem
                nonCompliances
                nonComplRemarks
                rectifications
                rectRemarks
            }
        }
    }
`;


export const DELETE_UPLOAD = gql`
    mutation($filename: String!) {
        deleteUpload(filename: $filename)
    }
`;

export const CREATE_REPORT = gql`
    mutation CreateReportMutation($createReportBody: ReportInput!) {
        createReport(body: $createReportBody) {
            id
            type
            status
        }
    }
`;
export const PROPOSE_EXTENSION = gql`
    mutation($reportId: String!, $date: String!, $remarks: String!) {
        proposeExtension(reportId: $reportId, date: $date, remarks: $remarks) {
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
export const APPROVE_EXTENSION = gql`
    mutation($reportId: String!, $date: String!, $remarks: String!) {
        approveExtension(reportId: $reportId, finalDate: $date, finalRemarks: $remarks) {
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


export const SEND_EMAIL = gql`
mutation ($from: String!, $to: String!, $title: String!, $body:String!){
  sendEmail(from:$from, to:$to, title: $title, body: $body)
}
`;

export const CHANGE_AUDITOR_EMAIL = gql `
    mutation change($email: String!, $id: String!){
      changeAuditorEmail(email:$email ,id: $id){
        name
        email
      }
    }

`;
export const CHANGE_TENANT_EMAIL = gql `
    mutation change($email: String!, $id: String!){
      changeTenantEmail(email:$email ,id: $id){
        name
        email
      }
    }

`;