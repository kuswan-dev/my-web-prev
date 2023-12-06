import Button from '@/components/common/button'

interface ModalProps {
    title: string,
    subtitle: string,
    onConfirm: () => void,
    onCancel: () => void
}

export default function Modal({ title, subtitle, onConfirm, onCancel }: ModalProps) {
    return (
        <div className='w-full h-full top-0 left-0 fixed flex items-center justify-center bg-black/20 z-10'>
            <div className='bg-white rounded-lg p-8'>
                <p className='font-bold text-2xl'>{title}</p>
                <p className='text-slate-500 mt-2'>{subtitle}</p>
                <div className='flex gap-x-2 mt-6'>
                    <Button
                        onClick={() => {
                            onConfirm()
                            onCancel()
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        variant='outline'
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}
