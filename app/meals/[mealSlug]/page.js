import Image from 'next/image'
import classes from './page.module.css'
import { getMeal, getMeals } from '@/lib/meals'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/ui/breadcrumbs'

// Generate static pages for all meals at build time
export async function generateStaticParams() {
    const meals = await getMeals()
    
    return meals.map((meal) => ({
        mealSlug: meal.slug,
    }))
}

export async function generateMetadata({ params }) {
    const meal = getMeal(params.mealSlug)

    if  (!meal) {
        notFound()
    }
    
    return {
        title: meal.title,
        description: meal.summary
    }
}


export default function MealDetailsPage( { params } ) {
    const meal = getMeal(params.mealSlug)

    if (!meal) {
        notFound()
    }

    meal.instructions =meal.instructions.replace(/\n/g, '<br />')


    return <>
        <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Meals', href: '/meals' },
            { label: meal.title, href: `/meals/${meal.slug}` }
        ]} />

    <header className={ classes.header }>
        <div className={ classes.image }>
            <Image src={ meal.image } alt={ meal.title } fill />
        </div>

        <div className={ classes.headerText }>
            <h1>{ meal.title }</h1>
            <p className={ classes.creator }>
                By <a href={`mailto:${ meal.creator_email }`}>{ meal.creator }</a>
            </p>

            <p className={ classes.summary }>
                { meal.summary }
            </p>
        </div>

    </header>
    
    <main>
            <p 
                className={ classes.instructions }
                dangerouslySetInnerHTML={ {
                    __html:meal.instructions,
                } }
            >

            </p>
    </main>
    </>
}