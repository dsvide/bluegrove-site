import { useState, useEffect, useRef } from "react";

const IMG = {
  hero: "/hero.jpg",
  sardinia: "https://images.pexels.com/photos/1750566/pexels-photo-1750566.jpeg?auto=compress&cs=tinysrgb&w=900",
  grove1: "https://images.pexels.com/photos/5503108/pexels-photo-5503108.jpeg?auto=compress&cs=tinysrgb&w=900",
  olives: "https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg?auto=compress&cs=tinysrgb&w=900",
  oil: "https://images.pexels.com/photos/33587/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=900",
  landscape: "https://images.pexels.com/photos/1480690/pexels-photo-1480690.jpeg?auto=compress&cs=tinysrgb&w=900",
  tree: "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=900",
  table: "https://images.pexels.com/photos/1115251/pexels-photo-1115251.jpeg?auto=compress&cs=tinysrgb&w=900",
};

const C = {
  bg: "#F4F2EC", warm: "#ECEADF", dark: "#181B1A",
  accent: "#3B5755", blue: "#2A4858",
  gold: "#C4A96A", muted: "#888880", cream: "#F7F5EF",
};

function useV(th = 0.08) {
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
      transform: v ? "translateY(0)" : "translateY(28px)",
      transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${d}s, transform .8s cubic-bezier(.16,1,.3,1) ${d}s`,
    }}>{children}</div>
  );
}

const Tag = ({ children }) => (
  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9.5, letterSpacing: 5, textTransform: "uppercase", color: C.accent, display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
    <span style={{ width: 24, height: 1, background: C.gold, opacity: .5 }} />
    {children}
  </div>
);

function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const h = () => setS(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, padding: s ? "14px 48px" : "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", background: s ? "rgba(244,242,236,.96)" : "transparent", backdropFilter: s ? "blur(20px)" : "none", borderBottom: s ? "1px solid rgba(0,0,0,.04)" : "none", transition: "all .5s ease" }}>
      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, fontWeight: 500, letterSpacing: 5, textTransform: "uppercase", color: s ? C.dark : C.cream, transition: "color .5s" }}>Blue Grove</span>
      <div style={{ display: "flex", gap: 28 }}>
        {["Origin", "Shop", "Verify"].map(t => (
          <a key={t} href={`#${t.toLowerCase()}`} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", textDecoration: "none", color: s ? C.muted : "rgba(247,245,239,.4)", transition: "color .3s" }}
            onMouseEnter={e => e.target.style.color = s ? C.dark : C.cream}
            onMouseLeave={e => e.target.style.color = s ? C.muted : "rgba(247,245,239,.4)"}
          >{t}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [r, setR] = useState(false);
  useEffect(() => { setTimeout(() => setR(true), 300); }, []);
  return (
    <section style={{ height: "100vh", position: "relative", overflow: "hidden", background: C.dark }}>
      <div style={{ position: "absolute", inset: -30, backgroundImage: `url(${IMG.hero})`, backgroundSize: "cover", backgroundPosition: "center 40%", opacity: r ? .4 : 0, transform: r ? "scale(1.02)" : "scale(1.12)", transition: "opacity 2s ease, transform 3s ease" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(24,27,26,.3) 0%, transparent 40%, rgba(24,27,26,.65) 100%)" }} />
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, opacity: r ? 1 : 0, transition: "opacity .8s ease .5s" }}>
          <span style={{ width: 40, height: 1, background: "rgba(247,245,239,.2)" }} />
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: "rgba(247,245,239,.35)" }}>From Sardinia's Blue Zone</span>
          <span style={{ width: 40, height: 1, background: "rgba(247,245,239,.2)" }} />
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(56px,10vw,140px)", fontWeight: 400, color: C.cream, lineHeight: .88, margin: 0, letterSpacing: 5, opacity: r ? 1 : 0, transform: r ? "translateY(0)" : "translateY(60px)", transition: "all 1.2s cubic-bezier(.16,1,.3,1) .7s" }}>Blue Grove</h1>
        <div style={{ width: 1, height: r ? 44 : 0, background: C.gold, opacity: .35, margin: "28px auto", transition: "height .8s ease 1.4s" }} />
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, letterSpacing: 1.5, color: "rgba(247,245,239,.35)", lineHeight: 1.9, maxWidth: 340, opacity: r ? 1 : 0, transition: "opacity .8s ease 1.6s" }}>Extra virgin olive oil from the land where people live the longest</p>
        <a href="#origin" style={{ marginTop: 40, fontFamily: "'Outfit',sans-serif", fontSize: 9.5, letterSpacing: 4, textTransform: "uppercase", color: C.cream, textDecoration: "none", padding: "16px 44px", border: "1px solid rgba(247,245,239,.12)", transition: "all .4s ease", opacity: r ? 1 : 0 }}
          onMouseEnter={e => { e.target.style.background = "rgba(247,245,239,.06)"; e.target.style.borderColor = "rgba(247,245,239,.3)"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(247,245,239,.12)"; }}
        >Discover</a>
      </div>
    </section>
  );
}

