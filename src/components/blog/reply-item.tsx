import Image from 'next/image'
import { useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import dayjs from 'dayjs'
import { BiCheck, BiDotsVerticalRounded, BiLike } from 'react-icons/bi'
import { supabase } from '@/services/supabase'
import CommentOption from './comment-option'

interface ReplyItemProps {
    reply: ReplyData,
    onUpdate: () => void
}

export default function ReplyItem({ reply, onUpdate }: ReplyItemProps) {
    const [content, setContent] = useState(reply.content)
    const [editing, setEditing] = useState(false)
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

    async function editReply() {
        await supabase.from('replies_comment').update({ content }).eq('id', reply.id)
        setEditing(false)
        onUpdate()
    }

    async function reportReply() {
        const reports = reply.reports
        reports.includes(session!.user.id) || reports.push(session!.user.id)
        await supabase.from('replies_comment').update({ reports }).eq('id', reply.id)
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
                        <button
                            className='rounded -mt-4 -mr-2 hover:bg-slate-200'
                            onClick={() => setShowOption(true)}
                        >
                            <BiDotsVerticalRounded size='20' />
                        </button>
                    </div>
                    {!editing ? (
                        <p className='text-sm mt-2'>{reply.content}</p>
                    ) : (
                        <div className='flex items-start gap-x-2 mt-2'>
                            <textarea
                                className='w-full text-sm bg-slate-200 rounded-lg outline-none p-2'
                                placeholder='Write something ...'
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                            <button onClick={editReply}><BiCheck size='24' /></button>
                        </div>
                    )}
                </div>
                <button
                    className={`${reply.likes.includes(session!.user.id) && 'bg-slate-200'} flex items-center gap-x-1 text-slate-500 rounded-md px-1 mt-2`}
                    onClick={likeReply}
                >
                    {reply.likes.length}
                    <BiLike />
                </button>
            </div>
            {showOption && (
                <CommentOption
                    isOwn={reply.user_id === session?.user.id}
                    onClose={() => setShowOption(false)}
                    onDelete={deleteReply}
                    onEdit={() => setEditing(true)}
                    onReport={reportReply}
                />
            )}
        </div>
    )
}
