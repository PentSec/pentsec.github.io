import { FC } from 'react'
import { IconSvgProps } from '@/types'
import { motion, useAnimation } from 'framer-motion'

const ScalaIcon: FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
    const controls = useAnimation()

    return (
        <div
            className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
            onMouseEnter={() => controls.start('animate')}
            onMouseLeave={() => controls.start('normal')}
        >
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 416"
                height={size || width}
                width={size || width}
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
                {...props}
            >
                <defs>
                    <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="a">
                        <stop stopColor="#4F4F4F" offset="0%" />
                        <stop offset="100%" />
                    </linearGradient>
                    <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="b">
                        <stop stopColor="#C40000" offset="0%" />
                        <stop stopColor="red" offset="100%" />
                    </linearGradient>
                </defs>
                <path
                    d="M0 288v-32c0-5 116-14 192-32 37 8 64 19 64 32v32c0 13-27 24-64 32-76-18-192-27-192-32"
                    fill="url(#a)"
                    transform="matrix(1 0 0 -1 0 544)"
                />
                <path
                    d="M0 160v-32c0-5 116-14 192-32 37 8 64 19 64 32v32c0 13-27 24-64 32-76-18-192-27-192-32"
                    fill="url(#a)"
                    transform="matrix(1 0 0 -1 0 288)"
                />
                <path
                    d="M0 224v-96c0 8 256 24 256 64v96c0-40-256-56-256-64"
                    fill="url(#b)"
                    transform="matrix(1 0 0 -1 0 416)"
                />
                <path
                    d="M0 96V0c0 8 256 24 256 64v96c0-40-256-56-256-64"
                    fill="url(#b)"
                    transform="matrix(1 0 0 -1 0 160)"
                />
                <path
                    d="M0 352v-96c0 8 256 24 256 64v96c0-40-256-56-256-64"
                    fill="url(#b)"
                    transform="matrix(1 0 0 -1 0 672)"
                />
            </motion.svg>
        </div>
    )
}

export { ScalaIcon }
