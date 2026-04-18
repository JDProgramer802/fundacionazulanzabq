import Footer from '@/components/public/Footer';
import Navbar from '@/components/public/Navbar';
import WhatsAppButton from '@/components/public/WhatsAppButton';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
