import { FC } from 'react'
import { IconSvgProps } from '@/types'
import { motion, useAnimation } from 'framer-motion'

const PythonIcon: FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
    const controls = useAnimation()

    return (
        <div
            className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
            onMouseEnter={() => controls.start('animate')}
            onMouseLeave={() => controls.start('normal')}
        >
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="16 16 32 32"
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
                <path
                    fill="url(#a)"
                    d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"
                />
                <path
                    fill="url(#b)"
                    d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z"
                />
                <defs>
                    <linearGradient
                        id="a"
                        x1={19.075}
                        x2={34.898}
                        y1={18.782}
                        y2={34.658}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#387EB8" />
                        <stop offset={1} stopColor="#366994" />
                    </linearGradient>
                    <linearGradient
                        id="b"
                        x1={28.809}
                        x2={45.803}
                        y1={28.882}
                        y2={45.163}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#FFE052" />
                        <stop offset={1} stopColor="#FFC331" />
                    </linearGradient>
                </defs>
            </motion.svg>
        </div>
    )
}
export { PythonIcon }
