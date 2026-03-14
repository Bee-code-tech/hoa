export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.hoaservices.co.uk/sitemap.xml",
  };
}
