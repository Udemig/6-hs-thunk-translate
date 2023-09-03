import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { options } from '../../constants/constants';

export const getLanguages = createAsyncThunk(
  'getLanguages',
  async () => {
    // api'a istek atma
    const res = await axios.request(options);

    const data = res.data.data.languages;

    /*
     * diziyi dönüp
     * her bir objesi için value label objesine sahip yeni obje
     * value'lara code'u
     * label'lara name'eşitliycez
     */
    const refinedData = data.map((item) => ({
      value: item.code,
      label: item.name,
    }));

    // oluşruduğumuz asenkron aksiyonun
    // slice'a akatarıcağı verisi (payload)
    return refinedData;
  }
);

export const translateText = createAsyncThunk(
  'translate',
  async (params) => {
    // İstek için ayarlar
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', params.sourceLang.value);
    encodedParams.set('target_language', params.targetLang.value);
    encodedParams.set('text', params.text);

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key':
          '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      },
      data: encodedParams,
    };

    // isteği atma
    const res = await axios.request(options);

    // veriyi slice'a gönderme (payload ekler)
    return res.data.data.translatedText;
  }
);
