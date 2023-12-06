import { useRouter } from 'next/router'
import { useState } from 'react'
import { supabase } from '@/services/supabase'
import Editor from '@/components/editor/editor'
import Breadcrumbs from '@/components/admin/breadcrumbs'
import Button from '@/components/common/button'
import PostTag from '@/components/admin/post-tag'

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function createPost() {
        setLoading(true)
        const data = {
            content,
            post_url: title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
            published: true,
            tags,
            title
        }
        await supabase.from('posts').insert(data)
        router.back()
    }

    return (
        <main className='h-screen flex flex-col p-8'>
            <Breadcrumbs />
            <div className='flex justify-between mt-8'>
                <h1 className='font-bold text-2xl'>Create Post</h1>
                <div className='flex gap-x-2'>
                    <Button
                        loading={loading}
                        onClick={createPost}
                    >
                        Publish
                    </Button>
                    <Button
                        variant='outline'
                    >
                        Save
                    </Button>
                </div>
            </div>
            <input
                className='shadow-md rounded-lg outline-none px-4 py-2.5 my-4'
                placeholder='Title Post'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <Editor
                value={content}
                onChange={setContent}
            />
            <PostTag
                value={tags}
                onChange={setTags}
            />
        </main>
    )
}
