'use client'

import { useEffect, useState } from 'react'
import classes from './toast.module.css'

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(onClose, 300) // Wait for fade animation
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    return (
        <div className={`${classes.toast} ${classes[type]} ${!isVisible ? classes.fadeOut : ''}`}>
            <span className={classes.icon}>
                {type === 'success' ? '✓' : '⚠'}
            </span>
            <span className={classes.message}>{message}</span>
        </div>
    )
}