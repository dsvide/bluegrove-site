import { useState, useEffect, useRef } from "react";

const IMG = {
  hero: "/hero.jpg",
  sardinia: "https://images.pexels.com/photos/1750566/pexels-photo-1750566.jpeg?auto=compress&cs=tinysrgb&w=1200",
  oil: "https://images.pexels.com/photos/33587/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=900",
  olives: "https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg?auto=compress&cs=tinysrgb&w=900",
  grove1: "https://images.pexels.com/photos/5503108/pexels-photo-5503108.jpeg?auto=compress&cs=tinysrgb&w=900",
  gPaesaggio: "/paesaggio.jpg",
  gPasta: "/pasta.jpg",
  gRaccoglitura: "/raccoglitura.jpg",
  gUlivo: "/ulivocentenario.jpg",
};

const C = {
  bg: "#F5F3ED",
  warm: "#EDEAE0",
  dark: "#161918",
  accent: "#3B5755",
  gold: "#C4A96A",
  goldLight: "rgba(196,169,106,.12)",
  muted: "#7A7870",
  cream: "#F8F5EE",
  border: "rgba(0,0,0,.07)",
};

function useV(th = 0.06) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); o.unobserve(el); }
    }, { threshold: th });
    o.observe(el);
    return () => o.disconnect();
  }, [th]);
  return [ref, v];
}

function A({ children, d = 0, style: s = {} }) {
  const [ref, v] = useV();
  return (
    <div ref={ref} style={{
      ...s, opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(32px)",
      transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${d}s, transform .9s cubic-bezier(.16,1,.3,1) ${d}s`,
    }}>{children}</div>
  );
}

const Label = ({ children, light = false }) => (
  <div style={{
    fontFamily: "'Outfit',sans-serif",
    fontSize: 9, letterSpacing: 6, textTransform: "uppercase",
    color: light ? "rgba(248,245,238,.4)" : C.gold,
    display: "flex", alignItems: "center", gap: 16, marginBottom: 22,
  }}>
    <span style={{ width: 32, height: 1, background: light ? "rgba(248,245,238,.2)" : C.gold, opacity: .5 }} />
    {children}
  </div>
);

function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const h = () => setS(window.scrollY > 80);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      padding: s ? "16px 60px" : "32px 60px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: s ? "rgba(245,243,237,.97)" : "transparent",
      backdropFilter: s ? "blur(24px)" : "none",
      borderBottom: s ? `1px solid ${C.border}` : "none",
      transition: "all .5s cubic-bezier(.16,1,.3,1)",
    }}>
      <span style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: 20, fontWeight: 500, letterSpacing: 7, textTransform: "uppercase",
        color: s ? C.dark : C.cream, transition: "color .5s",
      }}>Blue Grove</span>
      <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
        {["Origin", "Shop", "Verify"].map(t => (
          <a key={t} href={`#${t.toLowerCase()}`} style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 9.5, letterSpacing: 3,
            textTransform: "uppercase", textDecoration: "none",
            color: s ? C.muted : "rgba(248,245,238,.35)", transition: "color .3s",
          }}
            onMouseEnter={e => e.target.style.color = s ? C.dark : C.cream}
            onMouseLeave={e => e.target.style.color = s ? C.muted : "rgba(248,245,238,.35)"}
          >{t}</a>
        ))}
        <a href="#shop" style={{
          fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 2.5,
          textTransform: "uppercase", textDecoration: "none",
          padding: "10px 24px",
          background: s ? C.dark : "transparent",
          color: s ? C.cream : "rgba(248,245,238,.6)",
          border: s ? `1px solid ${C.dark}` : "1px solid rgba(248,245,238,.2)",
          transition: "all .4s ease",
        }}
          onMouseEnter={e => { e.target.style.background = C.accent; e.target.style.borderColor = C.accent; e.target.style.color = C.cream; }}
          onMouseLeave={e => {
            e.target.style.background = s ? C.dark : "transparent";
            e.target.style.borderColor = s ? C.dark : "rgba(248,245,238,.2)";
            e.target.style.color = s ? C.cream : "rgba(248,245,238,.6)";
          }}
        >Order Now</a>
      </div>
    </nav>
  );
}

