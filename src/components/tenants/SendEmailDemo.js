import { useMutation,useQuery } from '@apollo/client'
import { Button, message, Input } from 'antd'
import { useState } from 'react'
import {SEND_EMAIL} from '../../graphql/mutations'
import { tokenValidator } from "../../utils/tokenValidator";
import gql from "graphql-tag";


export default function SendEmailDemo({to, subject, body}){

    const [from, setFrom] = useState();

    //getting my email starts here
    let isAuthenticated = localStorage.getItem("jwt");
    let validatorResult = tokenValidator(isAuthenticated);

    console.log("my id is : ", validatorResult.id);

    const myEmailResult = useQuery(
        gql`
            query auditorById($id: String!) {
                getAuditorById(id: $id) {
                    name
                }
            }
        `,
        {
            variables: { id: validatorResult.id },
        }
    );
    if (myEmailResult.data) {
        var userName = myEmailResult.data.getAuditorById.name;
        console.log("my name is", userName);
    }
    setFrom(userName);
    //

    const [sendEmail, {loading}] = useMutation(SEND_EMAIL, {
        update(cache, result){
            console.log(result);
            message.success("yay sent!");
        },
        onError(err){
            console.log(err);
        },
        variables: {from,to,subject,body}
    })

    const handleClick = () => {
        sendEmail();
    }

    return (
        <>
        {/* title<Input name="title" title="title" onChange={ (e) => setTitle(e.target.value) }></Input> */}

        <Button onClick={handleClick}>Send</Button></>
    )
}