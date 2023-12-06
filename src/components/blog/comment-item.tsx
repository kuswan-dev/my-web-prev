import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { BiCheck, BiChevronDown, BiChevronUp, BiDotsVerticalRounded, BiLike, BiMessageDots, BiSend } from 'react-icons/bi'
import dayjs from 'dayjs'
import ReplyItem from '@/components/blog/reply-item'
import CommentOption from '@/components/blog/comment-option'
import { supabase } from '@/services/supabase'
import ReplyForm from './reply-form'

interface CommentItemProps {
    comment: CommentData,
    onUpdate: () => void
}

export default function CommentItem({ comment, onUpdate }: CommentItemProps) {
    const [replies, setReplies] = useState<ReplyData[]>([])
    const [content, setContent] = useState(comment.content)
    const [editing, setEditing] = useState(false)
    const [showDetail, setShowDetail] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [showOption, setShowOption] = useState(false)
    const [showReplies, setShowReplies] = useState(false)
    const session = useSession()

    useEffect(() => {
        getReplies()
    }, [])

    async function getReplies() {
        const { data } = await supabase.from('replies_comment').select('*, users(*)').eq('comment_id', comment.id).order('created_at')
        setReplies(data as ReplyData[])
    }

    async function likeComment() {
        const likes = comment.likes
        likes.includes(session!.user.id) ? likes.splice(likes.indexOf(session!.user.id), 1) : likes.push(session!.user.id)
        await supabase.from('comments').update({ likes }).eq('id', comment.id)
        onUpdate()
    }

    async function deleteComment() {
        await supabase.from('comments').delete().eq('id', comment.id)
        await supabase.from('replies_comment').delete().eq('comment_id', comment.id)
        onUpdate()
    }

    async function editComment() {
        await supabase.from('comments').update({ content }).eq('id', comment.id)
        setEditing(false)
        onUpdate()
    }

    async function reportComment() {
        const reports = comment.reports
        reports.includes(session!.user.id) || reports.push(session!.user.id)
        await supabase.from('comments').update({ reports }).eq('id', comment.id)
    }

    return (
        <div className='relative flex gap-x-4'>
            <div className='flex flex-col items-center'>
                <Image
                    className='rounded-full'
                    src={comment.users.avatar_url}
                    alt=''
                    width='35'
                    height='35'
                />
                <button
                    className='text-slate-400 text-2xl'
                    onClick={() => setShowDetail(!showDetail)}
                >
                    {showDetail ? <BiChevronUp /> : <BiChevronDown />}
                </button>
            </div>
            <div className='w-full'>
                <div className='border rounded-lg p-3'>
                    <div className='flex items-center gap-x-4'>
                        <p className='font-bold'>{comment.users.full_name}</p>
                        <p className='flex-1 text-slate-500 text-xs'>{dayjs(comment.created_at).fromNow()}</p>
                        <button
                            className='rounded -mt-4 -mr-2 hover:bg-slate-200'
                            onClick={() => setShowOption(true)}
                        >
                            <BiDotsVerticalRounded size='20' />
                        </button>
                    </div>
                    {showDetail && !editing && <p className='text-sm mt-2'>{comment.content}</p>}
                    {showDetail && editing && (
                        <div className='flex items-start gap-x-2 mt-2'>
                            <textarea
                                className='w-full text-sm bg-slate-200 rounded-lg outline-none p-2'
                                placeholder='Write something ...'
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                            <button onClick={editComment}><BiCheck size='24' /></button>
                        </div>
                    )}
                </div>
                {showDetail && (
                    <div className='flex justify-between mt-2'>
                        <div className='flex gap-x-2'>
                            <button
                                className={`${comment.likes.includes(session?.user.id ?? '') && 'bg-slate-200'} flex items-center gap-x-1 text-slate-500 rounded-md px-1 hover:bg-slate-200`}
                                onClick={likeComment}
                            >
                                {comment.likes.length}
                                <BiLike />
                            </button>
                            {replies.length > 0 && (
                                <button
                                    className={`${showReplies && 'bg-slate-200'} flex items-center gap-x-1 text-slate-500 rounded-md px-1 hover:bg-slate-200`}
                                    onClick={() => setShowReplies(!showReplies)}
                                >
                                    {replies.length}
                                    <BiMessageDots />
                                </button>
                            )}
                        </div>
                        <button
                            className='text-sm'
                            onClick={() => {
                                setShowForm(!showForm)
                                setShowReplies(true)
                            }}
                        >
                            {showForm ? 'Replying' : 'Reply'}
                        </button>
                    </div>
                )}
                {showForm && (
                    <ReplyForm
                        comment={comment}
                        onUpdate={() => {
                            setShowForm(false)
                            getReplies()
                        }}
                    />
                )}
                {showReplies && (
                    <div className='flex flex-col gap-y-4 mt-4'>
                        {replies.map(reply => (
                            <ReplyItem
                                key={reply.id}
                                reply={reply}
                                onUpdate={getReplies}
                            />
                        ))}
                    </div>
                )}
            </div>
            {showOption && (
                <CommentOption
                    isOwn={comment.user_id === session?.user.id}
                    onClose={() => setShowOption(false)}
                    onDelete={deleteComment}
                    onEdit={() => setEditing(true)}
                    onReport={reportComment}
                />
            )}
        </div>
    )
}
