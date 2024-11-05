import { createContext, useContext, useEffect, useState } from 'react'

const GitHubUserContext = createContext()

export const GitHubUserProvider = ({ username, children }) => {
    const [userData, setUserData] = useState(null)
    const [userRepos, setUserRepos] = useState(null)
    const [languageStats, setLanguageStats] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [count, setCount] = useState(0)

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
                const dataRepo = await responseRepo.json()
                console.log(dataRepo)
                console.log(data)

                setUserData(data)
                setUserRepos(dataRepo)

                const languageUsage = {}

                dataRepo.forEach((repo) => {
                    const language = repo.language
                    if (language) {
                        languageUsage[language] = (languageUsage[language] || 0) + 1
                    }
                })

                const totalRepos = dataRepo.length
                const languagePercentages = Object.entries(languageUsage, count)
                    .map(([language, count]) => ({
                        language,
                        count,
                        percentage: ((count / totalRepos) * 100).toFixed(2)
                    }))
                    .sort((a, b) => b.percentage - a.percentage)
                setCount(count)
                setLanguageStats(languagePercentages)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, [username])

    return (
        <GitHubUserContext.Provider
            value={{ userData, userRepos, languageStats, isLoading, error, count }}
        >
            {children}
        </GitHubUserContext.Provider>
    )
}

export const useGithubUser = () => useContext(GitHubUserContext)
