import { NextUIProvider } from '@nextui-org/react'
import { ReactNode } from 'react'

export function Provider({ children }: { children: ReactNode }) {
    return (
        <NextUIProvider className="light-bg-gradiant dark:dark-bg-gradiant overflow-auto overflow-x-hidden">
            {children}
        </NextUIProvider>
    )
}
