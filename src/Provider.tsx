import { HeroUIProvider } from "@heroui/react"
import { ReactNode } from 'react'

export function Provider({ children }: { children: ReactNode }) {
    return (
        <HeroUIProvider className="light-bg-gradiant dark:dark-bg-gradiant overflow-auto overflow-x-hidden">
            {children}
        </HeroUIProvider>
    )
}
