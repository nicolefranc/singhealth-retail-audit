import { Form, Input, Button, Radio, Checkbox, Alert } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import Dashboard from "./Dashboard";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  //   const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("staff");

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  //   const [isAuth, setIsAuth] = useState(false);

  //   const onFinish = (values) => {
  //     loginUser();
  //     console.log("Success:", values);
  //   };

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
    LOGIN_USER = (event.target.value === "Staff") ? LOGIN_AUDITOR : LOGIN_TENANT;
    console.log(LOGIN_USER);
  }

  var LOGIN_USER = (loginAs === "Staff") ? LOGIN_AUDITOR : LOGIN_TENANT;

  const [loginUser, { loading, data }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      console.log("values are", values);
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  if (data) {
    props.history.push("/");
    console.log(data);
  }

  function loginUserCallback() {
    loginUser();
  }

  function onFinish(values) {
    console.log(values);
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
