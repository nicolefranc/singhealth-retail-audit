import { gql } from '@apollo/client';

export const SINGLE_UPLOAD = gql`
    mutation($file: Upload!) {
        singleUpload(file: $file) {
            filename
            mimetype
            uri
        }
    }
`;

export const MULTIPLE_UPLOADS = gql`
    mutation($files: [Upload], $id: String!) {
        multipleUploads(files: $files, id: $id) {
            filename
            mimetype
            uri
        }
    }
`

export const DELETE_UPLOAD = gql`
    mutation($filename: String!) {
        deleteUpload(filename: $filename)
    }
`