import { supabase } from '@/services/supabase'
import Link from 'next/link'
import { BiEditAlt, BiGlobe, BiHide, BiShow, BiTrash } from 'react-icons/bi'

interface PostOptionProps {
    post: PostData,
    onClose: () => void,
    onDelete: () => void,
    onUpdate: () => void
}

export default function PostOption({ post, onClose, onDelete, onUpdate }: PostOptionProps) {
    async function publishPost() {
        await supabase.from('posts').update({ 'published': !post.published }).eq('id', post.id)
        onUpdate()
    }

    return (
        <div>
            <div
                className='w-full h-full top-0 left-0 fixed z-10'
                onClick={onClose}
            />
            <div className='top-12 right-8 absolute flex flex-col text-slate-500 text-sm bg-white shadow-md rounded-lg p-2 z-20'>
                <Link
                    className='flex items-center gap-x-2 rounded-md px-4 py-2 hover:text-black hover:bg-slate-200'
                    href={`/blog/${post.post_url}`}
                    target='blank'
                >
                    <BiGlobe size='18' />
                    Preview
                </Link>
                <button
                    className='flex items-center gap-x-2 rounded-md px-4 py-2 hover:text-black hover:bg-slate-200'
                    onClick={() => {
                        onClose()
                        publishPost()
                    }}
                >
                    {post.published ? <BiHide size='18' /> : <BiShow size='18' />}
                    {post.published ? 'Not Publish' : 'Publish'}
                </button>
                <Link
                    className='flex items-center gap-x-2 rounded-md px-4 py-2 hover:text-black hover:bg-slate-200'
                    href={`/admin/posts/edit-post?id=${post.id}`}
                >
                    <BiEditAlt size='18' />
                    Edit
                </Link>
                <button
                    className='flex items-center gap-x-2 rounded-md px-4 py-2 hover:text-black hover:bg-slate-200'
                    onClick={() => {
                        onClose()
                        onDelete()
                    }}
                >
                    <BiTrash size='18' />
                    Delete
                </button>
            </div>
        </div>
    )
}
