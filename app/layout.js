import './globals.css';
import MainHeader from '@/components/main-header/main-header';

export const metadata = {
  title: 'Next Meal',
  description: 'Delicious meals, shared by a food-loving community.',
  keywords: ['meals', 'recipes', 'food', 'cooking', 'community'],
  openGraph: {
    title: 'Next Meal',
    description: 'Delicious meals, shared by a food-loving community.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}