import { useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import PostOption from './post-option'
import Modal from '@/components/common/modal'
import { supabase } from '@/services/supabase'

interface PostItemProps {
    post: PostData,
    onUpdate: () => void
}

export default function PostItem({ post, onUpdate }: PostItemProps) {
    const [showOption, setShowOption] = useState(false)
    const [showModal, setShowModal] = useState(false)

    async function deletePost() {
        await supabase.from('posts').delete().eq('id', post.id)
        onUpdate()
    }

    return (
        <div className='relative bg-white shadow-md rounded-lg p-6'>
            <div className='flex items-start'>
                <p className='flex-1 font-bold text-xl'>{post.title}</p>
                <button
                    className='rounded hover:bg-slate-200'
                    onClick={() => setShowOption(true)}
                >
                    <BiDotsVerticalRounded size='20' />
                </button>
            </div>
            <div
                className='h-[7.5rem] text-sm overflow-hidden mt-4'
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className='flex justify-end gap-x-2 text-slate-500 text-sm mt-4'>
                <p className='italic'>{post.published ? 'Published' : 'Not Published'}</p>
                <p>|</p>
                <p className='italic'>{post.views} Views</p>
            </div>
            {showOption && (
                <PostOption
                    post={post}
                    onClose={() => setShowOption(false)}
                    onDelete={() => setShowModal(true)}
                    onUpdate={onUpdate}
                />
            )}
            {showModal && (
                <Modal
                    title='Delete Post'
                    subtitle='Are you sure to delete this post?'
                    onConfirm={deletePost}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    )
}
