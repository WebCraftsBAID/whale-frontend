import { Route, Routes, useLocation } from 'react-router-dom'
import PageHome from './ui/pages/home/PageHome.tsx'
import PageOrder from './ui/pages/order/PageOrder.tsx'
import { AnimatePresence } from 'framer-motion'

export default function App(): JSX.Element {
    const location = useLocation()

    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route index element={<PageHome />} />
                <Route path='order' element={<PageOrder />} />
            </Routes>
        </AnimatePresence>
    )
}