function Hero() {
  const [r, setR] = useState(false);
  useEffect(() => { setTimeout(() => setR(true), 200); }, []);
  return (
    <section style={{ height: "100vh", minHeight: 700, position: "relative", overflow: "hidden", background: C.dark }}>
      <div style={{
        position: "absolute", inset: -40,
        backgroundImage: `url(${IMG.hero})`,
        backgroundSize: "cover", backgroundPosition: "center 35%",
        opacity: r ? .38 : 0,
        transform: r ? "scale(1.0)" : "scale(1.1)",
        transition: "opacity 2.5s ease, transform 4s ease",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(22,25,24,.5) 0%, rgba(22,25,24,.1) 45%, rgba(22,25,24,.7) 100%)" }} />
      <div style={{
        position: "absolute", left: 36, bottom: 60, zIndex: 3,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
        opacity: r ? 1 : 0, transition: "opacity 1s ease 2s",
      }}>
        <div style={{ width: 1, height: 60, background: "rgba(248,245,238,.12)" }} />
        <span style={{
          fontFamily: "'Outfit',sans-serif", fontSize: 8, letterSpacing: 4,
          textTransform: "uppercase", color: "rgba(248,245,238,.25)",
          writingMode: "vertical-rl", transform: "rotate(180deg)",
        }}>Villacidro · Sardinia · 2026</span>
      </div>
      <div style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        textAlign: "center", padding: "0 60px",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 20, marginBottom: 40,
          opacity: r ? 1 : 0, transition: "opacity 1s ease .6s",
        }}>
          <span style={{ width: 48, height: 1, background: "rgba(196,169,106,.3)" }} />
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 7, textTransform: "uppercase", color: "rgba(248,245,238,.3)" }}>Sardinia's Blue Zone</span>
          <span style={{ width: 48, height: 1, background: "rgba(196,169,106,.3)" }} />
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(72px,12vw,160px)",
          fontWeight: 300, color: C.cream,
          lineHeight: .85, margin: 0, letterSpacing: 4,
          opacity: r ? 1 : 0,
          transform: r ? "translateY(0)" : "translateY(70px)",
          transition: "all 1.4s cubic-bezier(.16,1,.3,1) .8s",
        }}>Blue<br /><em style={{ fontStyle: "italic", fontWeight: 400, color: C.gold }}>Grove</em></h1>
        <div style={{
          width: 1, height: r ? 56 : 0,
          background: "rgba(196,169,106,.25)", margin: "36px auto",
          transition: "height 1s ease 1.8s",
        }} />
        <p style={{
          fontFamily: "'Outfit',sans-serif", fontSize: 12, letterSpacing: 2,
          color: "rgba(248,245,238,.3)", lineHeight: 2.2,
          maxWidth: 320, margin: "0 0 48px",
          opacity: r ? 1 : 0, transition: "opacity 1s ease 2s",
        }}>Extra virgin olive oil from the land<br />where people live the longest</p>
        <div style={{ display: "flex", gap: 16, opacity: r ? 1 : 0, transition: "opacity 1s ease 2.2s" }}>
          <a href="#origin" style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 4,
            textTransform: "uppercase", color: C.cream, textDecoration: "none",
            padding: "16px 44px", border: "1px solid rgba(248,245,238,.15)",
            transition: "all .4s ease",
          }}
            onMouseEnter={e => { e.target.style.background = "rgba(248,245,238,.07)"; e.target.style.borderColor = "rgba(248,245,238,.35)"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(248,245,238,.15)"; }}
          >Discover</a>
          <a href="#shop" style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 4,
            textTransform: "uppercase", color: C.dark, textDecoration: "none",
            padding: "16px 44px", background: C.gold, border: `1px solid ${C.gold}`,
            transition: "all .4s ease",
          }}
            onMouseEnter={e => { e.target.style.background = "#b8983e"; e.target.style.borderColor = "#b8983e"; }}
            onMouseLeave={e => { e.target.style.background = C.gold; e.target.style.borderColor = C.gold; }}
          >Order Now</a>
        </div>
      </div>
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: r ? 1 : 0, transition: "opacity 1s ease 2.5s",
      }}>
        <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 7.5, letterSpacing: 3, textTransform: "uppercase", color: "rgba(248,245,238,.2)" }}>Scroll</span>
        <div style={{ width: 1, height: 28, background: "rgba(248,245,238,.12)" }} />
      </div>
    </section>
  );
}

