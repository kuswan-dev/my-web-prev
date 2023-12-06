import { useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { supabase } from '@/services/supabase'
import Button from '@/components/common/button'

interface ReplyFormProps {
    comment: CommentData,
    onUpdate: () => void
}

export default function ReplyForm({ comment, onUpdate }: ReplyFormProps) {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const session = useSession()

    async function replyComment() {
        setLoading(true)
        const data = {
            comment_id: comment.id,
            content,
            post_id: comment.post_id,
            user_id: session?.user.id
        }
        await supabase.from('replies_comment').insert(data)
        setContent('')
        setLoading(false)
        onUpdate()
    }

    return (
        <div className='bg-white shadow-md rounded-lg p-8 mt-8'>
            <p className='font-bold'>Reply This Comment</p>
            <textarea
                className='w-full h-28 bg-slate-200 rounded-lg outline-none p-4 my-4'
                placeholder='Write something ...'
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <Button
                loading={loading}
                disabled={content === ''}
                onClick={replyComment}
            >
                Add Reply
            </Button>
        </div>
    )
}
