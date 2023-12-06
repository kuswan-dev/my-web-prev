import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BiChevronRight, BiHomeAlt } from 'react-icons/bi'

interface Route {
    path: string,
    title: string
}

export default function Breadcrumbs() {
    const [routes, setRoutes] = useState<Route[]>([])
    const router = useRouter()

    useEffect(() => {
        const routeList: Route[] = []
        router.route.split('/').slice(1).forEach((item, index) => {
            const path = index === 0 ? '/' + item : routeList[index - 1].path + '/' + item
            const title = item.split('-').map(text => text.charAt(0).toUpperCase() + text.slice(1)).join(' ')
            routeList.push({ path, title })
        })
        setRoutes(routeList)
    }, [router.route])

    return (
        <div className='flex bg-white shadow-md rounded-lg px-6 py-2'>
            {routes.map((route, index) => (
                <div
                    key={index}
                    className='flex items-center'
                >
                    {index === 0 && <BiHomeAlt size='18' />}
                    {index < routes.length - 1 ? (
                        <>
                            <Link
                                className='p-2'
                                href={route.path}
                            >
                                {route.title}
                            </Link>
                            <BiChevronRight size='30' />
                        </>
                    ) : (
                        <p className='font-bold p-2'>{route.title}</p>
                    )}
                </div>
            ))}
        </div>
    )
}
