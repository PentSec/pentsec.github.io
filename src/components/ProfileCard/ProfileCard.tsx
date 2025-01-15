import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
    Tooltip,
    Skeleton
} from '@nextui-org/react'
import { useState } from 'react'
import { ModalSkills } from '@/components'
import { UserRepo } from '@/types'

interface ProfileCardProps {
    userData: UserRepo
    isLoading: boolean
    error: string
}

export default function ProfileCard({ userData, isLoading, error }: ProfileCardProps) {
    const [isModalOpen, setModalIsOpen] = useState<boolean | undefined>(false)

    const openModal = () => {
        setModalIsOpen(true)
        console.log(setModalIsOpen)
    }
    const closeModal = () => setModalIsOpen(false)

    // if (error) return <p>Error: {error}</p>

    return (
        <>
            <Tooltip
                showArrow
                offset={-150}
                crossOffset={-50}
                placement="right"
                content={
                    <div className="px-1 py-2">
                        <div className="font-bold text-small">Do you want to see my Skills?</div>
                        <div className="text-tiny">Okay, let's click</div>
                    </div>
                }
                classNames={{
                    base: ['before:bg-neutral-400 dark:before:bg-white'],
                    content: [
                        'py-2 px-4 shadow-xl',
                        'text-black bg-gradient-to-br from-white to-neutral-400'
                    ]
                }}
            >
                <Card isPressable isHoverable className="w-full mb-4" onPress={openModal}>
                    <div className="flex items-center justify-center justify-col mt-2">
                        <Avatar
                            isBordered
                            color="success"
                            radius="full"
                            className="w-32 h-32 mb-4 text-large "
                            src={userData?.avatar_url}
                        />
                    </div>
                    <Skeleton isLoaded={!isLoading} className="w-full h-full">
                        <CardHeader className="items-center justify-center justify-col">
                            <div className="flex flex-col items-center justify-center gap-1">
                                <h4 className="text-2xl font-semibold leading-none text-default-600">
                                    {userData?.name ?? 'Unknown'}
                                </h4>
                                <h5 className="text-lg tracking-tight text-default-400">
                                    @{userData?.login}
                                </h5>
                            </div>
                        </CardHeader>
                        <CardBody className="h-auto px-3 py-0 overflow-hidden font-rubik text-small text-default-400">
                            <p>{userData?.bio}</p>
                            <span className="pt-2">
                                #Freed0m4All
                                <span className="py-2" aria-label="computer" role="img">
                                    💻
                                </span>
                            </span>
                        </CardBody>
                        <CardFooter className="gap-3">
                            <div className="flex gap-1">
                                <p className="font-semibold text-default-400 text-small">
                                    {userData?.following}
                                </p>
                                <p className=" text-default-400 text-small">Following</p>
                            </div>
                            <div className="flex gap-1">
                                <p className="font-semibold text-default-400 text-small">
                                    {userData?.followers}
                                </p>
                                <p className="text-default-400 text-small">Followers</p>
                            </div>
                        </CardFooter>
                    </Skeleton>
                </Card>
            </Tooltip>
            {isModalOpen && <ModalSkills onClose={closeModal} />}
        </>
    )
}
