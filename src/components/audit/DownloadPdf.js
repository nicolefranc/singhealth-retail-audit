import { Button, message } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { FETCH_REPORT_BY_ID } from "../../graphql/queries";
import { tokenValidator } from "../../utils/tokenValidator";
import { htmlString } from "./htmlString";

import pdf from "html-pdf";
import saveAs from 'file-saver';


var options = {
    format: "A4",
    border: {
        top: "30px", // default is 0, units: mm, cm, in, px
        bottom: "30px",
    },
};

export default function DownloadPdf({ report }) {

    console.log("my report is : ", report);


    function handleSubmit() {
        const result = pdf.create(htmlString(report), options).toFile(
            "result.pdf",
            (err, res)=> {
                if(err){
                    message.error(err);
                }
                message.info("Downloading PDF...");
                var blob = new Blob([res.data])
            }
        );

        saveAs(new Blob(result), "test.pdf");
    }
    return (
        <>
            <Button onClick={handleSubmit}>Download PDF</Button>
        </>
    );
}
