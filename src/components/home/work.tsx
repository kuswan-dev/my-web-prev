import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeIn, slideIn } from '@/utils/motion'

export default function Work() {
    const projects = [
        'https://nhqniuujsthlqvtwtzgg.supabase.co/storage/v1/object/public/projects/project-1.jpg',
        'https://nhqniuujsthlqvtwtzgg.supabase.co/storage/v1/object/public/projects/project-2.jpg',
        'https://nhqniuujsthlqvtwtzgg.supabase.co/storage/v1/object/public/projects/project-3.jpg',
        'https://nhqniuujsthlqvtwtzgg.supabase.co/storage/v1/object/public/projects/project-4.jpg',
        'https://nhqniuujsthlqvtwtzgg.supabase.co/storage/v1/object/public/projects/project-5.jpg',
        'https://nhqniuujsthlqvtwtzgg.supabase.co/storage/v1/object/public/projects/project-6.jpg'
    ]

    return (
        <motion.div
            className='min-h-screen pt-28 px-12'
            id='work'
            initial='hidden'
            whileInView='visible'
        >
            <motion.p
                className='font-bold text-4xl text-center'
                variants={slideIn('top')}
            >
                My <span className='text-sky-500'>Project</span>
            </motion.p>
            <motion.p
                className='text-slate-300 text-center mt-12'
                variants={slideIn('top')}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </motion.p>
            <div className='flex flex-wrap justify-center gap-8 mt-8'>
                {projects.map((project, i) => (
                    <div
                        key={project}
                        className='w-80'
                    >
                        <motion.div
                            className='relative aspect-[4/3] rounded-xl overflow-hidden'
                            variants={fadeIn(i * .2)}
                        >
                            <Image
                                src={project}
                                alt=''
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </motion.div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
