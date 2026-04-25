"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { T } from "./ui/tokens";

const WMS_BASE = "https://cwfis.cfs.nrcan.gc.ca/geoserver/public/wms";

function wmsTile(layer: string): string {
  const params = new URLSearchParams({
    service: "WMS",
    version: "1.1.1",
    request: "GetMap",
    layers: layer,
    styles: "",
    format: "image/png",
    transparent: "true",
    srs: "EPSG:3857",
    width: "256",
    height: "256",
    bbox: "{bbox-epsg-3857}",
  });
  return `${WMS_BASE}?${params.toString()}`;
}

export function CwfisMap({
  onSelectFire,
}: {
  onSelectFire: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: ref.current,
      style: {
        version: 8,
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
        sources: {
          "carto-light": {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
              "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
              "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution:
              '&copy; OpenStreetMap contributors &copy; CARTO &middot; CWFIS',
          },
          "cwfis-fwi": {
            type: "raster",
            tiles: [wmsTile("public:fwi")],
            tileSize: 256,
          },
          "cwfis-m3": {
            type: "raster",
            tiles: [wmsTile("public:m3polygons")],
            tileSize: 256,
          },
        },
        layers: [
          { id: "carto-light", type: "raster", source: "carto-light" },
          {
            id: "cwfis-fwi",
            type: "raster",
            source: "cwfis-fwi",
            paint: { "raster-opacity": 0.45 },
          },
          {
            id: "cwfis-m3",
            type: "raster",
            source: "cwfis-m3",
            paint: { "raster-opacity": 0.85 },
          },
        ],
      },
      center: [-122.95, 50.5],
      zoom: 5.4,
      minZoom: 3,
      maxZoom: 10,
      attributionControl: { compact: true },
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("click", "cwfis-m3", (e) => {
      onSelectFire("active-fire");
      const el = document.createElement("div");
      el.style.cssText = `font-family:'Helvetica Neue',Helvetica;font-size:12px;color:${T.ink};padding:4px 2px`;
      el.textContent = "Active fire perimeter (CWFIS M3)";
      new maplibregl.Popup({ offset: 8, closeButton: false })
        .setLngLat(e.lngLat)
        .setDOMContent(el)
        .addTo(map);
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [onSelectFire]);

  return <div ref={ref} style={{ position: "absolute", inset: 0 }} />;
}
