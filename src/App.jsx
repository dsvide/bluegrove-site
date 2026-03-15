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

function useMedia(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    setMatch(m.matches);
    const h = e => setMatch(e.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, [query]);
  return match;
}

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
      transform: v ? "translateY(0)" : "translateY(28px)",
      transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${d}s, transform .9s cubic-bezier(.16,1,.3,1) ${d}s`,
    }}>{children}</div>
  );
}

const Label = ({ children, light = false }) => (
  <div style={{
    fontFamily: "'Outfit',sans-serif",
    fontSize: 9, letterSpacing: 6, textTransform: "uppercase",
    color: light ? "rgba(248,245,238,.4)" : C.gold,
    display: "flex", alignItems: "center", gap: 14, marginBottom: 20,
  }}>
    <span style={{ width: 28, height: 1, background: light ? "rgba(248,245,238,.2)" : C.gold, opacity: .5 }} />
    {children}
  </div>
);

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMedia("(max-width: 768px)");

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const linkColor = scrolled ? C.muted : "rgba(248,245,238,.4)";
  const linkHover = scrolled ? C.dark : C.cream;

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        padding: scrolled ? (isMobile ? "14px 24px" : "14px 60px") : (isMobile ? "20px 24px" : "28px 60px"),
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrolled ? "rgba(245,243,237,.97)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all .5s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: isMobile ? 17 : 20, fontWeight: 500, letterSpacing: 6,
          textTransform: "uppercase", color: scrolled ? C.dark : C.cream,
          transition: "color .5s",
        }}>Blue Grove</span>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {["Origin", "Shop", "Restaurant", "Verify"].map(t => (
              <a key={t} href={`#${t.toLowerCase()}`} style={{
                fontFamily: "'Outfit',sans-serif", fontSize: 9.5, letterSpacing: 3,
                textTransform: "uppercase", textDecoration: "none",
                color: linkColor, transition: "color .3s",
              }}
                onMouseEnter={e => e.target.style.color = linkHover}
                onMouseLeave={e => e.target.style.color = linkColor}
              >{t}</a>
            ))}
            <a href="#shop" style={{
              fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 2.5,
              textTransform: "uppercase", textDecoration: "none",
              padding: "10px 24px",
              background: scrolled ? C.dark : "transparent",
              color: scrolled ? C.cream : "rgba(248,245,238,.7)",
              border: scrolled ? `1px solid ${C.dark}` : "1px solid rgba(248,245,238,.25)",
              transition: "all .4s ease",
            }}
              onMouseEnter={e => { e.target.style.background = C.accent; e.target.style.borderColor = C.accent; e.target.style.color = C.cream; }}
              onMouseLeave={e => {
                e.target.style.background = scrolled ? C.dark : "transparent";
                e.target.style.borderColor = scrolled ? C.dark : "rgba(248,245,238,.25)";
                e.target.style.color = scrolled ? C.cream : "rgba(248,245,238,.7)";
              }}
            >Order Now</a>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", gap: 5, padding: 4,
          }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 1.5,
                background: scrolled ? C.dark : C.cream,
                transition: "all .3s",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(4px, 4px)"
                  : i === 2 ? "rotate(-45deg) translate(4px, -4px)"
                  : "scaleX(0)"
                  : "none",
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile menu */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 998, background: C.dark,
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center", gap: 40,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity .4s ease",
        }}>
          {["Origin", "Shop", "Restaurant", "Verify"].map(t => (
            <a key={t} href={`#${t.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 38, fontWeight: 300, color: C.cream,
                textDecoration: "none", letterSpacing: 2,
              }}>{t}</a>
          ))}
          <a href="#shop" onClick={() => setMenuOpen(false)} style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 11, letterSpacing: 4,
            textTransform: "uppercase", textDecoration: "none",
            padding: "16px 48px", background: C.gold, color: C.dark,
            marginTop: 16,
          }}>Order Now</a>
        </div>
      )}
    </>
  );
}

function Hero() {
  const [r, setR] = useState(false);
  const isMobile = useMedia("(max-width: 768px)");
  useEffect(() => { setTimeout(() => setR(true), 200); }, []);

  return (
    <section style={{ height: "100vh", minHeight: 600, position: "relative", overflow: "hidden", background: C.dark }}>
      <div style={{
        position: "absolute", inset: -40,
        backgroundImage: `url(${IMG.hero})`,
        backgroundSize: "cover", backgroundPosition: "center 35%",
        opacity: r ? .38 : 0, transform: r ? "scale(1.0)" : "scale(1.1)",
        transition: "opacity 2.5s ease, transform 4s ease",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(22,25,24,.4) 0%, rgba(22,25,24,.1) 50%, rgba(22,25,24,.8) 100%)" }} />

      <div style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        textAlign: "center", padding: isMobile ? "0 24px" : "0 60px",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 16, marginBottom: 32,
          opacity: r ? 1 : 0, transition: "opacity 1s ease .6s",
        }}>
          <span style={{ width: 32, height: 1, background: "rgba(196,169,106,.3)" }} />
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 6, textTransform: "uppercase", color: "rgba(248,245,238,.3)" }}>Sardinia's Blue Zone</span>
          <span style={{ width: 32, height: 1, background: "rgba(196,169,106,.3)" }} />
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: isMobile ? "clamp(64px,18vw,96px)" : "clamp(80px,12vw,160px)",
          fontWeight: 300, color: C.cream,
          lineHeight: .85, margin: 0, letterSpacing: 3,
          opacity: r ? 1 : 0,
          transform: r ? "translateY(0)" : "translateY(60px)",
          transition: "all 1.4s cubic-bezier(.16,1,.3,1) .8s",
        }}>Blue<br /><em style={{ fontStyle: "italic", color: C.gold }}>Grove</em></h1>

        <div style={{ width: 1, height: r ? 48 : 0, background: "rgba(196,169,106,.25)", margin: "28px auto", transition: "height 1s ease 1.8s" }} />

        <p style={{
          fontFamily: "'Outfit',sans-serif",
          fontSize: isMobile ? 11 : 12, letterSpacing: 1.5,
          color: "rgba(248,245,238,.3)", lineHeight: 2.2,
          maxWidth: 300, margin: "0 0 40px",
          opacity: r ? 1 : 0, transition: "opacity 1s ease 2s",
        }}>Extra virgin olive oil from the land<br />where people live the longest</p>

        <div style={{
          display: "flex", gap: 12,
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "100%" : "auto",
          maxWidth: isMobile ? 320 : "none",
          opacity: r ? 1 : 0, transition: "opacity 1s ease 2.2s",
        }}>
          <a href="#shop" style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 10, letterSpacing: 4,
            textTransform: "uppercase", color: C.dark, textDecoration: "none",
            padding: "18px 40px", background: C.gold,
            textAlign: "center", transition: "all .4s ease",
          }}
            onMouseEnter={e => { e.target.style.background = "#b8983e"; }}
            onMouseLeave={e => { e.target.style.background = C.gold; }}
          >Order Now — £20</a>
          <a href="#origin" style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 10, letterSpacing: 4,
            textTransform: "uppercase", color: C.cream, textDecoration: "none",
            padding: "18px 40px", border: "1px solid rgba(248,245,238,.2)",
            textAlign: "center", transition: "all .4s ease",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "rgba(248,245,238,.5)"; e.target.style.background = "rgba(248,245,238,.06)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(248,245,238,.2)"; e.target.style.background = "transparent"; }}
          >Our Story</a>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: r ? 1 : 0, transition: "opacity 1s ease 2.8s",
      }}>
        <div style={{ width: 1, height: 32, background: "rgba(248,245,238,.12)" }} />
        <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 7, letterSpacing: 3, textTransform: "uppercase", color: "rgba(248,245,238,.2)" }}>Scroll</span>
      </div>
    </section>
  );
}

function Strip() {
  const [ref, v] = useV(.15);
  const isMobile = useMedia("(max-width: 768px)");
  const stats = [
    { n: "5th", l: "Blue Zone", sub: "On Earth" },
    { n: "100+", l: "Years Lived", sub: "Tradition of longevity" },
    { n: "0.18%", l: "Acidity", sub: "Exceptional purity" },
    { n: "412", l: "Polyphenols", sub: "mg/kg — nutrient rich" },
  ];
  return (
    <section ref={ref} style={{ background: C.dark, padding: isMobile ? "40px 24px" : "60px", borderTop: "1px solid rgba(255,255,255,.03)" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
        gap: isMobile ? "32px 16px" : 0,
      }}>
        {stats.map((d, i) => (
          <div key={i} style={{
            textAlign: "center",
            padding: isMobile ? "0 8px" : "0 28px",
            borderRight: !isMobile && i < 3 ? "1px solid rgba(255,255,255,.05)" : "none",
            opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)",
            transition: `all .7s cubic-bezier(.16,1,.3,1) ${i * .1}s`,
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? 38 : 48, color: C.gold, fontWeight: 300, lineHeight: 1 }}>{d.n}</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.cream, marginTop: 10, marginBottom: 4 }}>{d.l}</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: "rgba(248,245,238,.25)" }}>{d.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ShopBanner() {
  const isMobile = useMedia("(max-width: 768px)");
  return (
    <section style={{ background: C.accent, padding: isMobile ? "20px 24px" : "20px 60px" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 0,
        textAlign: isMobile ? "center" : "left",
      }}>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, letterSpacing: 1.5, color: "rgba(248,245,238,.7)", margin: 0 }}>
          🫒 First harvest arriving soon · Limited bottles available
        </p>
        <a href="#shop" style={{
          fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 3,
          textTransform: "uppercase", textDecoration: "none",
          padding: "10px 28px", background: C.gold, color: C.dark,
          whiteSpace: "nowrap", transition: "background .3s",
        }}
          onMouseEnter={e => e.target.style.background = "#b8983e"}
          onMouseLeave={e => e.target.style.background = C.gold}
        >Reserve Yours →</a>
      </div>
    </section>
  );
}

function Shop() {
  const [selected, setSelected] = useState(1);
  const [added, setAdded] = useState(false);
  const isMobile = useMedia("(max-width: 768px)");

  const options = [
    { qty: 1, label: "Single Bottle", size: "250ml", price: 20, badge: null },
    { qty: 3, label: "Grove Bundle", size: "3 × 250ml", price: 54, badge: "Save £6", popular: true },
    { qty: 6, label: "Full Case",    size: "6 × 250ml", price: 100, badge: "Save £20" },
  ];

  const chosen = options.find(o => o.qty === selected);

  return (
    <section id="shop" style={{ background: C.bg, padding: isMobile ? "60px 24px" : "clamp(100px,12vw,160px) 60px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        <A><Label>Our Product</Label></A>
        <A d={.06}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isMobile ? "clamp(36px,9vw,52px)" : "clamp(38px,4vw,58px)",
            fontWeight: 300, color: C.dark, lineHeight: 1.05, margin: "0 0 6px",
          }}>Extra Virgin<br /><em style={{ fontStyle: "italic", color: C.accent }}>Olive Oil</em></h2>
        </A>
        <A d={.08}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontStyle: "italic", color: C.muted, marginBottom: 36 }}>
            Premium Unfiltered · Bosana Cultivar · Villacidro, Sardinia
          </p>
        </A>

        {/* Features */}
        <A d={.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, marginBottom: 40, border: `1px solid ${C.border}` }}>
            {[
              { t: "Single Origin", d: "100% Bosana, Villacidro" },
              { t: "Cold Pressed", d: "Within 4 hours of harvest" },
              { t: "NFC Verified", d: "Scan to trace every step" },
              { t: "Unfiltered", d: "Acidity 0.18% · Polyphenols 412 mg/kg" },
            ].map((f, i) => (
              <div key={i} style={{
                padding: "16px 18px", background: C.bg,
                borderRight: i % 2 === 0 ? `1px solid ${C.border}` : "none",
                borderBottom: i < 2 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10.5, fontWeight: 500, color: C.dark, marginBottom: 4 }}>{f.t}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: C.muted }}>{f.d}</div>
              </div>
            ))}
          </div>
        </A>

        {/* Options */}
        <A d={.14}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.muted, marginBottom: 14 }}>Select option</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
            {options.map(o => (
              <div key={o.qty} onClick={() => setSelected(o.qty)} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "18px 20px", cursor: "pointer",
                border: `1.5px solid ${selected === o.qty ? C.gold : C.border}`,
                background: selected === o.qty ? C.goldLight : "transparent",
                transition: "all .25s",
                position: "relative",
              }}>
                {o.popular && (
                  <div style={{
                    position: "absolute", top: -10, left: 20,
                    background: C.accent, color: C.cream,
                    fontFamily: "'Outfit',sans-serif", fontSize: 7.5, letterSpacing: 2.5,
                    textTransform: "uppercase", padding: "3px 10px",
                  }}>Most Popular</div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%",
                    border: `1.5px solid ${selected === o.qty ? C.gold : C.border}`,
                    background: selected === o.qty ? C.gold : "transparent",
                    transition: "all .25s", flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 500, color: C.dark }}>{o.label}</div>
                    <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10.5, color: C.muted, marginTop: 2 }}>{o.size}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {o.badge && (
                    <span style={{
                      fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 1.5,
                      textTransform: "uppercase", color: C.accent,
                      background: "rgba(59,87,85,.08)", padding: "3px 8px",
                    }}>{o.badge}</span>
                  )}
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: C.dark, fontWeight: 300 }}>£{o.price}</span>
                </div>
              </div>
            ))}
          </div>
        </A>

        {/* CTA */}
        <A d={.18}>
          <button
            onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2500); }}
            style={{
              width: "100%", height: 58,
              background: added ? C.accent : C.dark,
              border: "none", color: C.cream,
              fontFamily: "'Outfit',sans-serif", fontSize: 11, letterSpacing: 3,
              textTransform: "uppercase", cursor: "pointer", transition: "background .4s",
            }}
            onMouseEnter={e => { if (!added) e.target.style.background = C.accent; }}
            onMouseLeave={e => { if (!added) e.target.style.background = C.dark; }}
          >{added ? `✓  Added to Bag — £${chosen.price}` : `Add to Bag — £${chosen.price}`}</button>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10.5, color: C.muted, marginTop: 14, textAlign: "center" }}>
            🔒 Secure checkout · Free shipping over £60 · 30-day returns
          </p>
        </A>
      </div>
    </section>
  );
}

function Restaurant() {
  const isMobile = useMedia("(max-width: 768px)");
  const [selected, setSelected] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", restaurant: "", email: "", phone: "", notes: "" });

  const formats = [
    { id: 0, name: "Starter Case",    desc: "12 × 500ml bottles",  price: "£180",  unit: "£15 / bottle",  badge: null },
    { id: 1, name: "Restaurant Case", desc: "24 × 500ml bottles",  price: "£320",  unit: "£13.30 / bottle", badge: "Most Popular" },
    { id: 2, name: "3L Catering Tin", desc: "4 × 3L tins",         price: "£260",  unit: "£65 / tin",     badge: null },
    { id: 3, name: "5L Catering Tin", desc: "4 × 5L tins",         price: "£380",  unit: "£95 / tin",     badge: "Best Value" },
  ];

  const handleSubmit = () => {
    if (form.name && form.restaurant && form.email) setSubmitted(true);
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px",
    background: C.bg, border: `1px solid ${C.border}`,
    fontFamily: "'Outfit',sans-serif", fontSize: 13, color: C.dark,
    outline: "none", borderRadius: 0,
    boxSizing: "border-box",
  };

  return (
    <section id="restaurant" style={{ background: C.dark, padding: isMobile ? "60px 24px" : "clamp(100px,12vw,160px) 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: isMobile ? 40 : 64, flexDirection: isMobile ? "column" : "row", gap: isMobile ? 20 : 0 }}>
          <div>
            <A><Label light>For Restaurants</Label></A>
            <A d={.06}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: isMobile ? "clamp(34px,9vw,52px)" : "clamp(38px,5vw,62px)",
                fontWeight: 300, color: C.cream, lineHeight: 1.05, margin: 0,
              }}>Supply your kitchen<br /><em style={{ fontStyle: "italic", color: C.gold }}>with the best.</em></h2>
            </A>
          </div>
          <A d={.1} style={{ maxWidth: 320 }}>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, lineHeight: 2, color: "rgba(248,245,238,.4)", margin: 0, textAlign: isMobile ? "left" : "right" }}>
              Wholesale pricing for restaurants, hotels and delis. Consistent supply, NFC-verified quality, direct from Sardinia.
            </p>
          </A>
        </div>

        {/* Why us */}
        <A d={.12}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 1, marginBottom: 48, border: "1px solid rgba(255,255,255,.06)" }}>
            {[
              { t: "Direct Supply", d: "No middlemen. Straight from grove to kitchen." },
              { t: "NFC Verified", d: "Every batch traceable and certified." },
              { t: "Consistent Stock", d: "Reserved allocation for wholesale clients." },
              { t: "Flexible Formats", d: "Bottles or tins to suit your kitchen." },
            ].map((f, i) => (
              <div key={i} style={{
                padding: "20px 18px",
                borderRight: !isMobile && i < 3 ? "1px solid rgba(255,255,255,.06)" : "none",
                borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,.06)" : "none",
              }}>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10.5, fontWeight: 500, color: C.cream, marginBottom: 6, letterSpacing: .5 }}>{f.t}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10.5, color: "rgba(248,245,238,.35)", lineHeight: 1.7 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </A>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 64 }}>

          {/* Format selector */}
          <A d={.14}>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "rgba(248,245,238,.3)", marginBottom: 14 }}>Select format</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {formats.map(f => (
                <div key={f.id} onClick={() => setSelected(f.id)} style={{
                  padding: "18px 20px", cursor: "pointer",
                  border: `1.5px solid ${selected === f.id ? C.gold : "rgba(255,255,255,.08)"}`,
                  background: selected === f.id ? "rgba(196,169,106,.08)" : "transparent",
                  transition: "all .25s", position: "relative",
                }}>
                  {f.badge && (
                    <div style={{
                      position: "absolute", top: -10, left: 16,
                      background: C.gold, color: C.dark,
                      fontFamily: "'Outfit',sans-serif", fontSize: 7.5, letterSpacing: 2,
                      textTransform: "uppercase", padding: "3px 10px",
                    }}>{f.badge}</div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                        border: `1.5px solid ${selected === f.id ? C.gold : "rgba(255,255,255,.2)"}`,
                        background: selected === f.id ? C.gold : "transparent",
                        transition: "all .25s",
                      }} />
                      <div>
                        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 500, color: C.cream }}>{f.name}</div>
                        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10.5, color: "rgba(248,245,238,.35)", marginTop: 2 }}>{f.desc} · {f.unit}</div>
                      </div>
                    </div>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: C.gold, fontWeight: 300 }}>{f.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </A>

          {/* Order form */}
          <A d={.18}>
            {!submitted ? (
              <div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "rgba(248,245,238,.3)", marginBottom: 14 }}>Your details</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <input placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ ...inputStyle }} />
                    <input placeholder="Restaurant name" value={form.restaurant} onChange={e => setForm({ ...form, restaurant: e.target.value })} style={{ ...inputStyle }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <input placeholder="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ ...inputStyle }} />
                    <input placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ ...inputStyle }} />
                  </div>
                  <textarea placeholder="Any notes or special requirements..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} style={{ ...inputStyle, resize: "none", lineHeight: 1.8 }} />
                  <button onClick={handleSubmit} style={{
                    width: "100%", height: 54,
                    background: form.name && form.restaurant && form.email ? C.gold : "rgba(255,255,255,.06)",
                    border: "none", color: form.name && form.restaurant && form.email ? C.dark : "rgba(255,255,255,.2)",
                    fontFamily: "'Outfit',sans-serif", fontSize: 10, letterSpacing: 3,
                    textTransform: "uppercase", cursor: form.name && form.restaurant && form.email ? "pointer" : "default",
                    transition: "all .3s", marginTop: 4,
                  }}
                    onMouseEnter={e => { if (form.name && form.restaurant && form.email) e.target.style.background = "#b8983e"; }}
                    onMouseLeave={e => { if (form.name && form.restaurant && form.email) e.target.style.background = C.gold; }}
                  >Send Wholesale Enquiry — {formats[selected].price}</button>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: "rgba(248,245,238,.2)", textAlign: "center", lineHeight: 1.8 }}>
                    We'll reply within 24 hours to confirm your order and arrange delivery.
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", minHeight: 300, textAlign: "center", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", border: `1px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: C.gold, fontSize: 20 }}>✓</span>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontStyle: "italic", color: C.cream }}>Enquiry received.</div>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: "rgba(248,245,238,.35)", maxWidth: 260, lineHeight: 1.9 }}>
                  Thank you, {form.name}. We'll be in touch within 24 hours.
                </p>
              </div>
            )}
          </A>
        </div>
      </div>
    </section>
  );
}

