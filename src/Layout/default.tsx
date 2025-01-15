import { motion } from 'framer-motion'
import { ContentApp, FooterApp } from '@/components'
import ThemeSwitch from '@/components/ThemeSwitch/ThemeSwitch'

const Layout = () => {
    return (
        <motion.div
            className="mx-auto h-screen max-w-7xl px-6 md:px-8 lg:px-12 relative z-[2] grid min-h-[100vh] grid-rows-[auto_1fr_auto] w-screen items-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
        >
            <header className="flex items-center justify-between py-8">
                <div></div>
                <nav className="flex gap-6">
                    <ThemeSwitch />
                </nav>
            </header>
            <main>
                <ContentApp />
            </main>
            <footer className="bottom-0 left-0 right-0 p-2 text-default-500 shadow-2xl bg-default-50/10 mt-8 flex items-center justify-center py-8">
                <FooterApp />
            </footer>
        </motion.div>
    )
}

export default Layout
