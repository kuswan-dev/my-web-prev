import { useState } from 'react'
import { BiX } from 'react-icons/bi'
import Button from '../common/button'

interface AddLinkProps {
    onAdd: (url: string) => void,
    onClose: () => void
}

export default function AddLink({ onAdd, onClose }: AddLinkProps) {
    const [url, setUrl] = useState('')

    return (
        <div className='w-full h-full absolute flex items-start justify-center bg-black/20 pt-28'>
            <div className='w-[25rem] relative bg-white rounded-lg p-8'>
                <h1 className='font-bold'>Add Link</h1>
                <button
                    className='top-4 right-4 absolute'
                    onClick={onClose}
                >
                    <BiX size='28' />
                </button>
                <input
                    className='w-full border border-slate-500 rounded-lg outline-none px-4 py-2 my-6'
                    placeholder='https://example.com'
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
                <Button
                    disabled={!url.match(/(?:https?):\/\/[\n\S]+/g)}
                    onClick={() => onAdd(url)}
                >
                    Add Link
                </Button>
            </div>
        </div>
    )
}
