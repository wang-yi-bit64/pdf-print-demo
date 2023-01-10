import { FC, useEffect } from "react";
import { Document, Page, pdfjs} from "react-pdf/dist/esm/entry.vite"
import type {Dispatch, SetStateAction} from "react"
pdfjs.GlobalWorkerOptions.workerSrc = "../../../public/pdf.min.js";

interface Props {
  pdfUrl: string

  pageNumber: number
  setNumPages: Dispatch<SetStateAction<number | undefined>>
  width:number | undefined
}

const PdfPreview:FC<Props> = ({pdfUrl, pageNumber, setNumPages, width}) => {

  const onLoadSuccess = (info: { numPages: SetStateAction<number | undefined>; }) => {
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
