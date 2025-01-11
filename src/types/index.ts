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
    size?: number
    public_repos?: number
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
    avatar_url?: string
    login?: string
    bio?: string
    followers?: number
    following?: number
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
    count?: number
    size?: number
}

export type GitHubUserProviderProps = {
    username: string
    children: React.ReactNode
}
