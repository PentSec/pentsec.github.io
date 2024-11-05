import { FaGithub } from 'react-icons/fa'

export default function FooterApp() {
    return (
        <footer className="">
            <div className="container flex flex-col items-center justify-between px-6 mx-auto">
                <div className="flex items-center space-x-4">
                    <a
                        href="https://github.com/tu_usuario"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-400 transition duration-200 hover:text-white"
                    >
                        <FaGithub className="w-5 h-5 mr-1" />
                        GitHub
                    </a>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                    © {new Date().getFullYear()} Jeff. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