function Strip() {
  const [ref, v] = useV(.2);
  const stats = [
    { n: "5th", l: "Blue Zone on Earth", sub: "One of only five" },
    { n: "100+", l: "Years of Life", sub: "Where centenarians are the norm" },
    { n: "0.18%", l: "Acidity", sub: "Among the lowest recorded" },
    { n: "412", l: "mg/kg Polyphenols", sub: "Exceptionally rich" },
  ];
  return (
    <section ref={ref} style={{ background: C.dark, padding: "64px 60px", borderTop: "1px solid rgba(255,255,255,.03)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
        {stats.map((d, i) => (
          <div key={i} style={{
            textAlign: "center", padding: "0 32px",
            borderRight: i < 3 ? "1px solid rgba(255,255,255,.05)" : "none",
            opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)",
            transition: `all .7s cubic-bezier(.16,1,.3,1) ${i * .1}s`,
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 52, color: C.gold, fontWeight: 300, lineHeight: 1 }}>{d.n}</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: C.cream, marginTop: 12, marginBottom: 6 }}>{d.l}</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10.5, color: "rgba(248,245,238,.25)", lineHeight: 1.6 }}>{d.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Origin() {
  return (
    <section id="origin" style={{ background: C.bg, padding: "clamp(100px,14vw,180px) 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <A style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 80 }}>
          <Label>Our Origin</Label>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontStyle: "italic", color: C.gold, opacity: .5 }}>Villacidro · Sardinia</span>
        </A>
        <A d={.06}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(44px,6vw,86px)",
            fontWeight: 300, color: C.dark,
            lineHeight: 1.05, margin: "0 0 64px", letterSpacing: 1, maxWidth: 820,
          }}>
            Where time moves slower,<br />
            <em style={{ fontStyle: "italic", color: C.accent }}>and lives run longer.</em>
          </h2>
        </A>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <A d={.1}>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, lineHeight: 2.2, color: C.muted, margin: "0 0 28px" }}>
                Sardinia is one of five Blue Zones on earth — places where people routinely live past 100. In the hills of Villacidro, the olive trees are as old as the traditions that surround them. The oil they produce has been part of this longevity for generations.
              </p>
            </A>
            <A d={.16}>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, lineHeight: 2.2, color: C.muted, margin: "0 0 48px" }}>
                Every bottle of Blue Grove is cold-pressed within hours of harvest. No shortcuts. No additives. Just olives, stone, and time — the same way it has always been done.
              </p>
            </A>
            <A d={.22}>
              <div style={{ borderLeft: `2px solid ${C.gold}`, paddingLeft: 24 }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontStyle: "italic", color: C.dark, lineHeight: 1.7, margin: 0 }}>
                  "This is not just oil. It is the taste of a longer, slower, more intentional life."
                </p>
              </div>
            </A>
          </div>
          <A d={.12}>
            <div style={{ position: "relative" }}>
              <img src={IMG.sardinia} alt="Villacidro" style={{ width: "100%", height: 560, objectFit: "cover" }} />
              <div style={{
                position: "absolute", top: -16, right: -16,
                width: "100%", height: "100%",
                border: `1px solid ${C.gold}`, opacity: .15, pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "60px 28px 28px",
                background: "linear-gradient(to top, rgba(22,25,24,.65), transparent)",
              }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontStyle: "italic", color: "rgba(248,245,238,.5)", margin: 0 }}>Villacidro, Medio Campidano — Sardinia</p>
              </div>
            </div>
          </A>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [h, setH] = useState(null);
  const pics = [
    { src: IMG.gUlivo,        cap: "Ulivo centenario",        pos: "center center" },
    { src: IMG.gRaccoglitura, cap: "Raccoglitura a mano",     pos: "center 30%" },
    { src: IMG.gPasta,        cap: "Dalla terra alla tavola", pos: "center center" },
    { src: IMG.gPaesaggio,    cap: "Paesaggio sardo",         pos: "center 60%" },
  ];
  const grid = [
    { gridColumn: "1/5",  gridRow: "1/4" },
    { gridColumn: "5/13", gridRow: "1/3" },
    { gridColumn: "5/9",  gridRow: "3/5" },
    { gridColumn: "9/13", gridRow: "3/5" },
  ];
  return (
    <section style={{ background: C.dark, padding: "clamp(80px,10vw,140px) 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
          <div>
            <A><Label light>The Grove</Label></A>
            <A d={.06}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(36px,5vw,64px)",
                fontWeight: 300, color: C.cream, lineHeight: 1.05, margin: 0, letterSpacing: 1,
              }}>From the grove<br /><em style={{ fontStyle: "italic", color: C.gold }}>to your table.</em></h2>
            </A>
          </div>
          <A d={.1} style={{ maxWidth: 340 }}>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13.5, lineHeight: 2, color: "rgba(248,245,238,.35)", margin: 0, textAlign: "right" }}>
              Sardinia's air is among the cleanest in Europe. Its soil untouched by industry. Its microclimate shaped over millennia. A land that doesn't just grow food — it sustains life.
            </p>
          </A>
        </div>
        <A d={.14}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "0 72px", marginBottom: 48, paddingBottom: 48,
            borderBottom: "1px solid rgba(255,255,255,.05)",
          }}>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, lineHeight: 2.1, color: "rgba(248,245,238,.4)", margin: 0 }}>
              In Villacidro, at the heart of Sardinia's Blue Zone, families have pressed oil from the same trees for generations. Centenarians here are not an exception — they are a tradition.
            </p>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, lineHeight: 2.1, color: "rgba(248,245,238,.4)", margin: 0 }}>
              Every olive we harvest carries that legacy. Pure air, ancient roots, a microclimate unlike anywhere else on earth. This is where extraordinary oil is born — and where extraordinary lives are lived.
            </p>
          </div>
        </A>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gridAutoRows: 200, gap: 6 }}>
          {pics.map((p, i) => (
            <A key={i} d={i * .06} style={{ ...grid[i], position: "relative", overflow: "hidden" }}>
              <div style={{ width: "100%", height: "100%", cursor: "pointer" }}
                onMouseEnter={() => setH(i)} onMouseLeave={() => setH(null)}>
                <img src={p.src} alt={p.cap} style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  objectPosition: p.pos,
                  transform: h === i ? "scale(1.05)" : "scale(1)",
                  transition: "transform .8s cubic-bezier(.16,1,.3,1)",
                  filter: h === i ? "brightness(1)" : "brightness(.82)",
                }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: h === i ? "linear-gradient(to top, rgba(22,25,24,.7), transparent 60%)" : "transparent",
                  transition: "background .4s",
                  display: "flex", alignItems: "flex-end", padding: 20,
                }}>
                  <span style={{
                    fontFamily: "'Outfit',sans-serif", fontSize: 9.5, letterSpacing: 2.5,
                    textTransform: "uppercase", color: C.cream,
                    opacity: h === i ? 1 : 0, transition: "opacity .3s",
                  }}>{p.cap}</span>
                </div>
              </div>
            </A>
          ))}
        </div>
      </div>
    </section>
  );
}

