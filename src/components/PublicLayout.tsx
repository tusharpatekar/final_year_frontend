import { ReactNode } from 'react';
import PublicHeader from './PublicHeader';

type PublicLayoutProps = {
  children: ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PublicHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-green-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© Designed and developed by TechSquad 2025.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout; 