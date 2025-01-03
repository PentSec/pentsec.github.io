import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import Layout from '@/Layout/Layout'
import '@/assets/css/main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <NextUIProvider>
        <Layout />
    </NextUIProvider>
)
