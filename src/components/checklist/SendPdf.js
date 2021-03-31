import { Button } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { FETCH_REPORT } from "../../graphql/queries";
import { tokenValidator } from "../../utils/tokenValidator";

export default function SendPdf({
    reportId,
    sendSelf,
    sendTenant,
    remarks,
    download,
    addressee,
}) 
{
    const { data } = useQuery(FETCH_REPORT, {
        variables: { reportId: reportId },
    });

    if (data) {
        var tenantEmail = data.getReportById.tenantId.email;
        console.log("tenant email is ", tenantEmail);
    }

    //getting my email starts here
    let isAuthenticated = localStorage.getItem("jwt");
    let validatorResult = tokenValidator(isAuthenticated);

    console.log("my id is : ", validatorResult.id);

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

    function handleSubmit() {
        if (sendSelf && !addressee.includes(userEmail)) {
            addressee.push(userEmail);
          }
          
          if (sendTenant && !addressee.includes(tenantEmail)) {
            addressee.push(tenantEmail);
          }
          console.log(remarks);
          sendEmail();
    }

    const [sendEmail, { loading }] = useMutation(SEND_EMAIL, {
        update(cache, result) {
            console.log(result);
        },
        onError(err) {
            console.log(err);
        },
        variables: { reportId, addressee, remarks },
    });
    return (
        <>
            <Button onClick={handleSubmit}>Send PDF</Button>
        </>
    );
}

const SEND_EMAIL = gql`
    mutation($reportId: String!, $addressee: [String!], $remarks: String!) {
        sendReportPDFById(reportId: $reportId, addressee: $addressee, remarks: $remarks)
    }
`;
