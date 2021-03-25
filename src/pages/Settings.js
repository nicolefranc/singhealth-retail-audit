import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Button, Upload } from "antd";
import Title from "antd/lib/typography/Title";
import { MULTIPLE_UPLOADS } from "../graphql/mutations";

export default function Settings() {
    const [mutate, { loading, error }] = useMutation(MULTIPLE_UPLOADS);
    const onChange = async ({ target: { validity, files: [file] } }) => {
        if (validity.valid) {
            let r = await mutate({ variables: { file } });
            console.log(r);
        }

    };
    
    const uploadProps = {
        action: '/upload.do',
        multiple: false,
        data: { a: 1, b: 2 },
        headers: {
          Authorization: '$prefix $token',
        },
        listType: 'picture',
        onStart(file) {
          console.log('onStart', file, file.name);
        },
        onSuccess(res, file) {
          console.log('onSuccess', res, file.name);
        },
        onError(err) {
          console.log('onError', err);
        },
        onProgress({ percent }, file) {
          console.log('onProgress', `${percent}%`, file.name);
        },
        customRequest({
          action,
          data,
          file,
          filename,
          headers,
          onError,
          onProgress,
          onSuccess,
          withCredentials,
        }) {
            console.log(data);
            mutate({ variables: { files: [file, file] }})
                .then(({ data: { multipleUploads }}) => {
                    console.log(multipleUploads);
                    // onSuccess(singleUpload, singleUpload)
                })
                .catch(onError);
      
          return {
            abort() {
              console.log('Upload progress is aborted.');
            },
          };
        },
      };

    if (loading) return <div>{loading}</div>;
    if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

    return (
        <>
            <Title>Settings</Title>
            {/* <input type="file" required onChange={onChange} /> */}
            <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
        </>
    );
}