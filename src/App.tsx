import { Route, Routes, useLocation } from 'react-router-dom'
import PageHome from './ui/pages/home/PageHome.tsx'
import PageOrder from './ui/pages/order/PageOrder.tsx'
import { AnimatePresence } from 'framer-motion'
import PreventWeChatBrowser from './ui/pages/wechat/PreventWeChatBrowser.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ShoppingCartProvider } from './data/shoppingCart.tsx'
import PageCheck from './ui/pages/check/PageCheck.tsx'

const queryClient = new QueryClient()

export default function App(): JSX.Element {
    const location = useLocation()

    return (
        <AnimatePresence mode='wait'>
            <QueryClientProvider client={queryClient}>
                <ShoppingCartProvider>
                    {/MicroMessenger/i.test(window.navigator.userAgent)
                        ? <PreventWeChatBrowser />
                        : <Routes location={location} key={location.pathname}>
                            <Route index element={<PageHome />} />
                            <Route path='order' element={<PageOrder />} />
                            <Route path='check/:id' element={<PageCheck />} />
                        </Routes>}
                </ShoppingCartProvider>
            </QueryClientProvider>
        </AnimatePresence>
    )
}
