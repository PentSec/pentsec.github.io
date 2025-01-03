import { createContext, useContext, useEffect, useState, FC } from 'react'
import {
    GitHubUserContextProps,
    GitHubUserProviderProps,
    UserData,
    UserRepo,
    LanguageStat
} from '@/types'

const GitHubUserContext = createContext<GitHubUserContextProps | null>(null)

export const GitHubUserProvider: FC<GitHubUserProviderProps> = ({ username, children }) => {
    const [userData, setUserData] = useState<UserData | null>(null)
    const [userRepos, setUserRepos] = useState<UserRepo[] | null>(null)
    const [languageStats, setLanguageStats] = useState<LanguageStat[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!username) return

        const fetchUserData = async () => {
            setIsLoading(true)
            try {
                const [response, responseRepo] = await Promise.all([
                    fetch(`https://api.github.com/users/${username}`),
                    fetch(`https://api.github.com/users/${username}/repos`)
                ])

                if (!response.ok || !responseRepo.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`)
                }

                const data = await response.json()
                const dataRepo: UserRepo[] = await responseRepo.json()
                console.log(dataRepo)
                console.log(data)

                setUserData(data)
                setUserRepos(dataRepo)

                const languageUsage: Record<string, number> = {}

                dataRepo.forEach((repo) => {
                    const language = repo.language
                    if (language) {
                        languageUsage[language] = (languageUsage[language] || 0) + 1
                    }
                })

                const languageCount = Object.entries(languageUsage).map(([language]) => ({
                    language
                }))

                setLanguageStats(languageCount as LanguageStat[])
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error')
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, [username])

    return (
        <GitHubUserContext.Provider
            value={{
                userData,
                userRepos,
                languageStats,
                isLoading,
                error,
                count: userRepos?.length || 0,
                size: userData?.public_repos || 0
            }}
        >
            {children}
        </GitHubUserContext.Provider>
    )
}

export const useGithubUser = (): GitHubUserContextProps | null => useContext(GitHubUserContext)
