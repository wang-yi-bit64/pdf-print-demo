import { useEffect } from "react";
import { Document, Page, pdfjs} from "react-pdf/dist/esm/entry.vite"
pdfjs.GlobalWorkerOptions.workerSrc = "../../../public/pdf.min.js";


function PdfPreview({pdfUrl, pageNumber, setNumPages, width}) {
  useEffect(() => {
    console.log(Page)
  }, [])
  const onLoadSuccess = (info) => {
    console.log("onLoadSuccess", info)
    setNumPages(info.numPages);
  }

  return (
    <div>
      <Document file={pdfUrl} onLoadSuccess={onLoadSuccess} loading={'加载中...'}>
        <Page pageIndex={pageNumber}   width={width}/>
      </Document>
    </div>
  );
}

export default PdfPreview;
