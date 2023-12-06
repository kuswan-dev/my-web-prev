import Link from 'next/link'
import dayjs from 'dayjs'

interface PostItemProps {
    post: PostData
}

export default function PostItem({ post }: PostItemProps) {
    return (
        <div className='p-4'>
            <Link
                className='font-bold text-2xl'
                href={'/blog/' + post.post_url}
            >
                {post.title}
            </Link>
            <p className='text-slate-500 text-sm'>
                Last updated: {dayjs(post.updated_at).format('D MMM YYYY')}
            </p>
            <div
                className='h-[11rem] text-sm overflow-hidden mt-4'
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
    )
}
