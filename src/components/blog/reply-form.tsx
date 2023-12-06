import { useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { BiSend } from 'react-icons/bi'
import { supabase } from '@/services/supabase'

interface ReplyFormProps {
    comment: CommentData,
    onUpdate: () => void
}

export default function ReplyForm({ comment, onUpdate }: ReplyFormProps) {
    const [content, setContent] = useState('')
    const session = useSession()

    async function replyComment() {
        const data = {
            comment_id: comment.id,
            content,
            post_id: comment.post_id,
            user_id: session?.user.id
        }
        await supabase.from('replies_comment').insert(data)
        setContent('')
        onUpdate()
    }

    return (
        <div className='flex items-start gap-x-2 my-8'>
            <textarea
                className='w-full text-sm bg-slate-200 rounded-lg outline-none p-3'
                placeholder='Write something ...'
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <button onClick={replyComment}><BiSend size='24' /></button>
        </div>
    )
}
