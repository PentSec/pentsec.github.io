import { Card, CardHeader, CardBody, CardFooter, ScrollShadow, Link } from '@nextui-org/react'
import { useEffect, useState, useRef, useCallback } from 'react'
import languageColors from '@/data/colors.json'
import { FaRegStar } from 'react-icons/fa'
import { GoRepoForked } from 'react-icons/go'
import { motion, AnimatePresence } from 'framer-motion'
import { GitHubUserContextProps } from '@/types'

const MotionCard = motion.create(Card)

const cardVariants = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.1
        }
    }
}

export default function ReposCard({ userRepos, isLoading, error }: GitHubUserContextProps) {
    const [itemToShow, setItemToShow] = useState(8)
    const observer = useRef<IntersectionObserver | null>(null)
    const lastRepoElementRef = useRef<HTMLDivElement | null>(null)
    const [searchValue] = useState('')

    const loadMore = useCallback(() => {
        setItemToShow((prev) => prev + 2)
    }, [])

    const filterRepos = () => {
        if (!Array.isArray(userRepos)) return []

        const sortedRepos = [...userRepos].sort(
            (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )

        return sortedRepos.filter((repo) =>
            repo.name?.toLowerCase().includes(searchValue.toLowerCase())
        )
    }

    const filteredRepos = filterRepos()

    const getLanguageColor = (language: string | undefined | null): string => {
        return languageColors[language as keyof typeof languageColors]?.color || ''
    }

    useEffect(() => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && itemToShow < filteredRepos.length) {
                    loadMore()
                }
            },
            { threshold: 1.0 }
        )
        if (lastRepoElementRef.current) observer.current.observe(lastRepoElementRef.current)
        return () => {
            if (observer.current) observer.current.disconnect()
        }
    }, [itemToShow, filteredRepos])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!Array.isArray(userRepos)) return <p>No repositories found</p>

    return (
        <ScrollShadow hideScrollBar className="h-[calc(65vh-0px)] overflow-auto ">
            <div className="grid grid-cols-2 gap-4 p-2 mb-4 overflow-auto">
                {filteredRepos.slice(0, itemToShow).map((repo, index) => {
                    const isLastElement = index === itemToShow - 1
                    return (
                        <AnimatePresence key={repo.id}>
                            <MotionCard
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.2, delay: index * 0.1 }}
                                key={repo.id}
                                className="py-4"
                                shadow="sm"
                                ref={isLastElement ? lastRepoElementRef : null}
                            >
                                <CardHeader className="flex-col items-start px-4 pt-2 pb-0 space-y-2">
                                    <Link
                                        isExternal
                                        showAnchorIcon
                                        className="text-tiny lg:text-medium font-open-sans"
                                        href={repo.html_url}
                                    >
                                        {repo.name}
                                    </Link>
                                    <small className="text-default-500">
                                        Create date:{' '}
                                        {new Date(repo.created_at).toLocaleDateString()}
                                    </small>
                                </CardHeader>
                                <CardBody className="flex-col items-start px-4 pt-2 pb-0 mb-4">
                                    <h4 className="text-tiny text-default-500">
                                        {repo.description}
                                    </h4>
                                </CardBody>
                                <CardFooter className="flex flex-col justify-between py-2 overflow-visible lg:flex-row">
                                    <div className="flex items-center mb-2 space-x-2 lg:mb-0">
                                        <span className="flex items-center">
                                            <FaRegStar className="mr-1" /> {repo.stargazers_count}
                                        </span>
                                        <span className="flex items-center">
                                            <GoRepoForked className="mr-1" /> {repo.forks_count}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div
                                            className="w-3 h-3 mr-1 rounded-full opacity-60"
                                            style={{
                                                backgroundColor: getLanguageColor(repo.language)
                                            }}
                                        />
                                        <span>{repo.language ? repo.language : ''}</span>
                                    </div>
                                </CardFooter>
                            </MotionCard>
                        </AnimatePresence>
                    )
                })}
            </div>
        </ScrollShadow>
    )
}