function Origin() {
  const isMobile = useMedia("(max-width: 768px)");
  return (
    <section id="origin" style={{ background: C.warm, padding: isMobile ? "60px 24px" : "clamp(100px,14vw,180px) 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <A style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: isMobile ? 40 : 70 }}>
          <Label>Our Origin</Label>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 12, fontStyle: "italic", color: C.gold, opacity: .5 }}>Villacidro · Sardinia</span>
        </A>
        <A d={.06}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isMobile ? "clamp(36px,10vw,52px)" : "clamp(44px,6vw,80px)",
            fontWeight: 300, color: C.dark, lineHeight: 1.08,
            margin: isMobile ? "0 0 40px" : "0 0 60px", maxWidth: 820,
          }}>
            Where time moves slower,<br />
            <em style={{ fontStyle: "italic", color: C.accent }}>and lives run longer.</em>
          </h2>
        </A>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 80, alignItems: "start",
        }}>
          <div>
            <A d={.1}>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: isMobile ? 14 : 15, lineHeight: 2.2, color: C.muted, margin: "0 0 24px" }}>
                Sardinia is one of five Blue Zones on earth — places where people routinely live past 100. In the hills of Villacidro, the olive trees are as old as the traditions that surround them.
              </p>
            </A>
            <A d={.16}>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: isMobile ? 14 : 15, lineHeight: 2.2, color: C.muted, margin: "0 0 36px" }}>
                Every bottle of Blue Grove is cold-pressed within hours of harvest. No shortcuts. No additives. Just olives, stone, and time — the same way it has always been done.
              </p>
            </A>
            <A d={.22}>
              <div style={{ borderLeft: `2px solid ${C.gold}`, paddingLeft: 20 }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? 18 : 21, fontStyle: "italic", color: C.dark, lineHeight: 1.7, margin: 0 }}>
                  "Not just oil. The taste of a longer, slower, more intentional life."
                </p>
              </div>
            </A>
          </div>
          <A d={.12}>
            <div style={{ position: "relative" }}>
              <img src={IMG.sardinia} alt="Villacidro" style={{ width: "100%", height: isMobile ? 280 : 520, objectFit: "cover" }} />
              <div style={{
                position: "absolute", top: -12, right: -12, width: "100%", height: "100%",
                border: `1px solid ${C.gold}`, opacity: .15, pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, padding: "48px 24px 20px",
                background: "linear-gradient(to top, rgba(22,25,24,.6), transparent)",
              }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 12, fontStyle: "italic", color: "rgba(248,245,238,.5)", margin: 0 }}>Villacidro, Medio Campidano — Sardinia</p>
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
  const isMobile = useMedia("(max-width: 768px)");
  const pics = [
    { src: IMG.gUlivo,        cap: "Ulivo centenario",        pos: "center center" },
    { src: IMG.gRaccoglitura, cap: "Raccoglitura a mano",     pos: "center 30%" },
    { src: IMG.gPasta,        cap: "Dalla terra alla tavola", pos: "center center" },
    { src: IMG.gPaesaggio,    cap: "Paesaggio sardo",         pos: "center 60%" },
  ];

  if (isMobile) {
    return (
      <section style={{ background: C.dark, padding: "60px 24px" }}>
        <div>
          <A><Label light>The Grove</Label></A>
          <A d={.06}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,9vw,48px)", fontWeight: 300, color: C.cream, lineHeight: 1.1, margin: "0 0 32px" }}>
              From the grove<br /><em style={{ fontStyle: "italic", color: C.gold }}>to your table.</em>
            </h2>
          </A>
          <A d={.1}>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13.5, lineHeight: 2, color: "rgba(248,245,238,.4)", marginBottom: 32 }}>
              In Villacidro, families have pressed oil from the same trees for generations. Centenarians here are not an exception — they are a tradition.
            </p>
          </A>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {pics.map((p, i) => (
              <A key={i} d={i * .06} style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ width: "100%", paddingBottom: "100%", position: "relative" }}>
                  <img src={p.src} alt={p.cap} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: p.pos }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(22,25,24,.6), transparent 50%)", display: "flex", alignItems: "flex-end", padding: 12 }}>
                    <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 8.5, letterSpacing: 1.5, textTransform: "uppercase", color: C.cream }}>{p.cap}</span>
                  </div>
                </div>
              </A>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const grid = [
    { gridColumn: "1/5", gridRow: "1/4" },
    { gridColumn: "5/13", gridRow: "1/3" },
    { gridColumn: "5/9", gridRow: "3/5" },
    { gridColumn: "9/13", gridRow: "3/5" },
  ];

  return (
    <section style={{ background: C.dark, padding: "clamp(80px,10vw,140px) 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52 }}>
          <div>
            <A><Label light>The Grove</Label></A>
            <A d={.06}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,5vw,62px)", fontWeight: 300, color: C.cream, lineHeight: 1.05, margin: 0 }}>
                From the grove<br /><em style={{ fontStyle: "italic", color: C.gold }}>to your table.</em>
              </h2>
            </A>
          </div>
          <A d={.1} style={{ maxWidth: 320 }}>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, lineHeight: 2, color: "rgba(248,245,238,.35)", margin: 0, textAlign: "right" }}>
              Pure air. Ancient roots. A microclimate shaped over millennia. Where extraordinary oil is born — and extraordinary lives are lived.
            </p>
          </A>
        </div>
        <A d={.12}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 60px", marginBottom: 44, paddingBottom: 44, borderBottom: "1px solid rgba(255,255,255,.05)" }}>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13.5, lineHeight: 2.1, color: "rgba(248,245,238,.4)", margin: 0 }}>
              In Villacidro, at the heart of Sardinia's Blue Zone, families have pressed oil from the same trees for generations. Centenarians here are not an exception — they are a tradition.
            </p>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13.5, lineHeight: 2.1, color: "rgba(248,245,238,.4)", margin: 0 }}>
              Every olive we harvest carries that legacy. Pure air, ancient roots, a microclimate unlike anywhere else on earth. This is where extraordinary oil is born.
            </p>
          </div>
        </A>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gridAutoRows: 200, gap: 6 }}>
          {pics.map((p, i) => (
            <A key={i} d={i * .06} style={{ ...grid[i], position: "relative", overflow: "hidden" }}>
              <div style={{ width: "100%", height: "100%", cursor: "pointer" }}
                onMouseEnter={() => setH(i)} onMouseLeave={() => setH(null)}>
                <img src={p.src} alt={p.cap} style={{
                  width: "100%", height: "100%", objectFit: "cover", objectPosition: p.pos,
                  transform: h === i ? "scale(1.05)" : "scale(1)",
                  transition: "transform .8s cubic-bezier(.16,1,.3,1)",
                  filter: h === i ? "brightness(1)" : "brightness(.82)",
                }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: h === i ? "linear-gradient(to top, rgba(22,25,24,.7), transparent 60%)" : "transparent",
                  transition: "background .4s", display: "flex", alignItems: "flex-end", padding: 20,
                }}>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: C.cream, opacity: h === i ? 1 : 0, transition: "opacity .3s" }}>{p.cap}</span>
                </div>
              </div>
            </A>
          ))}
        </div>
      </div>
    </section>
  );
}

