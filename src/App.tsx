import { useEffect, useState, useCallback } from 'react';
import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Manifesto from './sections/Manifesto';
import Anatomy from './sections/Anatomy';
import Process from './sections/Process';
import Tiers from './sections/Tiers';
import AIPackages from './sections/AIPackages';
import IndividualServices from './sections/IndividualServices';
import Testimonials from './sections/Testimonials';
import Portfolio from './sections/Portfolio';
import FAQ from './sections/FAQ';
import BookConsultation from './sections/BookConsultation';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import ConsultationBanner from './components/ConsultationBanner';
import ClientMarquee from './components/ClientMarquee';
import LoadingScreen from './components/LoadingScreen';
import CookieNotice from './components/CookieNotice';
import { siteConfig } from './config';

function App() {
  const [loading, setLoading] = useState(true);
  useLenis();

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    document.title = siteConfig.siteTitle || '';
    document.documentElement.lang = siteConfig.language || '';

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = siteConfig.siteDescription || '';

    const metaOG = [
      { property: 'og:title', content: siteConfig.siteTitle },
      { property: 'og:description', content: siteConfig.siteDescription },
      { property: 'og:type', content: 'website' },
    ];
    metaOG.forEach(({ property, content }) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
      el.content = content;
    });
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      <Navigation />
      <main>
        <Hero />
        <ClientMarquee />
        <Stats />
        <Manifesto />
        <Anatomy />
        <Process />
        <Tiers />
        <AIPackages />
        <IndividualServices />
        <Testimonials />
        <Portfolio />
        <FAQ />
        <BookConsultation />
        <Contact />
        <Footer />
      </main>
      <WhatsAppFAB />
      <ConsultationBanner />
      <CookieNotice />
    </>
  );
}

export default App;
