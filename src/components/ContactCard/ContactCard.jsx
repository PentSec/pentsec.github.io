import { Card, CardHeader, CardBody, CardFooter, Link, Button } from '@nextui-org/react'
import { useGithubUser } from '../../context/GitHubUserContext'
import { FaGlobe, FaEnvelope, FaMapMarkerAlt, FaGithub } from 'react-icons/fa'
import { BsBuildings, BsTwitterX } from 'react-icons/bs'

export default function ContactCard() {
    const { userData, isLoading, error } = useGithubUser('PentSec')
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    const onOpen = () => {
        setIsOpen(true)
    }

    return (
        <Card isHoverable className="flex items-center content-center justify-center w-full mb-4">
            <CardHeader>
                <h4 className="font-open-sans text-small text-default-600">Contact to me.</h4>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <Link className="flex items-center space-x-2 text-default-600">
                            <FaMapMarkerAlt /> <span>Location</span>
                        </Link>
                        <span className="text-default-400">{userData?.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <Link
                            showAnchorIcon
                            href="https://maddonsmanager.github.io/"
                            isExternal
                            className="flex items-center space-x-2 text-default-600 hover:text-blue-600"
                        >
                            <BsBuildings /> <span>Company</span>
                        </Link>
                        <span className="text-default-400">{userData?.company}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <Link
                            showAnchorIcon
                            href="https://x.com/__J3ff_"
                            isExternal
                            className="flex items-center space-x-2 text-default-600 hover:text-blue-600"
                        >
                            <BsTwitterX /> <span>Xtwitter</span>
                        </Link>
                        <span className="text-default-400">{userData?.twitter_username}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <Link
                            href={userData?.html_url}
                            isExternal
                            showAnchorIcon
                            className="flex items-center space-x-2 text-default-600 hover:text-blue-600"
                        >
                            <FaGithub /> <span>GitHub</span>
                        </Link>
                        <span className="text-default-400">{userData?.html_url}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <Link
                            href="mailto:pentsec.2@protonmail.com"
                            className="flex items-center space-x-2 text-default-600 hover:text-blue-600"
                        >
                            <FaEnvelope /> <span>Email</span>
                        </Link>
                        <span className="text-default-400">pentsec.2@protonmail.com</span>
                    </div>
                </div>
            </CardBody>
            <CardFooter></CardFooter>
        </Card>
    )
}
