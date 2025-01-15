import { Card, CardHeader, CardBody, CardFooter, Link, Skeleton } from '@nextui-org/react'
import { FaEnvelope, FaMapMarkerAlt, FaGithub } from 'react-icons/fa'
import { BsBuildings, BsTwitterX } from 'react-icons/bs'
import { GitHubUserContextProps } from '@/types'

export default function ContactCard({ userData, isLoading, error }: GitHubUserContextProps) {
    console.log(userData)
    // if (error) return <p>Error: {error}</p>

    return (
        <Card isHoverable className="flex items-center content-center justify-center w-full mb-4">
            <Skeleton isLoaded={!isLoading} className="w-full h-full">
                <CardHeader>
                    <h4 className="font-open-sans text-small text-default-600">Contact to me.</h4>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <Link className="flex items-center space-x-2 text-default-600">
                                <FaMapMarkerAlt /> <span>Location</span>
                            </Link>
                            <span className="text-default-400">
                                {userData?.location || 'Unknown'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <Link
                                showAnchorIcon
                                href="https://maddonsmanager.github.io/"
                                isExternal
                                color="foreground"
                                underline="hover"
                            >
                                <BsBuildings className="mr-2" /> <span>Company</span>
                            </Link>
                            <span className="text-default-400">
                                {userData?.company || 'Unknown'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <Link
                                showAnchorIcon
                                href={`https://x.com/${userData?.twitter_username}`}
                                isExternal
                                color="foreground"
                                underline="hover"
                            >
                                <BsTwitterX className="mr-2" /> <span>Xtwitter</span>
                            </Link>
                            <span className="text-default-400">
                                {userData?.twitter_username || 'Unknown'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <Link
                                href={userData?.html_url}
                                isExternal
                                showAnchorIcon
                                color="foreground"
                                underline="hover"
                            >
                                <FaGithub className="mr-2" /> <span>GitHub</span>
                            </Link>
                            <span className="text-default-400">
                                {userData?.html_url || 'Unknown'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <Link
                                href="mailto:pentsec.2@protonmail.com"
                                color="foreground"
                                underline="hover"
                            >
                                <FaEnvelope className="mr-2" /> <span>Email</span>
                            </Link>
                            <span className="text-default-400">pentsec.2@protonmail.com</span>
                        </div>
                    </div>
                </CardBody>
                <CardFooter></CardFooter>
            </Skeleton>
        </Card>
    )
}
