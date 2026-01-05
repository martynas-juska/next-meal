import { supabase } from './supabase'
import slugify from 'slugify'
import xss from 'xss'

export async function getMeals() {
    const { data, error } = await supabase
        .from('meals')
        .select('*')
        .order('created_at', { ascending: false })
    
    if (error) {
        console.error('Error fetching meals:', error)
        return []
    }
    
    return data
}

export async function getMeal(slug) {
    const { data, error } = await supabase
        .from('meals')
        .select('*')
        .eq('slug', slug)
        .single()
    
    if (error) {
        console.error('Error fetching meal:', error)
        return null
    }
    
    return data
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true })
    meal.instructions = xss(meal.instructions)

    // Upload image to Supabase Storage
    const fileExt = meal.image.name.split('.').pop()
    const fileName = `${Date.now()}-${meal.slug}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
        .from('meal-images')
        .upload(fileName, meal.image, {
            cacheControl: '3600',
            upsert: false
        })

    if (uploadError) {
        throw new Error('Image upload failed: ' + uploadError.message)
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('meal-images')
        .getPublicUrl(fileName)

    meal.image = publicUrl

    // Insert into database
    const { error } = await supabase
        .from('meals')
        .insert([{
            title: meal.title,
            summary: meal.summary,
            instructions: meal.instructions,
            creator: meal.creator,
            creator_email: meal.creator_email,
            image: meal.image,
            slug: meal.slug
        }])

    if (error) {
        throw new Error('Failed to save meal: ' + error.message)
    }
}