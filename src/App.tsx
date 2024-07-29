import { Route, Routes, useLocation } from 'react-router-dom'
import PageHome from './ui/pages/home/PageHome.tsx'
import PageOrder from './ui/pages/order/PageOrder.tsx'
import { AnimatePresence } from 'framer-motion'
import PreventWeChatBrowser from './ui/pages/wechat/PreventWeChatBrowser.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ShoppingCartProvider } from './data/shoppingCart.tsx'
import PageCheck from './ui/pages/check/PageCheck.tsx'
import { PersistentStorageProvider } from './data/persistentStorage.tsx'
import PageLogin from './ui/pages/login/PageLogin.tsx'
import PageLoginOnboarding from './ui/pages/login/PageLoginOnboarding.tsx'
import PageHistory from './ui/pages/history/PageHistory.tsx'
import PageAccount from './ui/pages/account/PageAccount.tsx'
import PageManage from './ui/pages/manage/PageManage.tsx'
import PageStats from './ui/pages/stats/PageStats.tsx'
import ForceWeChatBrowser from './ui/pages/wechat/ForceWeChatBrowser.tsx'

const queryClient = new QueryClient()

function shouldForceBrowser(): boolean {
    // Require usage of system browser for Android users,
    // because WeChat on Android serves a bad browser
    // that is incompatible with this project.
    return /MicroMessenger/i.test(window.navigator.userAgent) && /android/i.test(window.navigator.userAgent)
}

function shouldForceWeChat(): boolean {
    // Require usage of WeChat browser for iPad users,
    // because iPad provides a bad experience in WeChat Pay.
    return !/MicroMessenger/i.test(window.navigator.userAgent) && /Macintosh/i.test(window.navigator.userAgent) && navigator.maxTouchPoints != null &&
        navigator.maxTouchPoints > 1
}

export default function App(): JSX.Element {
    const location = useLocation()

    return (
        <AnimatePresence mode='wait'>
            <QueryClientProvider client={queryClient}>
                <ShoppingCartProvider>
                    <PersistentStorageProvider>
                        {shouldForceBrowser()
                            ? <PreventWeChatBrowser />
                            : (shouldForceWeChat()
                                ? <ForceWeChatBrowser />
                                : (<Routes location={location} key={location.pathname}>
                                    <Route index element={<PageHome />} />
                                    <Route path='order' element={<PageOrder />} />
                                    <Route path='login/oauth2/:redirect' element={<PageLogin />} />
                                    <Route path='login/onboarding/:redirect' element={<PageLoginOnboarding />} />
                                    <Route path='check/:id' element={<PageCheck />} />
                                    <Route path='history' element={<PageHistory />} />
                                    <Route path='account' element={<PageAccount />} />
                                    <Route path='manage' element={<PageManage />} />
                                    <Route path='statistics' element={<PageStats />} />
                                </Routes>))}
                    </PersistentStorageProvider>
                </ShoppingCartProvider>
            </QueryClientProvider>
        </AnimatePresence>
    )
}
