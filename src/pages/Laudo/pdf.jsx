import React from 'react';
import { useLocation } from 'react-router-dom';

const Pdf = () => {
  const location = useLocation();
  const { report_pdf } = location.state.data;  // Recebe o PDF base64 da navegação anterior

  // Converter o base64 para uma URL que o iframe possa usar
  const pdfDataUrl = `data:application/pdf;base64,${report_pdf}`;

  return (
    <div>
      {report_pdf ? (
        <iframe
          src={pdfDataUrl}
          title="PDF Viewer"
          width="100%"
          height="600px"
        />
      ) : (
        <p>Nenhum PDF disponível para exibição</p>
      )}
    </div>
  );
};

export default Pdf;
