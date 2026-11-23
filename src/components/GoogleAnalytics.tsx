/**
 * Google Analytics 4 component.
 * Loads the gtag.js script and initialises the GA4 measurement ID.
 * Rendered inside <head> via RootLayout — no extra bundle cost.
 *
 * To obtain your Measurement ID:
 *   1. Go to analytics.google.com
 *   2. Admin → Data Streams → select your stream
 *   3. Copy the "G-XXXXXXXXXX" Measurement ID
 *   4. Replace GA_MEASUREMENT_ID below (or set NEXT_PUBLIC_GA_ID in .env.local)
 */

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? "G-PLACEHOLDER";

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-PLACEHOLDER") {
    return null; // No-op until a real ID is supplied
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', {
  page_path: window.location.pathname,
  send_page_view: true,
  cookie_flags: 'SameSite=None;Secure',
});
`,
        }}
      />
    </>
  );
}
