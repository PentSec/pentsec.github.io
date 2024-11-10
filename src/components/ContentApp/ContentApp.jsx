import { motion } from 'framer-motion'
import { createSwapy } from 'swapy'
import { useEffect } from 'react'
import { ContactCard, ProfileCard, ReposCard, Languages } from '../../components'

export default function ContentApp() {
    useEffect(() => {
        const container = document.querySelector('.container')
        const swapy = createSwapy(container, { swapMode: 'dynamic' })

        swapy.onSwap(({ data }) => {
            console.log('Nuevo orden:', data.object)
        })
        swapy.enable(true)

        return () => {
            swapy.destroy()
        }
    }, [])

    return (
        <div className="container">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-3 lg:gap-6 rounded-box">
                <div className="lg:col-span-1">
                    <div data-swapy-slot="1">
                        <div data-swapy-item="profile">
                            <ProfileCard />
                        </div>
                    </div>
                    <div data-swapy-slot="2">
                        <div data-swapy-item="contact">
                            <ContactCard />
                        </div>
                    </div>
                    <div data-swapy-slot="3">
                        <div data-swapy-item="languages">
                            <Languages />
                        </div>
                    </div>
                </div>
                <div className="col-span-3 gap-4 p-4 mb-4 rounded-lg bg-zinc-800 lg:col-span-2">
                    <div>
                        <ReposCard />
                    </div>
                </div>
            </div>
        </div>
    )
}
