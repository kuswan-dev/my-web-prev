import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import dayjs from 'dayjs'
import hljs from 'highlight.js'
import { supabase } from '@/services/supabase'
import SignInOption from '@/components/blog/sign-in-option'
import Navbar from '@/components/blog/navbar'
import CommentForm from '@/components/blog/comment-form'
import CommentItem from '@/components/blog/comment-item'
import Newsletter from '@/components/blog/newsletter'
import Footer from '@/components/blog/footer'

interface PostDetailProps {
    post: PostData
}

export default function PostDetail({ post }: PostDetailProps) {
    const [comments, setComments] = useState<CommentData[]>([])
    const [commentCount, setCommentCount] = useState(0)
    const session = useSession()

    useEffect(() => {
        hljs.highlightAll()
        getComments()
    }, [])

    async function getComments() {
        const { data: comments } = await supabase.from('comments').select('*, users(*)').eq('post_id', post.id).order('created_at')
        const { data: replies } = await supabase.from('replies_comment').select().eq('post_id', post.id)
        setComments(comments as CommentData[])
        setCommentCount(comments!.length + replies!.length)
    }

    return (
        <>
            <Navbar />
            <main>
                <div className='m-8'>
                    <div className='text-slate-500 text-sm flex gap-x-4'>
                        {post.tags.map((tag, index) => (
                            <p key={index}>#{tag}</p>
                        ))}
                    </div>
                    <h1 className='font-bold text-3xl mt-2'>{post.title}</h1>
                    <p className='text-slate-500 text-sm mt-2'>
                        Last updated: {dayjs(post.updated_at).format('D MMM YYYY')}
                    </p>
                    <div
                        className='mt-6 post-content'
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
                {session ? (
                    <CommentForm
                        postId={post.id!}
                        onUpdate={getComments}
                    />
                ) : (
                    <SignInOption />
                )}
                <div className='bg-white shadow-md rounded-lg p-8 m-8'>
                    <p className='font-bold text-xl'>Comments ({commentCount})</p>
                    <div className='flex flex-col gap-y-4 mt-8'>
                        {comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                onUpdate={getComments}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <Newsletter />
            <Footer />
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const postUrl = context.params?.postUrl
    const { data } = await supabase.from('posts').select().eq('post_url', postUrl).eq('published', true).single()
    if (data) {
        await supabase.from('posts').update({ views: data.views + 1 }).eq('id', data.id)
        return { props: { post: data } }
    } else {
        return { notFound: true }
    }
}
