import { Button } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { FETCH_REPORT } from "../../graphql/queries";
import { tokenValidator } from "../../utils/tokenValidator";

export default function SendPdf({
    reportId,
    sendSelf,
    sendTenant,
    download,
    addressee,
}) {
    const { data } = useQuery(FETCH_REPORT, {
        variables: { reportId: reportId },
    });
    if (data) console.log(data, "report id is ", reportId);


    //getting tenant email start
    if(data){

      const tenantEmailResult = useQuery(
          gql`
              query getTenantById($id: String!) {
                  getTenantById(id: $id) {
                      email
                  }
              }
          `,
          {
              variables: { id: data.getReportById.tenantId },
          }
      );
  
      if (tenantEmailResult) {
          console.log("tenant email is", tenantEmailResult.data.getTenantById.email);
      }
    }
    //getting tenant email end

    //getting my email
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
        console.log("myemail is", myEmailResult.data.getAuditorById.email);
    }
    //getting my email end

    function handleSubmit() {
        if (sendSelf) {
            addressee.push(myEmailResult.data.getAuditorById.email);
            console.log(addressee);
            // sendEmail();
        }
        
        if(sendTenant){
          addressee.push(tenantEmailResult.data.getTenantById.email);
          console.log(addressee);
        }
    }

    const [sendEmail, { loading }] = useMutation(SEND_EMAIL, {
        update(cache, result) {
            console.log(result);
        },
        onError(err) {
            console.log(err);
        },
        variables: { reportId, addressee },
    });
    return (
        <>
            <Button onClick={handleSubmit}>Send PDF</Button>
        </>
    );
}

const SEND_EMAIL = gql`
    mutation($reportId: String!, $addressee: [String!]) {
        sendReportPDFById(reportId: $reportId, addressee: $addressee)
    }
`;
