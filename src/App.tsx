import { useState, useRef, useCallback } from "react";
import { Button, Modal, Pagination, PaginationProps, Upload } from "antd";
import "antd/dist/reset.css";
import "./App.css";
import pdf from "./assets/326_ParcelLabelingGuide-1 - 副本【搜狗文档翻译_双语_英译中】.pdf";
import type { UploadFile } from "antd/es/upload/interface";
import type { UploadProps } from "antd";
import PdfPreview from "./components/PdfPreview";
import { useReactToPrint } from "./components/ReactToPrint";

function App() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [numPages, setNumPages] = useState(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const iframeRef = useRef(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onChange: UploadProps["onChange"] = (info) => {
    console.log(info);
    setFileList(info.fileList);
  };

  const onPreview: UploadProps["onPreview"] = (file) => {
    console.log(file);
  };
  const testPrint = () => {
    setOpen(true);
  };
  const onPageChange: PaginationProps["onChange"] = (page) => {
    setPageNumber(page);
  };

  const handleBeforePrint = useCallback(() => {
    console.log("`onBeforePrint` called"); // tslint:disable-line no-console
  }, []);

  const handleAfterPrint = useCallback(() => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  }, []);

  const onPrint = () => {
    const printIframe = document.getElementById("Iframe");
    printIframe?.contentWindow?.print();
  };
  return (
    <div className="App">
      <div>
        <Button onClick={testPrint}>预览打印</Button>
        <Modal
          open={open}
          width="100vw"
          style={{ top: 0 }}
          onCancel={() => setOpen(false)}
          onOk={onPrint}
        >
          <PdfPreview
            pdfUrl={pdf}
            setNumPages={setNumPages}
            pageNumber={pageNumber}
            width={200}
          />
          <Pagination
            current={pageNumber}
            total={numPages}
            onChange={onPageChange}
            showSizeChanger={false}
          />
          <iframe
            style={{ width: "100vw", height: "80vh", display: "none" }}
            title="PDF文件"
            id="Iframe"
            src={pdf}
            ref={iframeRef}
          />
        </Modal>
      </div>
    </div>
  );
}

export default App;
