import { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, ModalContent } from "@heroui/react"
import { marked } from 'marked'
import 'github-markdown-css/github-markdown.css'

export default function ModalSkills({ onClose }: { onClose: () => void }) {
    const [readmeContent, setReadmeContent] = useState('')

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/PentSec/Pentsec/main/README.md')
            .then((response) => response.text())
            .then((markdown) => {
                const htmlContent = marked(markdown)
                const safeHtml = DOMPurify.sanitize(htmlContent as string)
                setReadmeContent(safeHtml)
            })
            .catch((error) => console.error('Error al obtener el README:', error))
    }, [])

    return (
        <Modal
            scrollBehavior="inside"
            backdrop="blur"
            size="5xl"
            isOpen={true}
            onClose={onClose}
            classNames={{
                body: 'py-6',
                base: 'bg-[#19172c] dark:bg-[#0d1117] text-[#a8b0d3]',
                header: 'border-b-[1px]',
                footer: 'border-t-[1px]',
                closeButton: 'hover:bg-white/5 active:bg-white/10'
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex items-center justify-center gap-1">
                            What are my Skill Stats?
                        </ModalHeader>
                        <ModalBody>
                            <div className="markdown-body">{parse(readmeContent)}</div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
