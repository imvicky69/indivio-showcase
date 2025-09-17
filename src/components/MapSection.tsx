// src/components/MapSection.tsx

export function MapSection() {
  return (
    // This is a full-width section with no container, allowing the map to span the entire screen width.
    <section className="bg-white">
      {/* 
        DEVELOPMENT PLACEHOLDER:
        This is a simple, clean placeholder that looks like a map.
        It's great for development as it requires no API keys.
      */}
      <div className="h-96 md:h-[500px] w-full bg-slate-200 flex items-center justify-center">
        <div className="text-center p-4 bg-white/80 rounded-lg shadow-md backdrop-blur-sm">
          <h3 className="font-bold text-primary">New Delhi, Delhi</h3>
          <p className="text-dark/70 text-sm">Map will be displayed here</p>
        </div>
      </div>

      {/*
        PRODUCTION-READY GOOGLE MAPS EMBED:
        1. Go to Google Maps and find your location.
        2. Click "Share", then "Embed a map".
        3. Copy the HTML and paste the `src` attribute from the iframe here.
        4. Uncomment the iframe below and delete the placeholder div above.

        <iframe
          src="YOUR_GOOGLE_MAPS_EMBED_SRC_URL_HERE"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      */}
    </section>
  );
}