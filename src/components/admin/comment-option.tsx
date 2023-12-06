import { BiTrash } from 'react-icons/bi'

interface CommentOptionProps {
    onClose: () => void,
    onDelete: () => void
}

export default function CommentOption({ onClose, onDelete }: CommentOptionProps) {
    return (
        <>
            <div
                className='w-full h-full top-0 left-0 fixed z-10'
                onClick={onClose}
            />
            <div className='top-10 right-8 absolute flex flex-col text-slate-500 text-sm bg-white shadow-md rounded-lg p-2 z-20'>
                <button
                    className='flex items-center gap-x-2 rounded-md px-4 py-2 hover:text-black hover:bg-slate-200'
                    onClick={() => {
                        onDelete()
                        onClose()
                    }}
                >
                    <BiTrash size='18' />
                    Delete
                </button>
            </div>
        </>
    )
}
