import Image from 'next/image'
import dayjs from 'dayjs'
import { BiErrorCircle } from 'react-icons/bi'

interface CommentItemProps {
    comment: CommentData,
    onClick: () => void
}

export default function CommentItem({ comment, onClick }: CommentItemProps) {
    return (
        <div
            className={`${comment.read ? 'bg-white' : 'bg-slate-200'} flex items-start gap-x-4 border-b border-b-slate-300 p-2 cursor-pointer`}
            onClick={onClick}
        >
            <Image
                className='rounded-full'
                src={comment.users.avatar_url}
                alt=''
                width='35'
                height='35'
            />
            <div>
                <p className='font-bold'>{comment.users.full_name}</p>
                <p className='text-slate-500 text-xs'>{dayjs(comment.created_at).fromNow()}</p>
                <p className='text-sm mt-2'>{comment.content}</p>
            </div>
            {comment.reports.length > 0 && (
                <BiErrorCircle className='text-yellow-500' size='44'/>
            )}
        </div>
    )
}
