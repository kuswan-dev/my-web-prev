import Image from 'next/image'
import { useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import dayjs from 'dayjs'
import { supabase } from '@/services/supabase'
import { BiDotsVerticalRounded, BiErrorCircle, BiLike } from 'react-icons/bi'
import CommentOption from '@/components/admin/comment-option'

interface ReplyItemProps {
    reply: ReplyData,
    onUpdate: () => void
}

export default function ReplyItem({ reply, onUpdate }: ReplyItemProps) {
    const [showOption, setShowOption] = useState(false)
    const session = useSession()

    async function likeReply() {
        const likes = reply.likes
        likes.includes(session!.user.id) ? likes.splice(likes.indexOf(session!.user.id), 1) : likes.push(session!.user.id)
        await supabase.from('replies_comment').update({ likes }).eq('id', reply.id)
        onUpdate()
    }

    async function deleteReply() {
        await supabase.from('replies_comment').delete().eq('id', reply.id)
        onUpdate()
    }

    return (
        <div className='relative flex items-start gap-x-4'>
            <Image
                className='rounded-full'
                src={reply.users.avatar_url}
                alt=''
                width='35'
                height='35'
            />
            <div className='w-full'>
                <div className='border rounded-lg p-3'>
                    <div className='flex items-center gap-x-4'>
                        <p className='font-bold'>{reply.users.full_name}</p>
                        <p className='flex-1 text-slate-500 text-xs'>{dayjs(reply.created_at).fromNow()}</p>
                        {reply.reports.length > 0 && (
                            <BiErrorCircle className='text-yellow-500 -mt-4 -mr-3' size='18' />
                        )}
                        <button
                            className='rounded -mt-4 -mr-2 hover:bg-slate-200'
                            onClick={() => setShowOption(true)}
                        >
                            <BiDotsVerticalRounded size='20' />
                        </button>
                    </div>
                    <p className='text-sm mt-2'>{reply.content}</p>
                </div>
                <button
                    className={`${reply.likes.includes(session!.user.id) && 'bg-slate-200'} flex items-center gap-x-1 text-slate-500 rounded-md px-1 mt-2 hover:bg-slate-200`}
                    onClick={likeReply}
                >
                    {reply.likes.length}
                    <BiLike />
                </button>
            </div>
            {showOption && (
                <CommentOption
                    onClose={() => setShowOption(false)}
                    onDelete={deleteReply}
                />
            )}
        </div>
    )
}