function Shop() {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [thumb, setThumb] = useState(0);
  const thumbs = [IMG.oil, IMG.olives, IMG.grove1, IMG.sardinia];
  return (
    <section id="shop" style={{ background: C.bg, padding: "clamp(100px,12vw,160px) 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <A>
          <div>
            <img src={thumbs[thumb]} alt="Blue Grove EVOO" style={{ width: "100%", height: 520, objectFit: "cover" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              {thumbs.map((src, i) => (
                <div key={i} onClick={() => setThumb(i)} style={{
                  width: "25%", height: 72, overflow: "hidden", cursor: "pointer",
                  border: i === thumb ? `2px solid ${C.gold}` : "2px solid transparent",
                  opacity: i === thumb ? 1 : .45, transition: "all .3s",
                }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        </A>
        <div>
          <A><Label>Our Product</Label></A>
          <A d={.06}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(38px,4vw,58px)",
              fontWeight: 300, color: C.dark, lineHeight: 1.05, margin: "0 0 8px", letterSpacing: .5,
            }}>Extra Virgin<br /><em style={{ fontStyle: "italic", color: C.accent }}>Olive Oil</em></h2>
          </A>
          <A d={.1}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontStyle: "italic", color: C.muted, marginBottom: 28 }}>Bosana Cultivar — Villacidro, Sardinia</div>
          </A>
          <A d={.14}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 28, paddingBottom: 28, borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 52, color: C.dark, fontWeight: 300 }}>£20</span>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: C.muted, letterSpacing: 1 }}>/ 250ml bottle</span>
            </div>
          </A>
          <A d={.18}>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, lineHeight: 2.2, color: C.muted, margin: "0 0 32px" }}>
              Single-origin extra virgin from century-old Bosana olive trees. Cold-pressed within hours. Rich, peppery, with notes of green almond. Every bottle NFC-verified from grove to door.
            </p>
          </A>
          <A d={.22}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, marginBottom: 32, border: `1px solid ${C.border}` }}>
              {[
                { t: "Single Origin", d: "100% Bosana, Villacidro" },
                { t: "Cold Pressed", d: "Within 4 hours of harvest" },
                { t: "NFC Verified", d: "Scan to trace the journey" },
                { t: "Extra Virgin", d: "Acidity 0.18%" },
              ].map((f, i) => (
                <div key={i} style={{ padding: "16px 18px", background: C.bg, borderRight: i % 2 === 0 ? `1px solid ${C.border}` : "none", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10.5, fontWeight: 500, color: C.dark, letterSpacing: .5, marginBottom: 4 }}>{f.t}</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10.5, color: C.muted }}>{f.d}</div>
                </div>
              ))}
            </div>
          </A>
          <A d={.26}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ display: "flex", border: `1px solid ${C.border}` }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 48, height: 52, border: "none", background: "transparent", fontSize: 18, cursor: "pointer", color: C.dark }}>−</button>
                <div style={{ width: 48, height: 52, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 500, color: C.dark, borderLeft: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }}>{qty}</div>
                <button onClick={() => setQty(Math.min(10, qty + 1))} style={{ width: 48, height: 52, border: "none", background: "transparent", fontSize: 18, cursor: "pointer", color: C.dark }}>+</button>
              </div>
              <button
                onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2500); }}
                style={{
                  flex: 1, height: 52,
                  background: added ? C.accent : C.dark,
                  border: "none", color: C.cream,
                  fontFamily: "'Outfit',sans-serif", fontSize: 9.5, letterSpacing: 3,
                  textTransform: "uppercase", cursor: "pointer", transition: "background .4s",
                }}
                onMouseEnter={e => { if (!added) e.target.style.background = C.accent; }}
                onMouseLeave={e => { if (!added) e.target.style.background = C.dark; }}
              >{added ? "✓  Added to Bag" : "Add to Bag"}</button>
            </div>
          </A>
        </div>
      </div>
    </section>
  );
}

