import { motion } from 'framer-motion'
import { ContactCard, ProfileCard, ReposCard, Languages } from '../../components'

export default function ContentApp() {
    return (
        <div>
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-3 lg:gap-6 rounded-box">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ProfileCard />
                    <ContactCard />
                    <Languages />
                </motion.div>
                <motion.div
                    className="col-span-2 gap-4 p-4 mb-4 rounded-lg bg-zinc-800"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ReposCard />
                </motion.div>
            </div>
        </div>
    )
}
