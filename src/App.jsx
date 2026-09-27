import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileActionBar from '@/components/layout/MobileActionBar';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import Home from '@/pages/Home';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Home />
      </main>
      <Footer />
      <MobileActionBar />
      <WhatsAppButton />
    </>
  );
}
