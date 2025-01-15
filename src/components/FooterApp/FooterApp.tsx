import { FaGithub } from 'react-icons/fa'

export default function FooterApp() {
    return (
        <footer className="">
            <div className="container flex flex-col items-center justify-between px-6 mx-auto">
                <div className="flex items-center space-x-4">
                    <a
                        href="https://github.com/pentsec"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-default-600 transition duration-200 hover:text-default-900"
                    >
                        <FaGithub className="w-5 h-5 mr-1" />
                        GitHub
                    </a>
                </div>
                <p className="mt-2 text-sm text-default-600">
                    © {new Date().getFullYear()} Jeff. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
