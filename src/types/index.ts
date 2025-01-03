export type UserData = {
    avatar_url?: string
    name?: string
    login?: string
    bio?: string
    company?: string
    location?: string
    followers?: number
    following?: number
    twitter_username?: string
    html_url?: string
}

export type UserRepo = {
    id?: number
    name?: string
    html_url?: string
    created_at: string
    updated_at: string
    description?: string
    stargazers_count?: number
    forks_count?: number
    language?: string | null
}

export type LanguageStat = {
    language: string
    count: number
    percentage: string
}

export type GitHubUserContextProps = {
    userData: UserData | null | undefined
    userRepos: UserRepo[] | null
    languageStats: { language: string }[] | null
    isLoading: boolean | undefined
    error: string | null | undefined
}

export type GitHubUserProviderProps = {
    username: string
    children: React.ReactNode
}
