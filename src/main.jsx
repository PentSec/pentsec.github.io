import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import Index from './pages/Index'
import './assets/css/tailwind.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <NextUIProvider>
        <Index />
    </NextUIProvider>
)
