import { Form, Input, Button, Radio, Checkbox, Alert } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { useParams } from "react-router";
import { tokenValidator } from "../utils/tokenValidator";

export default function Register(props) {
  const { token } = useParams();
  const tokenResult = tokenValidator(token);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const [values, setValues] = useState("{}");

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    values.regtoken = token;
    setValues(values);
    console.log(values);
    registerUserCallback();
  };

  let REGISTER_USER =
  tokenResult.type === "tenant" ? REGISTER_TENANT : REGISTER_AUDITOR; //to change the graphql query depending on what the user want's to "login as"

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(cache, result) {
      // this "update" is for us to define a function that 'useMutation' takes in. is executes whatever you want to execute in you "update" function with the cache and result.
      // here we will use the result of the query a store it locally when 'context.login' is being called.
      // props.history.push("/");
      setErrors({});
      props.history.push("/login");
      console.log("name is", tokenResult.name);
      setSuccess("Successfully activated ".concat(tokenResult.name));
    },
    onError(err) {
      //any error will be thrown here
      console.log("values are", values);
      console.log(err);
      try {
        // seterrors allow me to print the error to the react 'alert' component (for instance, the red bar you see when you key in wrong credentials)
        // because sometimes it doesn't work (like the graphql errors return me smth undefined), i put it in a try and catch block haha
        setSuccess("");
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      } catch (err) {
        console.log(err);
      }
    },
    variables: values,
  });

  function registerUserCallback() {
    //we need this function here because of some sequence thing, so please don't change the order of the functions above LOL
    registerUser();
  }

  return (
    <>
      {/* <div className="flex justify-between">
            <Button className='ml-16' size='large'>Login as Tenant</Button>
            <Button className='mr-16' size='large'>Login as Staff</Button>
        </div> */}
      <div>
        <Form layout="vertical" onFinish={onFinish}>
          <b>Hi {tokenResult.name},</b>
          <h1>Please enter your password to activate your account</h1>
          <br></br>
          <Form.Item
            label="Password"
            name="password"
            required
            tooltip={{
              title: "This is a required field",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input type="password" placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            required
            tooltip={{
              title: "This is a required field",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input type="password" placeholder="Re-enter password" />
          </Form.Item>
          {Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map((value) => (
                  <Alert message={value} type="error" />
                ))}
              </ul>
            </div>
          )}
                {success && <Alert message={success} type="success" />}
<br></br>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

// over here I define the gql queries. one for auditor one for tenant. I change them in my useState hook. "loginAs"
const REGISTER_AUDITOR = gql`
  mutation registerAuditor(
    $regtoken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerAuditor(
      registerInput: {
        regToken: $regtoken
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      role
      institutions
      email
      password
      createdAt
      activated
      token
      name
    }
  }
`;
const REGISTER_TENANT = gql`
  mutation registerTenant(
    $regtoken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerTenant(
      registerInput: {
        regToken: $regtoken
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      type
      email
      password
      createdAt
      activated
      token
      name
    }
  }
`;
