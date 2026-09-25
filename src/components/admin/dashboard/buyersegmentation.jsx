import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Map, MapGeoJSON, MapMarker, MarkerContent, MapControls } from "@/components/ui/map";

export default function BuyerSegmentation() {
    const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

    const [world, setWorld] = useState(null);
    const [buyers, setBuyers] = useState([]);
    const [active, setActive] = useState(null);

    const worldGeoJsonUrl =
        "https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@v5.1.2/geojson/ne_110m_admin_0_countries.geojson";

    const filters = ["Country", "Region"];

    const buckets = [
        { label: "0-100", color: "#B8B8B8", min: 0, max: 100 },
        { label: "101-1,000", color: "#D6E4FF", min: 101, max: 1000 },
        { label: "1001-5,000", color: "#8FB4FF", min: 1001, max: 5000 },
        { label: "5,000+", color: "#2F6FE4", min: 5001, max: Infinity },
    ];

    useEffect(() => {
        fetch(worldGeoJsonUrl)
            .then((res) => res.json())
            .then(setWorld)
            .catch(console.error);

        fetch(`${API}/dashboard/buyers`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load buyers segmentation");
                return res.json();
            })
            .then(setBuyers)
            .catch(console.error);
    }, []);

    const countries = useMemo(() => {
        if (!world) return [];

        const aliases = { uk: "gbr", uae: "are" };
        const norm = (s) => String(s ?? "").toLowerCase().replace(/[^a-z]/g, "");
        const found = {};

        buyers.forEach(({ country, customers }) => {
            const raw = norm(country);
            const key = aliases[raw] || raw;
            if (!key) return;

            const feature = world.features.find((f) =>
                [
                    f.properties.NAME,
                    f.properties.NAME_LONG,
                    f.properties.ADMIN,
                    f.properties.ADM0_A3,
                    f.properties.ISO_A2_EH,
                ].some((v) => norm(v) === key)
            );
            if (!feature) return;

            const code = feature.properties.ADM0_A3;
            if (found[code]) {
                found[code].customers += customers;
                return;
            }

            const polygons =
                feature.geometry.type === "Polygon"
                    ? [feature.geometry.coordinates]
                    : feature.geometry.coordinates;

            let center = [0, 0];
            let biggest = -1;
            polygons.forEach(([ring]) => {
                const xs = ring.map((c) => c[0]);
                const ys = ring.map((c) => c[1]);
                const minX = Math.min(...xs);
                const maxX = Math.max(...xs);
                const minY = Math.min(...ys);
                const maxY = Math.max(...ys);
                const area = (maxX - minX) * (maxY - minY);
                if (area > biggest) {
                    biggest = area;
                    center = [(minX + maxX) / 2, (minY + maxY) / 2];
                }
            });

            const iso2 = String(feature.properties.ISO_A2_EH || feature.properties.ISO_A2 || "").toLowerCase();

            found[code] = {
                code,
                name: feature.properties.NAME,
                iso2: /^[a-z]{2}$/.test(iso2) ? iso2 : null,
                customers,
                lng: center[0],
                lat: center[1],
            };
        });

        return Object.values(found).sort((a, b) => b.customers - a.customers);
    }, [world, buyers]);

    const activeCode = active || countries[0]?.code;

    const paints = useMemo(() => {
        const cases = buckets.flatMap((b) => {
            const codes = countries
                .filter((c) => c.customers >= b.min && c.customers <= b.max)
                .map((c) => c.code);
            return codes.length ? [codes, b.color] : [];
        });

        const fillColor = cases.length
            ? ["match", ["get", "ADM0_A3"], ...cases, buckets[0].color]
            : buckets[0].color;

        return {
            fill: { "fill-color": fillColor, "fill-opacity": 1 },
            hover: { "fill-opacity": 0.8 },
            line: { "line-color": "#FFFFFF", "line-width": 0.5 },
        };
    }, [countries]);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Buyers Segmentation</h2>
                <div className="relative self-start sm:self-auto">
                    <select className="appearance-none rounded-full bg-green-500 py-1.5 sm:py-2 pl-3 sm:pl-4 pr-8 sm:pr-10 text-xs text-white outline-none">
                        {filters.map((f) => (
                            <option key={f}>{f}</option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white" />
                </div>
            </div>

            {/* Responsive height adjustments for mobile vs desktop */}
            <div className="relative mt-4 h-[220px] sm:h-[270px] overflow-hidden rounded-lg">
                <Map
                    blank
                    theme="light"
                    center={[10, 22]}
                    zoom={-0.6}
                    minZoom={-1}
                    renderWorldCopies={false}
                >
                    {world && (
                        <MapGeoJSON
                            data={world}
                            promoteId="ADM0_A3"
                            interactive
                            fillPaint={paints.fill}
                            fillHoverPaint={paints.hover}
                            linePaint={paints.line}
                        />
                    )}

                    {countries.map((c) => (
                        <MapMarker
                            key={c.code}
                            longitude={c.lng}
                            latitude={c.lat}
                            onMouseEnter={() => setActive(c.code)}
                            onClick={() => setActive(c.code)}
                        >
                            <MarkerContent>
                                {activeCode === c.code ? (
                                    <div className="flex items-center gap-2 rounded-lg bg-white px-2 py-1.5 shadow-md">
                                        {c.iso2 && (
                                            <img
                                                src={`https://flagcdn.com/w40/${c.iso2}.png`}
                                                alt={c.name}
                                                className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-cover"
                                            />
                                        )}
                                        <div className="leading-tight">
                                            <p className="text-xs font-semibold text-gray-900">
                                                {c.customers.toLocaleString()}
                                            </p>
                                            <p className="text-[9px] text-gray-500">customers</p>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="block h-2.5 w-2.5 rounded-full border-2 border-white bg-[#2F6FE4] shadow" />
                                )}
                            </MarkerContent>
                        </MapMarker>
                    ))}

                    <MapControls position="bottom-left" showZoom />
                </Map>
            </div>

            {/* Wrapped legend items for small screens */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {buckets.map((b) => (
                    <div key={b.label} className="flex items-center gap-1.5 text-[11px] text-gray-500">
                        <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
                        <span>{b.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}