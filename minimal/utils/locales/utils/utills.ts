import axios from 'axios';

import { Config } from '@core/config';

const showError = (error: string) => {};

export default class apiExport {
  static async downloadReportPdf<TModel>(apiURL: string, fileName: string, data: TModel) {
    try {
      const response = await axios.post(`${Config.apiBaseUrl}/${apiURL}`, data, {
        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${localStorage.getItem('serviceToken')}`,
        },
        responseType: 'blob',
      });

      if (response.status === 200) {
        const pdfBlob = new Blob([response.data], {
          type: 'application/pdf',
        });

        const url = window.URL.createObjectURL(pdfBlob);

        const tempLink = document.createElement('a');
        tempLink.href = url;
        const now = new Date()
          .toISOString()
          .replace(/[:.]/g, '_')
          .replace(/-/g, '_')
          .split('T')
          .join('_')
          .slice(0, 23);
        tempLink.setAttribute('download', `${fileName}.pdf`);

        document.body.appendChild(tempLink);
        tempLink.click();

        tempLink.remove();
        window.URL.revokeObjectURL(url);
      }

      return response;
    } catch (error) {
      showError('An unknown error occurred');
      return error;
    }
  }

  static async downloadExcel<TModel>(
    apiURL: string,
    fileName: string,
    data: TModel,
    setLoading: (data: boolean) => void
  ) {
    try {
      const response = await axios.post(`${apiURL}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('serviceToken')}`,
        },

        responseType: 'blob',
      });
      if (response.status === 200) {
        setLoading(false);
        const excelBlob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        const url = window.URL.createObjectURL(excelBlob);

        const tempLink = document.createElement('a');
        tempLink.href = url;

        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-GB').replace(/\//g, '-');
        tempLink.setAttribute('download', `${fileName}_${formattedDate}.xlsx`);

        document.body.appendChild(tempLink);
        tempLink.click();

        tempLink.remove();
        window.URL.revokeObjectURL(url);
      }

      return response;
    } catch (error: any) {
      setLoading(false);
      showError(error.response.statusText);
      return error;
    }
  }
}
