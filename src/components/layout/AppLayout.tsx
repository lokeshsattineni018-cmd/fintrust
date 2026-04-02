import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] bg-[#f5f5f7]">
      <Sidebar />
      <div className="flex flex-1 flex-col lg:pl-[260px]">
        <Header />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-[1400px]">
             {children}
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
