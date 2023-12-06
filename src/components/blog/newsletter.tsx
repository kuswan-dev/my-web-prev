import Button from '@/components/common/button'

export default function Newsletter() {
    return (
        <div className='p-16'>
            <p className='font-bold text-3xl'>Get notified when we’re uploading new post.</p>
            <p className='text-slate-500 mt-2'>Reprehenderit ad esse et non officia in nulla. Id proident tempor incididunt nostrud nulla et culpa.</p>
            <div className='flex gap-x-2 mt-8'>
                <input
                className='border border-slate-500 rounded-lg px-4'
                    placeholder='Enter your email'
                />
                <Button>
                    Subscribe
                </Button>
            </div>
        </div>
    )
}
