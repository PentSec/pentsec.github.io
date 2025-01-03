import { createSwapy } from 'swapy'
import { useEffect } from 'react'
import { ContactCard, ProfileCard, ReposCard, Languages } from '@/components'
import { useGithubUser } from '@/context/GithubUserContext'

export default function ContentApp() {
    const { userRepos, isLoading, error, languageStats, userData } = useGithubUser() || {}
    useEffect(() => {
        const container: HTMLElement | null = document.querySelector('.container')
        if (container) {
            const swapy = createSwapy(container, { swapMode: 'hover' })
            swapy.enable(true)
            return () => {
                swapy.destroy()
            }
        }
    }, [])

    return (
        <div className="container">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-3 lg:gap-6 rounded-box">
                <div className="lg:col-span-1">
                    <div data-swapy-slot="1">
                        <div data-swapy-item="profile">
                            <ProfileCard userData={userData} isLoading={isLoading} error={error} />
                        </div>
                    </div>
                    <div data-swapy-slot="2">
                        <div data-swapy-item="contact">
                            <ContactCard userData={userData} isLoading={isLoading} error={error} />
                        </div>
                    </div>
                    <div data-swapy-slot="3">
                        <div data-swapy-item="languages">
                            <Languages
                                languageStats={languageStats || []}
                                isLoading={isLoading}
                                error={error}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-3 gap-4 p-4 mb-4 rounded-lg bg-zinc-800 lg:col-span-2">
                    <div>
                        <ReposCard
                            userRepos={userRepos || []}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
