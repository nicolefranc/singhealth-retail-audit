import { useMutation,useQuery } from '@apollo/client'
import { Button, message, Input } from 'antd'
import { useState } from 'react'
import {SEND_EMAIL} from '../../graphql/mutations'
import { tokenValidator } from "../../utils/tokenValidator";

export default function SendEmailDemo({close, to, title, body}){

    // const [from, setFrom] = useState();

    //getting auditor data
    let isAuthenticated = localStorage.getItem("jwt");
    let validatorResult = tokenValidator(isAuthenticated);
    //

    const [sendEmail, {loading}] = useMutation(SEND_EMAIL, {
        update(cache, result){
            console.log(result);
            message.success("Email Sent");
            close();
        },
        onError(err){
            console.log(err);
        },
        variables: {from: validatorResult.name,to,title,body}
    })

    const handleClick = () => {
        console.log("var",validatorResult.name,to,title,body);
        sendEmail();
    }

    return (
        <>

        <Button type="primary" loading={loading} onClick={handleClick}>Send</Button></>
    )
}