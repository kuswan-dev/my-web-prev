export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className='mx-16 mb-4'>
            <p className='text-slate-500 text-sm'>&copy; {year} kuswan.id | Personal Website</p>
        </footer>
    )
}
