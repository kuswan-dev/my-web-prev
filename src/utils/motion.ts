export function backdrop() {
    return {
        hidden: {
            scale: 1,
            transition: {
                stiffness: 400,
                delay: .5
            }
        },
        visible: {
            scale: 50,
            transition: {
                stiffness: 400
            }
        }
    }
}

export function drawer() {
    return {
        hidden: {
            scale: 0,
            transition: {
                staggerChildren: .1,
                staggerDirection: -1,
                delay: .5
            }
        },
        visible: {
            scale: 1,
            transition: {
                staggerChildren: .1,
                delayChildren: .5
            }
        }
    }
}

export function menu() {
    return {
        hidden: {
            y: 50,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1
        }
    }
}

export function fadeIn(delay: number = .2) {
    return {
        hidden: {
            scale: 0,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                delay
            }
        }
    }
}

export function slideIn(direction: 'left' | 'top' | 'right' | 'bottom', delay: number = .2) {
    return {
        hidden: {
            x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
            y: direction === 'top' ? -100 : direction === 'bottom' ? 100 : 0,
            opacity: 0
        },
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: .5,
                delay
            }
        }
    }
}
