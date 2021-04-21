import { Button, message } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { FETCH_REPORT_BY_ID } from "../../graphql/queries";
import { tokenValidator } from "../../utils/tokenValidator";
import { useHistory } from "react-router";

export default function SendPdf({
    close,
    reportId,
    sendSelf,
    sendTenant,
    remarks,
    setVisible,
    addressee,
}) 
{
    const { data, error } = useQuery(FETCH_REPORT_BY_ID, {
        variables: { getReportByIdReportId: reportId },
    });

    if(error){
        console.log("hi",error);
    }

    if (data) {
        var tenantEmail = data.getReportById.tenantId.email;
        console.log("tenant email is ", tenantEmail);
    }

    //getting my email starts here
    let isAuthenticated = localStorage.getItem("jwt");
    let validatorResult = tokenValidator(isAuthenticated);

    console.log("my report id is : ", reportId);

    const myEmailResult = useQuery(
        gql`
            query auditorById($id: String!) {
                getAuditorById(id: $id) {
                    email
                }
            }
        `,
        {
            variables: { id: validatorResult.id },
        }
    );

    if (myEmailResult.data) {
        var userEmail = myEmailResult.data.getAuditorById.email;
        console.log("myemail is", userEmail);
    }
    //getting my email end

    async function handleSubmit() {
        if (sendSelf && !addressee.includes(userEmail)) {
            addressee.push(userEmail);
          }
          
          if (sendTenant && !addressee.includes(tenantEmail)) {
            addressee.push(tenantEmail);
          }
          console.log(remarks);
          sendEmail();
          close();
    }

    const [sendEmail, {loading}] = useMutation(SEND_EMAIL, {
        update(cache, result) {
            console.log(result);
            setVisible();
        },
        onError(err) {
            console.log(err);
        },
        onCompleted(data){
            console.log(data);
            // message.success("PDF report sent!");
        },
        variables: { reportId, addressee, remarks },
    });
    return (
        <>
            <Button type="primary" loading={loading} onClick={handleSubmit}>Send PDF</Button>
        </>
    );
}

const SEND_EMAIL = gql`
    mutation($reportId: String!, $addressee: [String!], $remarks: String!) {
        sendReportPDFById(reportId: $reportId, addressee: $addressee, remarks: $remarks){
            id
        }
    }
        
    
`;

