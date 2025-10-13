// import Navbar from "@/components/Navbar";
// import "./globals.css";
// import Footer from "@/components/Footer";


// export const metadata = {
//   title: "My Ecommerce App",
//   description: "Buy product at the best price",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900"
//       >
//         <Navbar/>
//         <main className="flex-grow container mx-auto px-4 py-6">
//           {children}
//         </main>
//         <Footer/>
//       </body>
//     </html>
//   );
// }

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers"; // ✅ Import the React Query provider
import "./globals.css";

export const metadata = {
  title: "My Ecommerce App",
  description: "Buy products at the best price",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
        {/* ✅ Wrap entire app with Providers */}
        <Providers>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
