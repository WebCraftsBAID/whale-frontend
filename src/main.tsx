import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import './i18n'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Suspense fallback='Loading languages...'>
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<App />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    </React.StrictMode>
)
