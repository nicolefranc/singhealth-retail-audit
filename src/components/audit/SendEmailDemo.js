import { useMutation } from '@apollo/client'
import { Button, message, Input } from 'antd'
import { useState } from 'react'
import {SEND_EMAIL} from '../../graphql/mutations'


export default function SendEmailDemo(){


    const [title, setTitle]     = useState();
    const [body, setBody]     = useState();
    const [to, setTo]     = useState();
    const [from, setFrom]     = useState();

    const [sendEmail, {loading}] = useMutation(SEND_EMAIL, {
        update(cache, result){
            console.log(result);
            message.success("yay sent!");
        },
        onError(err){
            console.log(err);
        },
        variables: {from,to,title,body}
    })

    const handleClick = () => {
        sendEmail();
    }

    return (
        <>from<Input name="from" title="from" onChange={(e) => setFrom(e.target.value)}></Input>
        to<Input name="to" title="to" onChange={(e) => setTo(e.target.value)}></Input>
        title<Input name="title" title="title" onChange={(e) => setTitle(e.target.value)}></Input>
        body<Input name="body" title="body" onChange={(e) => setBody(e.target.value)}></Input>
        <Button onClick={handleClick}>Press me to send</Button></>
    )
}