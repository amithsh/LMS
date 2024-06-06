import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

export default function dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="h-full md:flex flex-col w-56 hidden fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 md:pt-[80px] pt-[80px]  h-full">{children}</main>
    </div>
  );
}

