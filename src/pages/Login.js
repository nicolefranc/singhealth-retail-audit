import { Form, Input, Button, Radio, Checkbox } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import Dashboard from "./Dashboard";
import { Redirect } from "react-router-dom";
// import { useMutation } from '@apollo/client';
import gql from "graphql-tag";

const LOGIN_USER = gql`
  mutation loginTenant($email: String!, $password: String!) {
    loginTenant(email: $email, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default function Login() {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("tenant");

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const [isAuth, setIsAuth] = useState(false);

  //   if(isAuth){
  //       return <Redirect to= {Dashboard}/>
  //   }

  const onFinish = (values) => {
    // loginUser();
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [loginAs, setLoginAs] = useState("Staff");

  function handleLoginAs(event) {
    setLoginAs(event.target.value);
  }

  function loginUserCallback() {
    // loginUser();
  }

  // const [loginUser] = useMutation(LOGIN_USER, {
  //     variables: {email: "ee", password: 'ff'}
  // });

  return (
    <>
      {/* <div className="flex justify-between">
            <Button className='ml-16' size='large'>Login as Tenant</Button>
            <Button className='mr-16' size='large'>Login as Staff</Button>
        </div> */}
      <div>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            requiredMark,
          }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
          onFinish={onFinish}
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

          <Form.Item
            name="email"
            label="Email"
            required
            tooltip="This is a required field"
          >
            <Input placeholder="input email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            required
            tooltip={{
              title: "This is a required field",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input type="password" placeholder="input password" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!form.isFieldsTouched(true)}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