function Verify() {
  const [active, setActive] = useState(0);
  return (
    <section id="verify" style={{ background: C.warm, padding: "clamp(100px,12vw,160px) 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <A><Label>Verified Authenticity</Label></A>
          <A d={.08}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(36px,4vw,56px)",
              fontWeight: 300, color: C.dark, lineHeight: 1.08, margin: "0 0 20px", letterSpacing: .5,
            }}>The only oil<br /><em style={{ fontStyle: "italic", color: C.accent }}>you can verify.</em></h2>
          </A>
          <A d={.14}>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, lineHeight: 2.1, color: C.muted, margin: "0 0 40px" }}>
              80% of extra virgin oil worldwide is adulterated. Blue Grove is different. Every bottle carries NFC + QR verification — scan it, and trace every step from tree to table.
            </p>
          </A>
          {[
            { n: "01", t: "Scan", d: "Tap your phone to the NFC chip or scan the QR code on the bottle." },
            { n: "02", t: "Trace", d: "See the grove location, harvest date, press time, and full chemical analysis." },
            { n: "03", t: "Trust", d: "Immutable data. No intermediaries. No fraud. Just truth." },
          ].map((s, i) => (
            <A key={i} d={.2 + i * .07}>
              <div onClick={() => setActive(i)} style={{
                padding: "20px 24px", marginBottom: 6, cursor: "pointer",
                background: active === i ? C.goldLight : "transparent",
                borderLeft: `2px solid ${active === i ? C.gold : C.border}`,
                transition: "all .3s",
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: active === i ? C.gold : "rgba(0,0,0,.08)", transition: "color .3s", minWidth: 32 }}>{s.n}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: C.dark }}>{s.t}</div>
                    <div style={{
                      fontFamily: "'Outfit',sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.8,
                      maxHeight: active === i ? 80 : 0, opacity: active === i ? 1 : 0,
                      overflow: "hidden", transition: "all .4s ease", marginTop: active === i ? 6 : 0,
                    }}>{s.d}</div>
                  </div>
                </div>
              </div>
            </A>
          ))}
        </div>
        <A d={.15}>
          <div style={{ background: C.dark, padding: "44px 36px" }}>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 7.5, letterSpacing: 3, textTransform: "uppercase", color: "rgba(248,245,238,.18)", marginBottom: 28 }}>Verification Preview</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: C.cream, marginBottom: 4 }}>Blue Grove</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: C.gold, letterSpacing: 2, marginBottom: 28 }}>Lot #0001 · 2026 Harvest</div>
            {[
              ["Grove", "Villacidro, Sardinia"],
              ["Cultivar", "Bosana"],
              ["Harvest", "October 2026"],
              ["Pressed", "Within 4 hours"],
              ["Acidity", "0.18%"],
              ["Polyphenols", "412 mg/kg"],
            ].map(([k, val], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(248,245,238,.05)" }}>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: "rgba(248,245,238,.28)", letterSpacing: 1.5, textTransform: "uppercase" }}>{k}</span>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: "rgba(248,245,238,.7)" }}>{val}</span>
              </div>
            ))}
            <div style={{ marginTop: 28, padding: "12px 28px", border: `1px solid rgba(196,169,106,.25)`, display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, display: "inline-block" }} />
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: C.gold }}>Verified Authentic</span>
            </div>
          </div>
        </A>
      </div>
    </section>
  );
}

