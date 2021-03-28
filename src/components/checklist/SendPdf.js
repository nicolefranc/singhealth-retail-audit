import { Button } from 'antd';
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import saveAs from 'file-saver';

export default function SendPdf({reportId, download, addressee}) {

  const [sendEmail, {loading}] = useMutation(SEND_EMAIL, {
    update(cache,result){
      console.log(result);
    },
    onError(err){
      console.log(err);
    },
    variables: {reportId,addressee}});
  return (
    <>
      <Button onClick={sendEmail}>Send PDF</Button>
    </>
  );
}

const SEND_EMAIL = gql`
mutation ($reportId: String!, $addressee: [String!]){
  sendReportPDFById(reportId:$reportId, addressee: $addressee)
}
`