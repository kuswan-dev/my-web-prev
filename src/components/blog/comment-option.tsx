import { BiEditAlt, BiErrorCircle, BiTrash } from 'react-icons/bi'

interface CommentOptionProps {
    isOwn: boolean,
    onClose: () => void,
    onDelete: () => void,
    onEdit: () => void,
    onReport: () => void
}

export default function CommentOption({ isOwn, onClose, onDelete, onEdit, onReport }: CommentOptionProps) {
    return (
        <>
            <div
                className='w-full h-full top-0 left-0 fixed z-10'
                onClick={onClose}
            />
            <div className='top-6 right-4 absolute flex flex-col text-slate-500 text-sm bg-white shadow-md rounded-lg p-2 z-20'>
                {isOwn ? (
                    <>
                        <button
                            className='flex items-center gap-x-2 rounded-md px-4 py-2 hover:text-black hover:bg-slate-200'
                            onClick={() => {
                                onEdit()
                                onClose()
                            }}
                        >
                            <BiEditAlt size='18' />
                            Edit
                        </button>
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
                    </>
                ) : (
                    <button
                        className='flex items-center gap-x-2 rounded-md px-4 py-2 hover:text-black hover:bg-slate-200'
                        onClick={() => {
                            onReport()
                            onClose()
                        }}
                    >
                        <BiErrorCircle size='18' />
                        Report
                    </button>
                )}
            </div>
        </>
    )
}
