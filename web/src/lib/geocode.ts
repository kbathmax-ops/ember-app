type GeocodeResult = {
  lat: number;
  lng: number;
  region: string | null;
};

export async function geocodeAddress(
  address: string,
): Promise<GeocodeResult | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", address);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "ca");
  url.searchParams.set("addressdetails", "1");

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Ember/0.1 (orcabuildnow@gmail.com)",
      "Accept-Language": "en-CA",
    },
  });
  if (!res.ok) return null;

  const arr = (await res.json()) as Array<{
    lat: string;
    lon: string;
    address?: { state?: string; province?: string };
  }>;
  if (arr.length === 0) return null;

  const hit = arr[0];
  return {
    lat: parseFloat(hit.lat),
    lng: parseFloat(hit.lon),
    region: hit.address?.state ?? hit.address?.province ?? null,
  };
}
