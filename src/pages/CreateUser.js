import { Form, Input, Button, Select, Radio, Alert } from "antd";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { tokenValidator } from "../utils/tokenValidator";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CreateUser = () => {
  let validatorResult = tokenValidator(localStorage.getItem("jwt"));

  const isAdmin = validatorResult.type === "admin";

  const [tenantType, setTenantType] = useState("non-fnb");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const onTenantTypeChange = (e) => {
    console.log("radio checked", e.target.value);
    setTenantType(e.target.value);
  };

  const [values, setValues] = useState("{}");

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    values.tenantType = [values.tenantType];
    setValues(values);
    createUserCallback();
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      name: "test",
      email: "Hello world!",
      institution: "male",
    });
  };

  const [createType, setCreateType] = useState("Tenant");

  function handleCreateType(event) {
    setCreateType(event.target.value);
    CREATE_USER =
      event.target.value === "Staff" ? CREATE_AUDITOR : CREATE_TENANT; //to change the graphql query depending on what the user want's to "login as"
  }

  var CREATE_USER = createType === "Staff" ? CREATE_AUDITOR : CREATE_TENANT;

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    update(cache, result) {
      // this "update" is for us to define a function that 'useMutation' takes in. is executes whatever you want to execute in you "update" function with the cache and result.
      // here we will use the result of the query a store it locally when 'context.login' is being called.
      // context.login(result.data);
      console.log(result);
      // if (result.data.loginAuditor)
      //   login(result.data.loginAuditor)(dispatch);
      // else if (result.data.loginTenant)
      //   login(result.data.loginTenant)(dispatch);
      // else console.error("Something is wrong with the login.");
      // props.history.push("/");
      setErrors({});
      setSuccess("Successfully Created ".concat(values.name));
    },
    onError(err) {
      //any error will be thrown here
      console.log(err);
      try {
        // seterrors allow me to print the error to the react 'alert' component (for instance, the red bar you see when you key in wrong credentials)
        // because sometimes it doesn't work (like the graphql errors return me smth undefined), i put it in a try and catch block haha
        setSuccess("");
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
        console.log(Object.values(errors));
      } catch (err) {
        console.log(err);
      }
    },
    variables: values,
  });

  function createUserCallback() {
    //we need this function here because of some sequence thing, so please don't change the order of the functions above LOL
    createUser();
  }

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <p>New User Type</p>
      <Radio.Group disabled={!isAdmin} value={createType} label="Login As">
        <Radio.Button value="tenant" onClick={handleCreateType}>
          Tenant
        </Radio.Button>
        <Radio.Button value="Staff" onClick={handleCreateType}>
          Staff
        </Radio.Button>
      </Radio.Group>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="institution"
        label="Institution"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      {createType === "tenant" ? (
        <Form.Item name="type" rules={[{ required: true }]}>
          <Radio.Group onChange={onTenantTypeChange} value={tenantType}>
            <Radio value={"fnb"}>F&B</Radio>
            <Radio value={"non-fnb"}>Non-F&B</Radio>
          </Radio.Group>
        </Form.Item>
      ) : (
        <Form.Item name="type" rules={[{ required: true }]}>
          <Radio.Group onChange={onTenantTypeChange} value={tenantType}>
            <Radio value={"admin"}>Admin</Radio>
            <Radio value={"staff"}>Normal</Radio>
          </Radio.Group>
        </Form.Item>
      )}
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <Alert message={value} type="error" />
            ))}
          </ul>
        </div>
      )}
      <div></div>
      {success && <Alert message={success} type="success" />}
      <br></br>
      <Form.Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;

const CREATE_TENANT = gql`
  mutation createTenant(
    $name: String!
    $email: String!
    $institution: String!
    $type: [String!]
  ) {
    createTenant(
      createTenantInput: {
        name: $name
        email: $email
        institution: $institution
        type: $type
      }
    ) {
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
const CREATE_AUDITOR = gql`
  mutation createAuditor(
    $name: String!
    $email: String!
    $institution: String!
    $type: String!
  ) {
    createAuditor(
      createAuditorInput: {
        name: $name
        email: $email
        institution: $institution
        role: $type
      }
    ) {
      id
      institutions
      email
      password
      createdAt
      activated
      token
      name
      role
    }
  }
`;
