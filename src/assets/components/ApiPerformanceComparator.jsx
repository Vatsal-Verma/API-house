import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Plus, Zap, Trash2, Loader2, Globe } from "lucide-react";
import "./ApiPerformanceComparator.css";

const ApiPerformanceComparator = () => {
  const [urls, setUrls] = useState(["", ""]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (i, v) => {
    const u = [...urls];
    u[i] = v;
    setUrls(u);
  };

  const addApiField = () => urls.length < 6 && setUrls([...urls, ""]);
  const removeApiField = (i) => urls.length > 2 && setUrls(urls.filter((_, x) => x !== i));

  const measurePerformance = async () => {
    setLoading(true);
    const data = [];

    for (const url of urls.filter((u) => u.trim())) {
      const times = [];
      let totalSize = 0;
      let successCount = 0;

      for (let i = 0; i < 3; i++) {
        const start = performance.now();
        try {
          const res = await fetch(url, { cache: "no-store" });
          const end = performance.now();
          const text = await res.text();
          times.push(end - start);
          totalSize += text.length;
          successCount++;
        } catch {
          times.push(Infinity);
        }
      }

      const valid = times.filter((t) => t !== Infinity);
      const avg = valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : Infinity;
      const min = valid.length ? Math.min(...valid) : Infinity;
      const max = valid.length ? Math.max(...valid) : Infinity;

      const displayName = url
        .replace(/^https?:\/\//, "")
        .split("/")[0]
        .slice(0, 20) + (url.split("/")[0].length > 20 ? "..." : "");

      data.push({
        name: displayName,
        fullUrl: url,
        avgTime: Math.round(avg),
        minTime: Math.round(min),
        maxTime: Math.round(max),
        sizeKB: successCount ? Math.round(totalSize / successCount / 1024) : 0,
      });
    }

    setResults(data);
    setLoading(false);
  };

  const fastest = results
    .filter((r) => r.minTime !== Infinity)
    .reduce((p, c) => (c.minTime < p.minTime ? c : p), results[0] ?? null);

  return (
    <div className="term-page">
      {/* Header */}
      <header className="term-topbar">
        <div className="term-brand">
          <div className="term-logo">&gt;_</div>
          <div className="term-brand-text">
            <div className="term-title">API Speed Test</div>
            <div className="term-subtitle">Benchmark multiple endpoints in real time</div>
          </div>
        </div>
        <div className="term-cmd">
          <span className="term-user">user@speedtest</span>
          <span className="term-cmd-text">~ $ api-speed --run</span>
        </div>
      </header>

      <main className="term-content">
        <section className="term-window">
          <div className="term-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot cyan"></span>
          </div>

          <pre className="term-body">
            {urls.map((url, i) => (
              <div key={i} className="term-row">
                <span className="term-prompt">$</span>
                <Globe className="term-icon" size={14} />
                <input
                  type="url"
                  placeholder="https://api.example.com/endpoint"
                  value={url}
                  onChange={(e) => handleUrlChange(i, e.target.value)}
                  className="term-input"
                />
                {urls.length > 2 && (
                  <button onClick={() => removeApiField(i)} className="term-remove">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}

            {urls.length < 6 && (
              <button onClick={addApiField} className="term-add">
                <Plus size={14} /> Add API
              </button>
            )}

            <button
              onClick={measurePerformance}
              disabled={loading || !urls.some((u) => u.trim())}
              className="term-action"
            >
              {loading ? (
                <>
                  <Loader2 className="spin" size={18} />
                  Running benchmarks...
                </>
              ) : (
                <>
                  <Zap size={18} />
                  Compare Performance
                </>
              )}
            </button>
          </pre>
        </section>

        {results.length > 0 && (
          <section className="term-window result-window">
            <div className="term-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot cyan"></span>
            </div>

            <pre className="term-body">
              <span className="term-prompt">-</span>{" "}
              <span className="term-heading">Performance Report</span>
              <br />
              <br />

              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={results}
                    margin={{ top: 10, right: 30, left: 20, bottom: 80 }}
                  >
                    <XAxis
                      dataKey="name"
                      stroke="#23ff6b"
                      tick={{ fill: "#00ff99", fontSize: 11 }}
                      angle={-45}
                      textAnchor="end"
                      height={90}
                      interval={0}
                      tickLine={false}
                      axisLine={{ stroke: "#2b2b2b" }}
                      tickFormatter={(value) =>
                        value.length > 15 ? value.slice(0, 12) + "..." : value
                      }
                    />
                    <YAxis
                      stroke="#23ff6b"
                      tick={{ fill: "#00ff99", fontSize: 11 }}
                      label={{
                        value: "ms",
                        angle: -90,
                        position: "insideLeft",
                        style: { fill: "#23ff6b" },
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111",
                        border: "1px solid #2b2b2b",
                        borderRadius: "6px",
                        color: "#00ff99",
                      }}
                      formatter={(value, name, props) => {
                        if (name === "Avg" || name === "Min" || name === "Max")
                          return `${value} ms`;
                        return value;
                      }}
                      labelFormatter={(label) => {
                        const item = results.find((r) => r.name === label);
                        return item?.fullUrl || label;
                      }}
                    />
                    <Legend wrapperStyle={{ color: "#00ff99" }} />
                    <Bar dataKey="avgTime" fill="#00ff99" name="Avg" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="minTime" fill="#23ff6b" name="Min" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="maxTime" fill="#2be6ff" name="Max" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <br />
              <span className="term-prompt">-</span> <span className="term-heading">Stats</span>
              <br />
              <div className="term-stats">
                <div className="term-stat">
                  <span className="term-label">Fastest</span>
                  <span className="term-value">{fastest?.name || "—"}</span>
                </div>
                <div className="term-stat">
                  <span className="term-label">Avg Size</span>
                  <span className="term-value">
                    {Math.round(results.reduce((a, b) => a + b.sizeKB, 0) / results.length)} KB
                  </span>
                </div>
                <div className="term-stat">
                  <span className="term-label">Runs</span>
                  <span className="term-value">3 per API</span>
                </div>
              </div>

              <br />
              <span className="term-footnote">
                No cache • Real network • 3 requests per endpoint
              </span>
            </pre>
          </section>
        )}
      </main>

      <footer className="term-footer">
        Built with React + Recharts • Powered by performance.now()
      </footer>
    </div>
  );
};

export default ApiPerformanceComparator;