function Strip() {
  const [ref, v] = useV(.2);
  return (
    <section ref={ref} style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.accent})`, padding: "48px", display: "flex", justifyContent: "center", gap: 90 }}>
      {[{ n: "5", l: "Blue Zones" }, { n: "100+", l: "Years Lived" }, { n: "1", l: "Island" }].map((d, i) => (
        <div key={i} style={{ textAlign: "center", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(14px)", transition: `all .6s ease ${.1 + i * .1}s` }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, color: C.cream, fontWeight: 300 }}>{d.n}</div>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "rgba(247,245,239,.3)", marginTop: 8 }}>{d.l}</div>
        </div>
      ))}
    </section>
  );
}

function Origin() {
  return (
    <section id="origin" style={{ background: C.bg, padding: "clamp(80px,12vw,150px) 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <A><Tag>Our Origin</Tag></A>
          <A d={.08}><h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(34px,3.8vw,52px)", fontWeight: 400, color: C.dark, lineHeight: 1.12, margin: "0 0 32px" }}>Where the land teaches longevity</h2></A>
          <A d={.16}><p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, lineHeight: 2.1, color: C.muted, margin: "0 0 18px" }}>In the hills of Villacidro, in Sardinia's Blue Zone, olive trees have stood for centuries. The people who tend them live longer than almost anyone on earth.</p></A>
          <A d={.24}><p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14.5, lineHeight: 2, color: C.dark, margin: 0 }}>This is not just oil. It is the taste of a longer, slower, more intentional life.</p></A>
        </div>
        <A d={.1}>
          <div style={{ position: "relative" }}>
            <img src={IMG.sardinia} alt="Villacidro" style={{ width: "100%", height: 520, objectFit: "cover" }} />
            <div style={{ position: "absolute", top: -14, left: -14, width: "100%", height: "100%", border: `1px solid ${C.gold}`, opacity: .18, pointerEvents: "none" }} />
            <p style={{ marginTop: 16, fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontStyle: "italic", color: C.gold, opacity: .55 }}>Villacidro, Medio Campidano — Sardinia</p>
          </div>
        </A>
      </div>
    </section>
  );
}

function Gallery() {
  const [h, setH] = useState(null);
  const pics = [
    { src: IMG.grove1, cap: "Ancient olive groves" },
    { src: IMG.olives, cap: "Hand-picked olives" },
    { src: IMG.oil, cap: "Cold-pressed, same day" },
    { src: IMG.tree, cap: "From grove to table" },
    { src: IMG.table, cap: "Mediterranean tradition" },
    { src: IMG.landscape, cap: "The hills of Campidano" },
  ];
  const grid = [
    { gridColumn: "1/8", gridRow: "1/3" }, { gridColumn: "8/13", gridRow: "1/2" },
    { gridColumn: "8/13", gridRow: "2/3" }, { gridColumn: "1/5", gridRow: "3/5" },
    { gridColumn: "5/9", gridRow: "3/5" }, { gridColumn: "9/13", gridRow: "3/5" },
  ];
  return (
    <section style={{ background: C.bg, padding: "clamp(60px,8vw,120px) 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <A><Tag>The Grove</Tag></A>
        <A d={.06}><h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,3vw,42px)", fontWeight: 400, color: C.dark, margin: "0 0 40px" }}>Our world in images</h2></A>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gridAutoRows: 200, gap: 6 }}>
          {pics.map((p, i) => (
            <A key={i} d={i * .04} style={{ ...grid[i], position: "relative", overflow: "hidden", cursor: "pointer" }}>
              <div style={{ width: "100%", height: "100%" }} onMouseEnter={() => setH(i)} onMouseLeave={() => setH(null)}>
                <img src={p.src} alt={p.cap} style={{ width: "100%", height: "100%", objectFit: "cover", transform: h === i ? "scale(1.04)" : "scale(1)", transition: "transform .7s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: h === i ? "linear-gradient(to top,rgba(24,27,26,.5),transparent 50%)" : "transparent", transition: "background .4s", display: "flex", alignItems: "flex-end", padding: 16 }}>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: C.cream, opacity: h === i ? 1 : 0, transition: "opacity .3s" }}>{p.cap}</span>
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
  return (
    <section id="shop" style={{ background: C.warm, padding: "clamp(80px,10vw,140px) 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 70, alignItems: "start" }}>
        <A>
          <div>
            <img src={IMG.oil} alt="Blue Grove EVOO" style={{ width: "100%", height: 500, objectFit: "cover" }} />
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              {[IMG.oil, IMG.olives, IMG.grove1, IMG.sardinia].map((src, i) => (
                <div key={i} style={{ width: "25%", height: 70, overflow: "hidden", border: i === 0 ? `2px solid ${C.gold}` : "2px solid transparent", opacity: i === 0 ? 1 : .5 }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        </A>
        <div>
          <A><Tag>Our Product</Tag></A>
          <A d={.06}><h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,3vw,42px)", fontWeight: 400, color: C.dark, margin: "0 0 6px" }}>Extra Virgin Olive Oil</h2></A>
          <A d={.1}><div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontStyle: "italic", color: C.muted, marginBottom: 20 }}>Bosana Cultivar — Villacidro, Sardinia</div></A>
          <A d={.14}><div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24 }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, color: C.dark }}>£20</span>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: C.muted }}>250ml</span>
          </div></A>
          <A d={.18}><p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, lineHeight: 2, color: C.muted, margin: "0 0 28px" }}>Single-origin extra virgin from century-old Bosana olive trees. Cold-pressed within hours. Rich, peppery, with notes of green almond. Every bottle NFC-verified.</p></A>
          <A d={.22}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 28 }}>
              {[
                { t: "Single Origin", d: "100% Bosana, Villacidro" },
                { t: "Cold Pressed", d: "Within 4 hours of harvest" },
                { t: "NFC Verified", d: "Scan to trace the journey" },
                { t: "Extra Virgin", d: "Acidity under 0.3%" },
              ].map((f, i) => (
                <div key={i} style={{ padding: "14px 16px", background: "rgba(0,0,0,.02)", border: "1px solid rgba(0,0,0,.04)" }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11.5, fontWeight: 500, color: C.dark }}>{f.t}</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10.5, color: C.muted }}>{f.d}</div>
                </div>
              ))}
            </div>
          </A>
          <A d={.26}>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <div style={{ display: "flex", border: "1px solid rgba(0,0,0,.1)" }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 44, height: 48, border: "none", background: "transparent", fontSize: 16, cursor: "pointer" }}>-</button>
                <div style={{ width: 44, height: 48, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 500, borderLeft: "1px solid rgba(0,0,0,.06)", borderRight: "1px solid rgba(0,0,0,.06)" }}>{qty}</div>
                <button onClick={() => setQty(Math.min(10, qty + 1))} style={{ width: 44, height: 48, border: "none", background: "transparent", fontSize: 16, cursor: "pointer" }}>+</button>
              </div>
              <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2500); }}
                style={{ flex: 1, height: 48, background: added ? C.accent : C.dark, border: "none", color: C.cream, fontFamily: "'Outfit',sans-serif", fontSize: 10.5, letterSpacing: 2.5, textTransform: "uppercase", cursor: "pointer", transition: "background .3s" }}
                onMouseEnter={e => { if (!added) e.target.style.background = C.accent; }}
                onMouseLeave={e => { if (!added) e.target.style.background = C.dark; }}
              >{added ? "Added!" : "Add to Bag"}</button>
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
    <section id="verify" style={{ background: C.bg, padding: "clamp(80px,10vw,140px) 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <A><Tag>Verified Authenticity</Tag></A>
          <A d={.08}><h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,3vw,42px)", fontWeight: 400, color: C.dark, margin: "0 0 18px" }}>The only oil you can verify</h2></A>
          <A d={.14}><p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, lineHeight: 2, color: C.muted, margin: "0 0 32px" }}>80% of extra virgin oil worldwide is adulterated. Blue Grove is different. Every bottle carries NFC + QR verification.</p></A>
          {[
            { n: "01", t: "Scan", d: "Tap your phone or scan the QR code" },
            { n: "02", t: "Trace", d: "See grove, harvest date, chemical analysis" },
            { n: "03", t: "Trust", d: "Immutable data. No fraud. Just truth." },
          ].map((s, i) => (
            <A key={i} d={.2 + i * .06}>
              <div onClick={() => setActive(i)} style={{ padding: "16px 20px", marginBottom: 8, cursor: "pointer", background: active === i ? "rgba(196,169,106,.06)" : "transparent", borderLeft: `2px solid ${active === i ? C.gold : "rgba(0,0,0,.05)"}`, transition: "all .3s" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: active === i ? C.gold : "rgba(0,0,0,.07)", transition: "color .3s" }}>{s.n}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: C.dark }}>{s.t}</div>
                    <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12.5, color: C.muted, lineHeight: 1.7, maxHeight: active === i ? 60 : 0, opacity: active === i ? 1 : 0, overflow: "hidden", transition: "all .4s ease", marginTop: active === i ? 6 : 0 }}>{s.d}</div>
                  </div>
                </div>
              </div>
            </A>
          ))}
        </div>
        <A d={.15}>
          <div style={{ background: C.dark, padding: "40px 32px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 8, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(247,245,239,.2)", marginBottom: 24 }}>Verification Preview</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: C.cream, marginBottom: 20 }}>Blue Grove - Lot #0001</div>
            {[
              ["Grove", "Villacidro, Sardinia"],
              ["Cultivar", "Bosana"],
              ["Harvest", "October 2026"],
              ["Pressed", "Within 4 hours"],
              ["Acidity", "0.18%"],
              ["Polyphenols", "412 mg/kg"],
            ].map(([k, val], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(247,245,239,.04)" }}>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10.5, color: "rgba(247,245,239,.3)", letterSpacing: 1, textTransform: "uppercase" }}>{k}</span>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11.5, color: "rgba(247,245,239,.6)" }}>{val}</span>
              </div>
            ))}
            <div style={{ marginTop: 22, padding: "10px 24px", border: "1px solid rgba(196,169,106,.2)", display: "inline-block" }}>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: C.gold }}>Verified Authentic</span>
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
    <section style={{ background: C.dark, padding: "clamp(80px,10vw,120px) 48px", textAlign: "center" }}>
      <A><h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 400, color: C.cream, margin: "0 0 12px" }}>The first harvest arrives soon</h2></A>
      <A d={.08}><p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: "rgba(247,245,239,.35)", maxWidth: 400, margin: "0 auto 36px", lineHeight: 1.8 }}>Join the list for early access to our extra virgin olive oil from Sardinia Blue Zone.</p></A>
      <A d={.14}>
        {!done ? (
          <div style={{ display: "inline-flex", maxWidth: 460, width: "100%" }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ flex: 1, padding: "18px 22px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.06)", borderRight: "none", color: "#fff", fontFamily: "'Outfit',sans-serif", fontSize: 13, outline: "none" }} />
            <button onClick={() => email && setDone(true)} style={{ padding: "18px 36px", background: C.accent, border: "none", color: C.cream, fontFamily: "'Outfit',sans-serif", fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", cursor: "pointer" }}>Notify Me</button>
          </div>
        ) : (
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontStyle: "italic", color: C.gold }}>Thank you. We will be in touch.</div>
        )}
      </A>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#111413", padding: "40px 48px 28px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, letterSpacing: 3, textTransform: "uppercase", color: "rgba(247,245,239,.3)" }}>Blue Grove</span>
        <div style={{ display: "flex", gap: 24 }}>
          {["Instagram", "TikTok"].map(s => (
            <a key={s} href="#" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: "rgba(247,245,239,.2)", textDecoration: "none" }}>{s}</a>
          ))}
        </div>
        <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: "rgba(247,245,239,.1)" }}>2026 Blue Grove. Sardinia.</span>
      </div>
    </footer>
  );
}

export default function BlueGrove() {
  return (
    <div style={{ background: C.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Outfit:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #F4F2EC; overflow-x: hidden; }
        ::selection { background: rgba(59,87,85,.18); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,.06); border-radius: 2px; }
        @media (max-width: 900px) { nav > div:last-child { display: none !important; } }
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
