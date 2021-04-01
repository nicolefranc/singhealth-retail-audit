import { Button } from 'antd';
import axios from 'axios';
import saveAs from 'file-saver';

export default function Pdf(checklistData) {
  console.log(checklistData);
  console.log("html is :", document.getElementById('root'));


  const server = axios.create({
    baseURL: "http://localhost:5001"
  })
  function handleItBij() {
    server.post('/create-pdf', checklistData)
    .then(() => server.get('/fetch-pdf', {responseType: 'blob'}))
    .then((res) => {
      const pdfBlob = new Blob([res.data], {type: 'application/pdf'});

      saveAs(pdfBlob, 'newPDF.pdf');
    })
  }


  return (
    <>
      <Button onClick={handleItBij}>Send PDF</Button>
    </>
  );
}