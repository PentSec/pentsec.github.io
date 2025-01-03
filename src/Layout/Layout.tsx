import { motion } from 'framer-motion'
import { ContentApp, FooterApp } from '@/components'
import { GitHubUserProvider } from '@/context/GithubUserContext'

const Layout = () => {
    return (
        <GitHubUserProvider username="PentSec">
            <motion.div
                className="grid min-h-[100vh] grid-rows-[auto_1fr_auto] w-screen"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
            >
                <header></header>
                <div className="flex items-center justify-center w-full h-auto">
                    <main className="flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center max-w-[1280px] p-4 text-center bg-zinc-900">
                        <ContentApp />
                    </main>
                </div>
                <footer className="p-0 text-center bg-zinc-900">
                    <FooterApp />
                </footer>
            </motion.div>
        </GitHubUserProvider>
    )
}

export default Layout
