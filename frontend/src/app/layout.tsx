// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'A Bloom Studio',
  description: 'Elegant flowers for every occasion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Toaster position="top-right" reverseOrder={false} />
            <Footer />
            <CartSidebar /> {/* Floating cart UI */}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
