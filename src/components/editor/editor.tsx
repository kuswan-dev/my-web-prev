import { useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { lowlight } from 'lowlight'
import js from 'highlight.js/lib/languages/javascript'
import { BiBold, BiBracket, BiCode, BiEraser, BiHighlight, BiImage, BiItalic, BiLink, BiListOl, BiListUl, BiStrikethrough, BiUnderline } from 'react-icons/bi'
import AddLink from './add-link'
import AddImage from './add-image'

interface EditorProps {
    value: string,
    onChange: (content: string) => void
}

lowlight.registerLanguage('js', js)

export default function Editor({ value, onChange }: EditorProps) {
    const [showAddLink, setShowAddLink] = useState(false)
    const [showAddImage, setShowAddImage] = useState(false)

    const editor = useEditor({
        content: value,
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            CodeBlockLowlight.configure({
                defaultLanguage: 'js',
                HTMLAttributes: { 'class': 'language-js' },
                lowlight
            }),
            Highlight,
            Image,
            Link.configure({ openOnClick: false }),
            Placeholder,
            Underline
        ],
        onUpdate: e => onChange(e.editor.getHTML())
    })

    const items = [
        {
            icon: 'H1',
            isActive: editor?.isActive('heading', { level: 1 }),
            action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run()
        },
        {
            icon: 'H2',
            isActive: editor?.isActive('heading', { level: 2 }),
            action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run()
        },
        {
            icon: 'H3',
            isActive: editor?.isActive('heading', { level: 3 }),
            action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run()
        },
        {
            icon: <BiBold size='20' />,
            isActive: editor?.isActive('bold'),
            action: () => editor?.chain().focus().toggleBold().run()
        },
        {
            icon: <BiItalic size='20' />,
            isActive: editor?.isActive('italic'),
            action: () => editor?.chain().focus().toggleItalic().run()
        },
        {
            icon: <BiUnderline size='20' />,
            isActive: editor?.isActive('underline'),
            action: () => editor?.chain().focus().toggleUnderline().run()
        },
        {
            icon: <BiStrikethrough size='20' />,
            isActive: editor?.isActive('strike'),
            action: () => editor?.chain().focus().toggleStrike().run()
        },
        {
            icon: <BiHighlight size='20' />,
            isActive: editor?.isActive('highlight'),
            action: () => editor?.chain().focus().toggleHighlight().run()
        },
        {
            icon: <BiListOl size='24' />,
            isActive: editor?.isActive('orderedList'),
            action: () => editor?.chain().focus().toggleOrderedList().run()
        },
        {
            icon: <BiListUl size='24' />,
            isActive: editor?.isActive('bulletList'),
            action: () => editor?.chain().focus().toggleBulletList().run()
        },
        {
            icon: <BiBracket />,
            isActive: editor?.isActive('blockquote'),
            action: () => editor?.chain().focus().toggleBlockquote().run()
        },
        {
            icon: <BiCode size='22' />,
            isActive: editor?.isActive('codeBlock'),
            action: () => editor?.chain().focus().toggleCodeBlock().run()
        },
        {
            icon: <BiEraser size='20' />,
            action: () => editor?.chain().focus().clearNodes().run()
        },
        {
            icon: <BiLink size='20' />,
            isActive: editor?.isActive('link'),
            action: () => {
                const previousUrl = editor?.getAttributes('link').href
                if (previousUrl) {
                    editor.chain().focus().extendMarkRange('link').unsetLink().run()
                } else {
                    setShowAddLink(true)
                }
            }
        },
        {
            icon: <BiImage size='22' />,
            action: () => setShowAddImage(true)
        }
    ]

    return (
        <div className='relative flex flex-col flex-1 shadow-md rounded-lg overflow-hidden'>
            <div className='flex flex-wrap gap-2 bg-slate-200 p-4'>
                {items.map((item, index) => (
                    <button
                        key={index}
                        className={`${item.isActive ? 'bg-slate-300' : 'bg-white shadow-md'} rounded-md p-1`}
                        onClick={item.action}
                    >
                        {item.icon}
                    </button>
                ))}
            </div>
            <EditorContent
                className='flex-1 bg-white p-4 cursor-text overflow-y-scroll post-content'
                spellCheck={false}
                editor={editor}
                onClick={() => editor?.commands.focus()}
            />
            {showAddLink && (
                <AddLink
                    onAdd={url => {
                        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
                        setShowAddLink(false)
                    }}
                    onClose={() => setShowAddLink(false)}
                />
            )}
            {showAddImage && (
                <AddImage
                    onAdd={url => {
                        editor?.chain().focus().setImage({ src: url }).run()
                        setShowAddImage(false)
                    }}
                    onClose={() => setShowAddImage(false)}
                />
            )}
        </div>
    )
}
