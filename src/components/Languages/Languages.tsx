import { Card, CardBody, CardHeader, Chip, Skeleton } from '@nextui-org/react'
import languageColors from '@/data/colors.json'
import { GitHubUserContextProps } from '@/types/index'

const Languages = ({ languageStats, isLoading, error }: GitHubUserContextProps) => {
    const getLanguageColor = (language: string) => {
        return languageColors[language as keyof typeof languageColors]?.color || ''
    }

    if (error) return <p>Error: {error}</p>
    if (!languageStats) return <p>No language stats found</p>

    return (
        <Card isHoverable className="mb-4">
            <Skeleton isLoaded={!isLoading} className="w-full h-full">
                <CardHeader>
                    <h4 className="leading-none font-open-sans text-small text-default-600">
                        Languages I've learned: {languageStats.length}
                    </h4>
                </CardHeader>
                <CardBody>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {languageStats.map(({ language }) => {
                            const languageColor = getLanguageColor(language)
                            return (
                                <div key={language} className="flex-shrink-0">
                                    <Chip
                                        variant="faded"
                                        startContent={
                                            <p
                                                className="w-3 h-3 mr-1 rounded-full opacity-60"
                                                style={{ backgroundColor: languageColor }}
                                            />
                                        }
                                    >
                                        {language}
                                    </Chip>
                                </div>
                            )
                        })}
                    </div>
                </CardBody>
            </Skeleton>
        </Card>
    )
}

export default Languages
