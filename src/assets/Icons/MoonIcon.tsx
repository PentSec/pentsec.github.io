import type { Transition, Variants } from 'framer-motion'
import { motion, useAnimation } from 'framer-motion'
import { FC } from 'react'
import { IconSvgProps } from '@/types'

const svgVariants: Variants = {
    normal: {
        rotate: 0
    },
    animate: {
        rotate: [0, -10, 10, -5, 5, 0]
    }
}

const svgTransition: Transition = {
    duration: 1.2,
    ease: 'easeInOut'
}

const MoonIcon: FC<IconSvgProps> = ({ size = 28, width, height, ...props }) => {
    const controls = useAnimation()

    return (
        <div
            className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center overflow-hidden"
            onMouseEnter={() => controls.start('animate')}
            onMouseLeave={() => controls.start('normal')}
        >
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                height={size || height}
                {...props}
                width={size || width}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={svgVariants}
                animate={controls}
                transition={svgTransition}
            >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </motion.svg>
        </div>
    )
}

export { MoonIcon }
