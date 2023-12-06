import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '@/services/supabase'
import Breadcrumbs from '@/components/admin/breadcrumbs'
import Editor from '@/components/editor/editor'
import PostTag from '@/components/admin/post-tag'
import Button from '@/components/common/button'

export default function EditPost() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const postId = router.query.id

    useEffect(() => {
        async function getPost() {
            const { data } = await supabase.from('posts').select().eq('id', postId).single()
            setTitle(data.title)
            setContent(data.content)
            setTags(data.tags)
        }
        postId && getPost()
    }, [postId])

    async function editPost() {
        setLoading(true)
        const data = {
            content,
            post_url: title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
            tags,
            title,
            updated_at: new Date()
        }
        await supabase.from('posts').update(data).eq('id', postId)
        router.back()
    }

    return (
        <main className='h-screen flex flex-col p-8'>
            <Breadcrumbs />
            <div className='flex justify-between mt-8'>
                <h1 className='font-bold text-2xl'>Edit Post</h1>
                <Button
                    loading={loading}
                    onClick={editPost}
                >
                    Edit
                </Button>
            </div>
            <input
                className='shadow-md rounded-lg outline-none px-4 py-2.5 my-4'
                placeholder='Title Post'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            {content && (
                <Editor
                    value={content}
                    onChange={setContent}
                />
            )}
            <PostTag
                value={tags}
                onChange={setTags}
            />
        </main>
    )
}
