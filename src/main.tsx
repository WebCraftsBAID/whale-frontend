import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Suspense fallback='Loading languages...'>

        </Suspense>
    </React.StrictMode>,
);
