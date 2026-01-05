import Link from 'next/link'
import classes from './breadcrumbs.module.css'

export default function Breadcrumbs({ items }) {
    return (
        <nav className={classes.breadcrumbs} aria-label="Breadcrumb">
            <ol>
                {items.map((item, index) => (
                    <li key={index}>
                        {index < items.length - 1 ? (
                            <>
                                <Link href={item.href}>{item.label}</Link>
                                <span className={classes.separator}>/</span>
                            </>
                        ) : (
                            <span className={classes.current}>{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}