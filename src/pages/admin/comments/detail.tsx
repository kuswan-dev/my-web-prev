import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { BiDotsVerticalRounded, BiErrorCircle, BiLike } from 'react-icons/bi'
import { supabase } from '@/services/supabase'
import Breadcrumbs from '@/components/admin/breadcrumbs'
import ReplyItem from '@/components/admin/reply-item'
import CommentOption from '@/components/admin/comment-option'
import ReplyForm from '@/components/admin/reply-form'
import { useSession } from '@supabase/auth-helpers-react'

export default function Detail() {
    const [comment, setComment] = useState<CommentData>()
    const [replies, setReplies] = useState<ReplyData[]>([])
    const [showOption, setShowOption] = useState(false)
    const router = useRouter()
    const commentId = router.query.id
    const session = useSession()

    useEffect(() => {
        commentId && getComment()
    }, [commentId])

    async function getComment() {
        const { data: commentData } = await supabase.from('comments').select('*, users(*)').eq('id', commentId).single()
        const { data: repliesData } = await supabase.from('replies_comment').select('*, users(*)').eq('comment_id', commentId).order('created_at')
        setComment(commentData)
        setReplies(repliesData ?? [])

        await supabase.from('comments').update({ read: true }).eq('id', commentId)
    }

    async function likeComment() {
        const likes = comment!.likes
        likes.includes(session!.user.id) ? likes.splice(likes.indexOf(session!.user.id), 1) : likes.push(session!.user.id)
        await supabase.from('comments').update({ likes }).eq('id', comment!.id)
        getComment()
    }

    async function deleteComment() {
        await supabase.from('comments').delete().eq('id', comment?.id)
        await supabase.from('replies_comment').delete().eq('comment_id', comment?.id)
        router.back()
    }

    return (
        <main className='m-8'>
            <Breadcrumbs />
            {comment && (
                <div className='relative flex items-start gap-x-4 bg-white shadow-md rounded-lg p-4 mt-8'>
                    <Image
                        className='rounded-full'
                        src={comment.users.avatar_url}
                        alt=''
                        width='35'
                        height='35'
                    />
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
                            <p className='text-sm mt-2'>{comment.content}</p>
                        </div>
                        <button
                            className={`${comment.likes.includes(session!.user.id) && 'bg-slate-200'} flex items-center gap-x-1 text-slate-500 rounded-md px-1 mt-2 hover:bg-slate-200`}
                            onClick={likeComment}
                        >
                            {comment.likes.length}
                            <BiLike />
                        </button>
                    </div>
                    {showOption && (
                        <CommentOption
                            onClose={() => setShowOption(false)}
                            onDelete={deleteComment}
                        />
                    )}
                </div>
            )}
            {comment && comment.reports.length > 0 && (
                <div className='flex items-center justify-center gap-x-2 bg-yellow-50 border border-yellow-500 rounded-lg p-2 mt-4'>
                    <BiErrorCircle className='text-yellow-500' />
                    <p className='text-yellow-500 text-sm'>This comment is reported by {comment.reports.length} users</p>
                </div>
            )}
            <p className='mt-4'>Replies</p>
            <div className='flex flex-col gap-y-4 bg-white shadow-md rounded-lg p-4 mt-4'>
                {replies.map(reply => (
                    <ReplyItem
                        key={reply.id}
                        reply={reply}
                        onUpdate={getComment}
                    />
                ))}
                {replies.length === 0 && (
                    <p className='text-slate-500 text-center my-4'>Not reply yet.</p>
                )}
            </div>
            <ReplyForm
                comment={comment!}
                onUpdate={getComment}
            />
        </main>
    )
}
