import { Form, Input, Button, Radio, Checkbox, Alert } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import Dashboard from "./Dashboard";
import { Redirect } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

export default function ForgotPassword(props) {
 

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
          <p>You are a</p>
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
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

// over here I define the gql queries. one for auditor one for tenant. I change them in my useState hook. "loginAs"
const QUERY_AUDITOR = gql`
  query getAuditorByEmail($email: String!) {
    getAuditorByEmail(email: $email) {
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
const QUERY_TENANT = gql`
  query getTenantByEmail($email: String!) {
    getTenantByEmail(email: $email) {
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
