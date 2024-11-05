import { useGithubUser } from '../../context/GitHubUserContext'
import { Card, CardBody, CardHeader, Progress } from '@nextui-org/react'
import languageColors from '../../data/colors.json'

const Languages = () => {
    const { languageStats, isLoading, error, count } = useGithubUser()

    const getLanguageColor = (language) => {
        return languageColors[language]?.color || ''
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!languageStats) return <p>No language stats found</p>

    return (
        <Card is isHoverable className="mb-4">
            <CardHeader>
                <h4 className="leading-none font-open-sans text-small text-default-600">
                    Languages used in my repositories:{count.size}
                </h4>
            </CardHeader>
            <CardBody>
                <div>
                    {languageStats.map(({ language, percentage, count }) => {
                        const languageColor = getLanguageColor(language)
                        return (
                            <div key={language} style={{ marginBottom: '1px' }}>
                                <Progress
                                    label={
                                        <div className="flex items-center">
                                            <div
                                                className="w-3 h-3 mr-1 rounded-full opacity-60"
                                                style={{ backgroundColor: languageColor }}
                                            />
                                            <span>
                                                {language} : {count}
                                            </span>
                                        </div>
                                    }
                                    size="sm"
                                    value={parseFloat(percentage)}
                                    color="primary"
                                    showValueLabel={true}
                                />
                            </div>
                        )
                    })}
                </div>
            </CardBody>
        </Card>
    )
}

export default Languages
