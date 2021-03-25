import { Form, Input, Button, Radio, Checkbox, Alert } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useDispatch } from 'react-redux';

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import { login } from "../redux/actions/auth";

export default function Login(props) {
  const context = useContext(AuthContext);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  //   const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("staff");

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginAs, setLoginAs] = useState("Staff");

  function handleLoginAs(event) {
    setLoginAs(event.target.value);
    LOGIN_USER = event.target.value === "Staff" ? LOGIN_AUDITOR : LOGIN_TENANT; //to change the graphql query depending on what the user want's to "login as"
    console.log(LOGIN_USER);
  }

  var LOGIN_USER = loginAs === "Staff" ? LOGIN_AUDITOR : LOGIN_TENANT;

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(cache, result) {
      // this "update" is for us to define a function that 'useMutation' takes in. is executes whatever you want to execute in you "update" function with the cache and result.
      // here we will use the result of the query a store it locally when 'context.login' is being called.
      // context.login(result.data);
      console.log(result);
      if (result.data.loginAuditor)
        login(result.data.loginAuditor)(dispatch);
      else if (result.data.loginTenant)
        login(result.data.loginTenant)(dispatch);
      else console.error("Something is wrong with the login.");
      props.history.push("/");
    },
    onError(err) {
      //any error will be thrown here
      console.log("values are", values);
      console.log(err);
      try {
        // seterrors allow me to print the error to the react 'alert' component (for instance, the red bar you see when you key in wrong credentials)
        // because sometimes it doesn't work (like the graphql errors return me smth undefined), i put it in a try and catch block haha
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      } catch (err) {
        console.log(err);
      }
    },
    variables: values,
  });

  function loginUserCallback() {
    //we need this function here because of some sequence thing, so please don't change the order of the functions above LOL
    loginUser();
  }

  return (
    <>
      {/* <div className="flex justify-between">
            <Button className='ml-16' size='large'>Login as Tenant</Button>
            <Button className='mr-16' size='large'>Login as Staff</Button>
        </div> */}
      <div>
        <Form
          layout="vertical"
          initialValues={{
            requiredMark,
          }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
        >
          <p>Login As</p>
          <Radio.Group value={loginAs} label="Login As">
            <Radio.Button value="tenant" onClick={handleLoginAs}>
              Tenant
            </Radio.Button>
            <Radio.Button value="Staff" onClick={handleLoginAs}>
              Staff
            </Radio.Button>
          </Radio.Group>

          <Form.Item label="Email" required tooltip="This is a required field">
            <Input
              placeholder="input email"
              onChange={onChange}
              name="email"
              value={values.email}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            required
            tooltip={{
              title: "This is a required field",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input
              type="password"
              name="password"
              placeholder="input password"
              onChange={onChange}
              value={values.password}
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

// over here I define the gql queries. one for auditor one for tenant. I change them in my useState hook. "loginAs"
const LOGIN_AUDITOR = gql`
  mutation loginAuditor($email: String!, $password: String!) {
    loginAuditor(email: $email, password: $password) {
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
const LOGIN_TENANT = gql`
  mutation loginTenant($email: String!, $password: String!) {
    loginTenant(email: $email, password: $password) {
      id
      email
      password
      createdAt
      activated
      token
      name
    }
  }
`;