function Join() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section style={{ background: C.dark, padding: "clamp(100px,12vw,160px) 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.sardinia})`, backgroundSize: "cover", backgroundPosition: "center", opacity: .04 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <A><Label light>Early Access</Label></A>
        <A d={.08}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(38px,5.5vw,72px)",
            fontWeight: 300, color: C.cream, lineHeight: 1.1, margin: "0 0 16px",
          }}>The first harvest<br /><em style={{ fontStyle: "italic", color: C.gold }}>arrives soon.</em></h2>
        </A>
        <A d={.14}>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: "rgba(248,245,238,.35)", maxWidth: 420, margin: "0 auto 48px", lineHeight: 2 }}>
            Join the list for early access, harvest news, and the story behind every bottle.
          </p>
        </A>
        <A d={.2}>
          {!done ? (
            <div style={{ display: "inline-flex", maxWidth: 480, width: "100%" }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{
                flex: 1, padding: "18px 24px",
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.07)", borderRight: "none",
                color: "#fff", fontFamily: "'Outfit',sans-serif", fontSize: 13, outline: "none",
              }} />
              <button onClick={() => email && setDone(true)} style={{
                padding: "18px 40px",
                background: C.gold, border: `1px solid ${C.gold}`,
                color: C.dark, fontFamily: "'Outfit',sans-serif",
                fontSize: 9, letterSpacing: 3, textTransform: "uppercase",
                cursor: "pointer", transition: "all .3s",
              }}
                onMouseEnter={e => { e.target.style.background = "#b8983e"; }}
                onMouseLeave={e => { e.target.style.background = C.gold; }}
              >Notify Me</button>
            </div>
          ) : (
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontStyle: "italic", color: C.gold }}>Thank you. We will be in touch.</div>
          )}
        </A>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#0F1110", padding: "48px 60px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,.04)" }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, letterSpacing: 5, textTransform: "uppercase", color: "rgba(248,245,238,.25)" }}>Blue Grove</span>
          <div style={{ display: "flex", gap: 32 }}>
            {["Instagram", "TikTok"].map(s => (
              <a key={s} href="#" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: "rgba(248,245,238,.2)", textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase" }}>{s}</a>
            ))}
          </div>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9.5, color: "rgba(248,245,238,.1)", letterSpacing: .5 }}>Villacidro, Sardinia</span>
        </div>
        <div style={{ paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9.5, color: "rgba(248,245,238,.1)" }}>© 2026 Blue Grove. All rights reserved.</span>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9.5, color: "rgba(248,245,238,.1)" }}>Extra Virgin Olive Oil · NFC Verified</span>
        </div>
      </div>
    </footer>
  );
}

export default function BlueGrove() {
  return (
    <div style={{ background: C.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #F5F3ED; overflow-x: hidden; }
        ::selection { background: rgba(196,169,106,.2); }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,.08); }
        @media (max-width: 960px) { nav > div:last-child { display: none !important; } }
      `}</style>
      <Nav />
      <Hero />
      <Strip />
      <Origin />
      <Gallery />
      <Shop />
      <Verify />
      <Join />
      <Footer />
    </div>
  );
}
