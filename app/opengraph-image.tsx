import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "House of Abundance Services | Professional Security Training";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // Fetch fonts via local paths (bundled assets)
  const spaceGroteskData = await fetch(
    new URL("./fonts/SpaceGrotesk-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const plusJakartaSansData = await fetch(
    new URL("./fonts/PlusJakartaSans-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  // Fetch logo via local path
  const logoData = await fetch(
    new URL("../public/logo-light.png", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1C3163",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "60px",
        }}
      >
        {/* Decorative Background Elements */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 0% 0%, rgba(214, 181, 133, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(214, 181, 133, 0.1) 0%, transparent 50%)",
            display: "flex",
          }}
        />

        {/* Outer Border */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "30px",
            right: "30px",
            bottom: "30px",
            border: "2px solid rgba(214, 181, 133, 0.2)",
            display: "flex",
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* Logo Container */}
          <div
            style={{
              display: "flex",
              marginBottom: "48px",
              padding: "20px",
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: "24px",
              border: "1px solid rgba(214, 181, 133, 0.1)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoData as any}
              alt="HOA Logo"
              style={{
                height: "120px",
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
              }}
            />
          </div>

          {/* Heading with Space Grotesk */}
          <div
            style={{
              color: "#D6B585",
              fontSize: 84,
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1.1,
              maxWidth: "1000px",
              marginBottom: "32px",
              letterSpacing: "-0.02em",
            }}
          >
            Professional Security Training
          </div>

          {/* Tagline with Plus Jakarta Sans */}
          <div
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 28,
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "6px",
              display: "flex",
              alignItems: "center",
            }}
          >
            SIA Accredited <span style={{ margin: "0 15px", color: "#D6B585" }}>•</span> UK Wide <span style={{ margin: "0 15px", color: "#D6B585" }}>•</span> Expert Trainers
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: spaceGroteskData,
          style: "normal",
          weight: 700,
        },
        {
          name: "Plus Jakarta Sans",
          data: plusJakartaSansData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
