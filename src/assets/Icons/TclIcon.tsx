import { motion, useAnimation } from 'framer-motion'

const TclIcon = () => {
    const controls = useAnimation()

    return (
        <div
            className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
            onMouseEnter={() => controls.start('animate')}
            onMouseLeave={() => controls.start('normal')}
        >
            <motion.div
                transition={{ type: 'spring', stiffness: 50, damping: 10 }}
                variants={{
                    normal: {
                        rotate: 0
                    },
                    animate: {
                        rotate: 180
                    }
                }}
                animate={controls}
            >
                <img src="/images/Tcl.svg" className="w-6 h-6"></img>
            </motion.div>
        </div>
    )
}

export { TclIcon }