function Verify() {
  const [active, setActive] = useState(0);
  const isMobile = useMedia("(max-width: 768px)");
  return (
    <section id="verify" style={{ background: C.bg, padding: isMobile ? "60px 24px" : "clamp(100px,12vw,160px) 60px" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? 40 : 80, alignItems: "center",
      }}>
        <div>
          <A><Label>Verified Authenticity</Label></A>
          <A d={.08}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: isMobile ? "clamp(32px,9vw,48px)" : "clamp(36px,4vw,54px)",
              fontWeight: 300, color: C.dark, lineHeight: 1.08, margin: "0 0 18px",
            }}>The only oil<br /><em style={{ fontStyle: "italic", color: C.accent }}>you can verify.</em></h2>
          </A>
          <A d={.14}>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, lineHeight: 2.1, color: C.muted, margin: "0 0 32px" }}>
              80% of extra virgin oil worldwide is adulterated. Every Blue Grove bottle carries NFC + QR verification — scan it and trace every step from tree to table.
            </p>
          </A>
          {[
            { n: "01", t: "Scan", d: "Tap your phone to the NFC chip or scan the QR code." },
            { n: "02", t: "Trace", d: "See grove location, harvest date, press time and chemical analysis." },
            { n: "03", t: "Trust", d: "Immutable data. No fraud. Just truth." },
          ].map((s, i) => (
            <A key={i} d={.2 + i * .07}>
              <div onClick={() => setActive(i)} style={{
                padding: "18px 20px", marginBottom: 6, cursor: "pointer",
                background: active === i ? C.goldLight : "transparent",
                borderLeft: `2px solid ${active === i ? C.gold : C.border}`,
                transition: "all .3s",
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: active === i ? C.gold : "rgba(0,0,0,.08)", transition: "color .3s", minWidth: 28 }}>{s.n}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 21, color: C.dark }}>{s.t}</div>
                    <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.8, maxHeight: active === i ? 80 : 0, opacity: active === i ? 1 : 0, overflow: "hidden", transition: "all .4s ease", marginTop: active === i ? 5 : 0 }}>{s.d}</div>
                  </div>
                </div>
              </div>
            </A>
          ))}
        </div>
        <A d={.15}>
          <div style={{ background: C.dark, padding: isMobile ? "32px 24px" : "44px 36px" }}>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 7.5, letterSpacing: 3, textTransform: "uppercase", color: "rgba(248,245,238,.18)", marginBottom: 24 }}>Verification Preview</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 21, color: C.cream, marginBottom: 4 }}>Blue Grove</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9.5, color: C.gold, letterSpacing: 2, marginBottom: 24 }}>Lot #0001 · 2026 Harvest</div>
            {[
              ["Grove", "Villacidro, Sardinia"],
              ["Cultivar", "Bosana"],
              ["Harvest", "October 2026"],
              ["Pressed", "Within 4 hours"],
              ["Acidity", "0.18%"],
              ["Polyphenols", "412 mg/kg"],
            ].map(([k, val], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "1px solid rgba(248,245,238,.05)" }}>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9.5, color: "rgba(248,245,238,.28)", letterSpacing: 1.5, textTransform: "uppercase" }}>{k}</span>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11.5, color: "rgba(248,245,238,.7)" }}>{val}</span>
              </div>
            ))}
            <div style={{ marginTop: 24, padding: "11px 24px", border: `1px solid rgba(196,169,106,.25)`, display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, display: "inline-block" }} />
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 8.5, letterSpacing: 3, textTransform: "uppercase", color: C.gold }}>Verified Authentic</span>
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
  const isMobile = useMedia("(max-width: 768px)");
  return (
    <section style={{ background: C.dark, padding: isMobile ? "60px 24px" : "clamp(100px,12vw,160px) 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.sardinia})`, backgroundSize: "cover", backgroundPosition: "center", opacity: .04 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <A><Label light>Early Access</Label></A>
        <A d={.08}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isMobile ? "clamp(34px,10vw,52px)" : "clamp(38px,5.5vw,68px)",
            fontWeight: 300, color: C.cream, lineHeight: 1.1, margin: "0 0 16px",
          }}>The first harvest<br /><em style={{ fontStyle: "italic", color: C.gold }}>arrives soon.</em></h2>
        </A>
        <A d={.14}>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13.5, color: "rgba(248,245,238,.35)", maxWidth: 400, margin: "0 auto 40px", lineHeight: 2 }}>
            Join the list for early access, harvest updates and the story behind every bottle.
          </p>
        </A>
        <A d={.2}>
          {!done ? (
            <div style={{ display: "flex", maxWidth: 480, width: "100%", margin: "0 auto", flexDirection: isMobile ? "column" : "row" }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                style={{
                  flex: 1, padding: "18px 22px",
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.07)",
                  borderRight: isMobile ? "1px solid rgba(255,255,255,.07)" : "none",
                  borderBottom: isMobile ? "none" : "1px solid rgba(255,255,255,.07)",
                  color: "#fff", fontFamily: "'Outfit',sans-serif", fontSize: 13, outline: "none",
                  borderRadius: 0,
                }} />
              <button onClick={() => email && setDone(true)} style={{
                padding: "18px 36px", background: C.gold, border: `1px solid ${C.gold}`,
                color: C.dark, fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 3,
                textTransform: "uppercase", cursor: "pointer", transition: "all .3s",
                minHeight: 56,
              }}
                onMouseEnter={e => e.target.style.background = "#b8983e"}
                onMouseLeave={e => e.target.style.background = C.gold}
              >Notify Me</button>
            </div>
          ) : (
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontStyle: "italic", color: C.gold }}>Thank you. We will be in touch.</div>
          )}
        </A>
      </div>
    </section>
  );
}

