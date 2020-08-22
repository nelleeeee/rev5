import React, { useState, userEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Signup() {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      setFieldErrors({});

      const data = { username, password };
      try {
        await Axios.post("http://localhost:8000/accounts/signup/", data);

        notification.open({
          message: "회원가입 성공",
          description: " 로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });

        history.push("/accounts/login");
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "회원가입 실패",
            description: "아이디/ 암호를 확인해주세요",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });

          const { data: fieldErrorMessages } = error.response;

          setFieldErrors(
            Object.entries(fieldErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors.join(" "),
                };
                return acc;
              },
              {}
            )
          );
        }
      }
    }
    fn();
  };

  return (
    <Form {...layout} onFinish={onFinish} autoComplete={"false"}>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: "please input your username" },
          { min: 5, message: "5글자 입력해 주세요." },
        ]}
        hasFeedback
        {...fieldErrors.username}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        {...fieldErrors.password}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <button type="primary" htmlType="submit">
          Submit
        </button>
      </Form.Item>
    </Form>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// import React, { useState, useEffect } from "react";
// import { Alert } from "antd";
// import { useHistory } from "react-router-dom";
// import Axios from "axios";

// export default function Signup() {
//   const history = useHistory();
//   const [inputs, setInputs] = useState({ username: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [formDisabled, setFormDisabled] = useState(true);

//   const onSubmit = (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setErrors({});

//     Axios.post("http://localhost:8000/accounts/signup/", inputs)
//       .then((response) => {
//         history.push("/accounts/login/");
//       })
//       .catch((error) => {
//         console.log("error :", error);
//         if (error.response) {
//           setErrors({
//             username: (error.response.data.username || []).join(" "),
//             password: (error.response.data.password || []).join(" "),
//           });
//         }
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     const isEnabled = Object.values(inputs).every((s) => s.length > 0);
//     setFormDisabled(!isEnabled);
//   }, [inputs]);

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setInputs((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <div>
//           <input type="text" name="username" onchange={onChange} />
//           {errors.username && <Alert type="error" message={errors.username} />}
//         </div>
//         <div>
//           <input type="pasword" name="password" onChange={onchange} />
//           {errors.password && <Alert type="error" message={errors.password} />}
//         </div>
//         <input
//           type="submit"
//           value="회원가입"
//           disabled={loading || formDisabled}
//         />
//       </form>
//     </div>
//   );
// }
