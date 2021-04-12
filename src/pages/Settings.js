import { PropertySafetyFilled, UploadOutlined } from "@ant-design/icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Descriptions, Input, message, Spin, Tabs,Tag, Upload } from "antd";
import Title from "antd/lib/typography/Title";
import { validate } from "graphql";
import { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { routes } from "../const";
import {
    CHANGE_AUDITOR_EMAIL,
    CHANGE_TENANT_EMAIL,
    MULTIPLE_UPLOADS,
} from "../graphql/mutations";
import { FETCH_AUDITOR, FETCH_TENANT } from "../graphql/queries";
import { tokenValidator } from "../utils/tokenValidator";
import CreateUser from "./CreateUser";

const { TabPane } = Tabs;

export default function Settings() {
    let validatorResult = tokenValidator(localStorage.getItem("jwt"));
    let history = useHistory();

    const isTenant = validatorResult.type === "tenant";
    console.log(validatorResult.institutions)
    const isAuditor = ["auditor", "admin"].includes(validatorResult.type);

    const QUERY_TYPE =
        validatorResult.type === "tenant" ? FETCH_TENANT : FETCH_AUDITOR;
    console.log("my id", validatorResult.id);
    const { data, loading, error } = useQuery(QUERY_TYPE, {
        variables: { id: validatorResult.id },
    });
    const [email, setEmail] = useState("");

    const EMAIL_MUTATION = validatorResult.type === "tenant" ? CHANGE_TENANT_EMAIL : CHANGE_AUDITOR_EMAIL;
    const [updateEmail] = useMutation(EMAIL_MUTATION, {
      update(cache, result) {

        if(validatorResult.type === "tenant"){
          const { getTenantById: cachedTenant } = cache.readQuery({
            query: FETCH_TENANT,
            variables: { id: validatorResult.id },
        });
        const newTenant = JSON.parse(JSON.stringify(cachedTenant)); //deep clone
        newTenant.email = result.data.changeTenantEmail.email;
        cache.writeQuery({
            query: FETCH_TENANT,
            variables: { id: validatorResult.id },
            data: {
              getTenantById: newTenant,
            },
        });
        } else {
            const { getAuditorById: cachedAuditor } = cache.readQuery({
              query: FETCH_AUDITOR,
              variables: { id: validatorResult.id },
          });
          const newAuditor = JSON.parse(JSON.stringify(cachedAuditor)); //deep clone
          newAuditor.email = result.data.changeAuditorEmail.email;
          cache.writeQuery({
              query: FETCH_AUDITOR,
              variables: { id: validatorResult.id },
              data: {
                getAuditorById: newAuditor,
              },
          });
        }
          message.success("Email Changed to ".concat(email));
      },
      onError(err) {
          //any error will be thrown here
          console.log(err);
          try {
          } catch (err) {
              console.log(err);
          }
      },
      variables: { email: email, id: validatorResult.id },
    });
    if (loading || error) {
        return (
            <div className="flex w-full justify-center items-center">
                <Spin tip="Loading..." size="large" />
            </div>
        );
    }
    if (!email){
      if (validatorResult.type === "tenant") {
          setEmail(data.getTenantById.email);
      } else {
          setEmail(data.getAuditorById.email);
      }
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push("/login");
    };

    const saveChanges = () => {
      updateEmail();
    };
    const colours = ["magenta","red","volcano","orange","gold","lime","green","cyan","blue","geekblue","purple"]
    return (
        <>
            <Title>Settings</Title>
            {/* <input type="file" required onChange={onChange} /> */}
            <Button onClick={handleLogout}>Logout</Button>
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="Details" key="1">
                    <Descriptions
                        size="small"
                        column={1}
                        layout="horizontal"
                        bordered
                    >
                        {/* TODO: auditor details */}
                        <Descriptions.Item label="Name">
                            {validatorResult.name}
                        </Descriptions.Item>
                        {isAuditor && (
                            <Descriptions.Item label="Role">
                                {validatorResult.type}
                            </Descriptions.Item>
                        )}
                        {isTenant && (
                            <Descriptions.Item label="Type">
                                {validatorResult.name}
                            </Descriptions.Item>
                        )}
                        <Descriptions.Item label="Institutions">
                        
                            {validatorResult.institutions.map((item,idx) => <Tag color={colours[idx*2]}>{item}</Tag>)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            <Input
                                // value={"hi"}
                                value={email}
                                onChange={(e)=> {setEmail(e.target.value);
                                console.log(e.target.value)}}
                            />
                        </Descriptions.Item>
                    </Descriptions>
                    <Button onClick={saveChanges}>Save Changes</Button>
                </TabPane>

                <TabPane tab="New User" key="4">
                    <CreateUser />
                </TabPane>
            </Tabs>
        </>
    );
}

// const [mutate, { loading, error }] = useMutation(MULTIPLE_UPLOADS);
// const onChange = async ({
//     target: {
//         validity,
//         files: [file],
//     },
// }) => {
//     if (validity.valid) {
//         let r = await mutate({ variables: { file } });
//         console.log(r);
//     }
// };
{
    /* <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload> */
}
// const uploadProps = {
//   action: '/upload.do',
//   multiple: false,
//   data: { a: 1, b: 2 },
//   headers: {
//     Authorization: '$prefix $token',
//   },
//   listType: 'picture',
//   onStart(file) {
//     console.log('onStart', file, file.name);
//   },
//   onSuccess(res, file) {
//     console.log('onSuccess', res, file.name);
//   },
//   onError(err) {
//     console.log('onError', err);
//   },
//   onProgress({ percent }, file) {
//     console.log('onProgress', `${percent}%`, file.name);
//   },
//   customRequest({
//     action,
//     data,
//     file,
//     filename,
//     headers,
//     onError,
//     onProgress,
//     onSuccess,
//     withCredentials,
//   }) {
//       console.log(data);
//       mutate({ variables: { files: [file, file] }})
//           .then(({ data: { multipleUploads }}) => {
//               console.log(multipleUploads);
//               // onSuccess(singleUpload, singleUpload)
//           })
//           .catch(onError);

//     return {
//       abort() {
//         console.log('Upload progress is aborted.');
//       },
//     };
//   },
// };

// if (loading) return <div>{loading}</div>;
// if (error) return <div>{JSON.stringify(error, null, 2)}</div>;
