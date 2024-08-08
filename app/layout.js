import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import ChatBot from "@/components/shared/chat-bot";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EAST LINE",
  description: "EAST LINE TELEKOM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen relative flex flex-col`}
      >
        {/* <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(a, m1, o, c, r, m2) {
                a[m2] = {
                  id: "413126",
                  hash: "a41b728aa658401aa52ee005b83d9ec15b0bce3002e394f179251d00b5c88620",
                  locale: "ru",
                  inline: false,
                  setMeta: function(p) {
                    this.params = (this.params || []).concat([p]);
                  }
                };
                a[o] = function() {
                  (a[o].q = a[o].q || []).push(arguments);
                };
                var d = a.document,
                  s = d.createElement('script');
                s.async = true;
                s.id = m2 + '_script';
                s.src = 'https://gso.amocrm.ru/js/button.js';
                d.head && d.head.appendChild(s);
              })(window, 0, 'amoSocialButton', 0, 0, 'amo_social_button');
            `,
            }}
          />
        </Head> */}
        <NextTopLoader
          color="hsl(210 40% 96.1%)"
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={999999999}
          showAtBottom={false}
        />
        <Header />
        <div className="grow">{children}</div>
        <Footer />
        <ChatBot />
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
