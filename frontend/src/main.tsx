import { Suspense } from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.tsx';
import { I18nextProvider } from "react-i18next";
import i18next from './i18n';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
       <I18nextProvider i18n={i18next}>
      <Suspense fallback='loading'>
        <App />
      </Suspense>
   </I18nextProvider>
  </StrictMode>,
)