function Footer() {
  const isMobile = useMedia("(max-width: 768px)");
  return (
    <footer style={{ background: "#0F1110", padding: isMobile ? "40px 24px 28px" : "48px 60px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", alignItems: isMobile ? "center" : "center",
          gap: isMobile ? 20 : 0,
          paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,.04)",
          textAlign: isMobile ? "center" : "left",
        }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, letterSpacing: 5, textTransform: "uppercase", color: "rgba(248,245,238,.25)" }}>Blue Grove</span>
          <div style={{ display: "flex", gap: 28 }}>
            {["Instagram", "TikTok"].map(s => (
              <a key={s} href="#" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: "rgba(248,245,238,.2)", textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase" }}>{s}</a>
            ))}
          </div>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9.5, color: "rgba(248,245,238,.1)" }}>Villacidro, Sardinia</span>
        </div>
        <div style={{ paddingTop: 18, display: "flex", justifyContent: "space-between", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 8 : 0, textAlign: isMobile ? "center" : "left" }}>
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
        input::placeholder { color: rgba(255,255,255,.2); }
        button, a { -webkit-tap-highlight-color: transparent; }
      `}</style>
      <Nav />
      <Hero />
      <ShopBanner />
      <Strip />
      <Shop />
      <Restaurant />
      <Origin />
      <Gallery />
      <Verify />
      <Join />
      <Footer />
    </div>
  );
}
