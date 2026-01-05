import Image from 'next/image';

import mealIcon from '@/assets/icons/meal.png';
import communityIcon from '@/assets/icons/community.png';
import eventsIcon from '@/assets/icons/events.png';
import classes from './page.module.css';

export default function CommunityPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          One shared passion: <span className={classes.highlight}>Food</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
      </header>
      <main className={classes.main}>
        <h2>Community Perks</h2>

        <ul className={classes.perks}>
          <li>
            <Image src={mealIcon} alt="A delicious meal" />
            <p>Share & discover recipes</p>
          </li>
          <li>
            <Image src={communityIcon} alt="A crowd of people, cooking" />
            <p>Find new friends & like-minded people</p>
          </li>
          <li>
            <Image
              src={eventsIcon}
              alt="A crowd of people at a cooking event"
            />
            <p>Participate in exclusive events</p>
          </li>
        </ul>

                {/* ✅ Newsletter Signup Section */}
        <section className={classes.newsletter}>
          <h2>Stay Updated</h2>
          <p>Get the latest recipes and community news delivered to your inbox</p>
          <form className={classes.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              aria-label="Email address"
            />
            <button type="submit">Subscribe</button>
          </form>
        </section>
        
      </main>
    </>
  );
}