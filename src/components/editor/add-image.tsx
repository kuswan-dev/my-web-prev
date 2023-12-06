import Image from 'next/image'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BiImageAdd, BiLoaderAlt, BiX } from 'react-icons/bi'
import { supabase } from '@/services/supabase'
import Button from '../common/button'

interface AddImageProps {
    onAdd: (url: string) => void,
    onClose: () => void
}

export default function AddImage({ onAdd, onClose }: AddImageProps) {
    const [file, setFile] = useState<File | null>(null)
    const [url, setUrl] = useState<string | null>(null)

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/png': ['.png', '.jpg', '.jpeg'] },
        onDrop: e => uploadImage(e[0])
    })

    async function uploadImage(file: File) {
        setFile(file)
        await supabase.storage.from('posts').upload(file.name, file)
        const { data } = await supabase.storage.from('posts').getPublicUrl(file.name)
        setUrl(data.publicUrl)
    }

    return (
        <div className='w-full h-full absolute flex items-start justify-center bg-black/20 pt-28'>
            <div className='w-[25rem] relative bg-white rounded-lg p-8'>
                <h1 className='font-bold'>Add Image</h1>
                <button
                    className='top-4 right-4 absolute'
                    onClick={onClose}
                >
                    <BiX size='28' />
                </button>
                <div className='h-[12rem] my-6 overflow-hidden'>
                    {file ? (
                        <div className='h-full relative'>
                            <Image
                                className='w-full'
                                src={URL.createObjectURL(file)}
                                alt=''
                                width='0'
                                height='0'
                            />
                            {!url && (
                                <div className='w-full h-full top-0 absolute flex items-center justify-center bg-white/70'>
                                    <BiLoaderAlt className='animate-spin' size='50' />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            className='h-full flex items-center justify-center text-slate-400 bg-slate-100 border-4 border-dashed rounded-lg'
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <BiImageAdd size='50' />
                        </div>
                    )}
                </div>
                <Button
                    disabled={!url}
                    onClick={() => onAdd(url ?? '')}
                >
                    Add Image
                </Button>
            </div>
        </div>
    )
}
