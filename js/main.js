const $ = (s, e = document) => e.querySelector(s), $$ = (s, e = document) => [...e.querySelectorAll(s)];
const WA = "94742432804";
function toast(t) { const e = $("#toast"); e.textContent = t; e.style.display = "block"; clearTimeout(toast.t); toast.t = setTimeout(() => e.style.display = "none", 2600) }
$("#yr").textContent = new Date().getFullYear();
$("#burger").onclick = () => $("#menu").classList.toggle("open");
$$("#menu a").forEach(a => a.onclick = () => $("#menu").classList.remove("open"));

// Sub-brands
const L = ["infpirex", "infyzora", "inframex", "infysona"];
const B = [["✦", "iNfpirex<span class='tm-small'>TM</span>", "Visualizing the Infinite", "Graphic Services", "Bold visuals, identities and artwork that make your ideas impossible to ignore."],
["⌘", "iNfyzora<span class='tm-small'>TM</span>", "Linking You to Infinity", "Software & Tech Team", "Apps, systems and tools engineered for real people and real problems."],
["◉", "iNframex<span class='tm-small'>TM</span>", "Capturing Infinite Moments", "Photography & Videography", "Cinematic photos and videos that freeze moments into forever."],
["♪", "iNfysona<span class='tm-small'>TM</span>", "The Sound of Infinite Emotions", "Music Creation & Audio", "Original music, mixing and mastering that carries emotion."]];
$("#brandGrid").innerHTML = B.map((b, i) => `<div class="card" data-open="svc" data-tab="${i}" style="cursor:pointer"><div class="ico"><img src="logos/${L[i]}.svg" alt="" width="48" height="48"></div><h3 class="grad">${b[1]}</h3><em>${b[2]}</em><p>${b[4]}</p><span class="role">${b[3]}</span></div>`).join("");

// Reviews
const R = [
  ["iNfpirex<span class='tm-small'>TM</span>", "Sample Client", 5, "Sample review — replace with real feedback from your customers."],
  ["iNfyzora<span class='tm-small'>TM</span>", "Sample Client", 5, "Add genuine comments here, or let visitors submit below."],
  ["iNframex<span class='tm-small'>TM</span>", "Sample Client", 4, "Reviews added by visitors appear instantly (until page refresh)."]
];

const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const card = r => `<div class="card rv"><small>${r[0]}</small><div class="stars">${"★".repeat(r[2])}${"☆".repeat(5 - r[2])}</div><p>“${esc(r[3])}”</p><div class="who">${esc(r[1])}</div></div>`;

const renderMarqueeReviews = () => {
  const duplicatedReviews = [...R, ...R];
  const htmlContent = duplicatedReviews.map(card).join("");

  const topGrid = document.getElementById("rvGridTop");
  const bottomGrid = document.getElementById("rvGridBottom");

  if (topGrid) topGrid.innerHTML = htmlContent;
  if (bottomGrid) bottomGrid.innerHTML = htmlContent;
};

renderMarqueeReviews();

$("#rvForm").onsubmit = e => {
  e.preventDefault();
  const m = `Review for ${$("#rvB").value}\nName: ${$("#rvN").value}\nStars: ${$("#rvS").value}/5\n${$("#rvC").value}`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(m)}`, "_blank", "noopener");
  toast("Thanks! Send the WhatsApp message to submit your review.");
  e.target.reset();
};

// Popups
function openP(id, tab) { $("#" + id).classList.add("on"); document.body.style.overflow = "hidden"; $("#" + id).scrollTop = 0; if (id === "svc") setTab(tab || 0) }
function closeP() { $$(".pop.on").forEach(p => p.classList.remove("on")); document.body.style.overflow = "" }
document.addEventListener("click", e => {
  const o = e.target.closest("[data-open]"); if (o) { e.preventDefault(); openP(o.dataset.open, +o.dataset.tab || 0) }
  if (e.target.closest("[data-close]") || e.target.classList.contains("pop")) closeP();
  const w = e.target.closest("[data-wa]"); if (w) window.open(`https://wa.me/${WA}?text=${encodeURIComponent(w.dataset.wa)}`, "_blank", "noopener");
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeP() });
function setTab(i) { $$("#tabs button").forEach((b, k) => b.classList.toggle("on", k === i)); $$("#svc .panel").forEach((p, k) => p.classList.toggle("on", k === i)) }
$$("#tabs button").forEach((b, i) => b.onclick = () => setTab(i));
$("#ideaBtn").onclick = () => { const t = $("#idea").value.trim(); if (!t) return toast("Write your idea first"); window.open(`https://wa.me/${WA}?text=${encodeURIComponent("iNfyzora idea: " + t)}`, "_blank", "noopener") };
$("#eq").innerHTML = Array.from({ length: 40 }, (_, i) => `<i style="animation-delay:${(i * .13 % 1.2).toFixed(2)}s;animation-duration:${(.7 + (i * 37 % 10) / 10).toFixed(2)}s"></i>`).join("");

// Space background: stars + spiral galaxies
(() => {
  const c = $("#sky"), x = c.getContext("2d"); let W, H, S = [], G = [], my = 0;
  function init() {
    W = c.width = innerWidth; H = c.height = innerHeight; const n = Math.min(450, W * H / 4500 | 0);
    S = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + .2, p: Math.random() * 6.3, z: Math.random() * .6 + .1 }));
    G = [[.2, .25, .22, "#b86bff"], [.82, .6, .28, "#5b21b6"], [.5, 1.05, .2, "#b86bff"]].map(g => ({ x: g[0] * W, y: g[1] * H, R: g[2] * Math.min(W, 1100), col: g[3], a: Math.random() * 6, pts: Array.from({ length: 260 }, (_, i) => { const t = i / 260, arm = i % 2 * Math.PI; return { t, arm, o: (Math.random() - .5) * .35 } }) }))
  }
  function draw(tm) {
    x.fillStyle = "#121216"; x.fillRect(0, 0, W, H);
    G.forEach(g => {
      g.a += .0008; const y0 = g.y - my * .05; x.fillStyle = g.col;
      const gr = x.createRadialGradient(g.x, y0, 0, g.x, y0, g.R * .4); gr.addColorStop(0, g.col + "55"); gr.addColorStop(1, "transparent"); x.fillStyle = gr; x.fillRect(g.x - g.R, y0 - g.R, g.R * 2, g.R * 2);
      x.fillStyle = g.col; g.pts.forEach(p => { const r = p.t * g.R, a = g.a + p.arm + p.t * 5 + p.o; x.globalAlpha = .55 * (1 - p.t) + .1; x.fillRect(g.x + Math.cos(a) * r, y0 + Math.sin(a) * r * .45, 1.6, 1.6) }); x.globalAlpha = 1
    });
    S.forEach(s => { const a = .5 + .5 * Math.sin(tm / 700 + s.p); x.globalAlpha = .3 + .7 * a; x.fillStyle = "#f6f3fb"; const y = (s.y - my * s.z * .15 + H * 3) % H; x.beginPath(); x.arc(s.x, y, s.r, 0, 6.3); x.fill() }); x.globalAlpha = 1;
    requestAnimationFrame(draw)
  }
  addEventListener("resize", init); addEventListener("scroll", () => my = scrollY, { passive: true }); init(); requestAnimationFrame(draw)
})();

// Live content from the admin dashboard
(async () => {
  try {
    const r = await fetch("content.json?t=" + Date.now()); if (!r.ok) return; const d = await r.json();
    if (d.reviews && d.reviews.length) {
      R.length = 0;
      d.reviews.forEach(v => R.push([esc(v.brand || "").replace("™", "<span class='tm-small'>TM</span>"), v.name || "", +v.stars || 5, v.comment || ""]));
      renderMarqueeReviews();
    }
    const P = $$("#svc .panel"), L = ["infpirex", "infyzora", "inframex", "infysona"];
    L.forEach((b, i) => {
      const its = d.items.filter(x => x.brand === b); if (!its.length) return; const p = P[i]; let g = $(".sub", p); if (!g) { g = document.createElement("div"); g.className = "sub"; const btn = $(".btn", p); btn ? btn.before(g) : p.append(g) }
      if (b === "inframex") { const v = its.find(x => x.type === "video"), pl = $(".pl", p); if (v && pl) pl.outerHTML = `<video class="pl" controls preload="metadata" src="${esc(v.file)}" style="width:100%"></video>` }
      g.innerHTML = its.map(x => {
        const t = esc(x.title), f = esc(x.file), n = `<b>${t}</b>` + (x.desc ? esc(x.desc) : "");
        if (x.type === "image") return `<a class="tile" href="${f}" target="_blank" rel="noopener" style="padding:0;overflow:hidden;position:relative"><img src="${f}" alt="${t}" loading="lazy" style="width:100%;height:100%;object-fit:cover"></a>`;
        if (x.type === "video") return `<div class="tile" style="padding:0;overflow:hidden"><video src="${f}" controls preload="metadata" style="width:100%;height:100%;object-fit:cover"></video></div>`;
        if (x.type === "audio") return `<div class="tile" style="grid-column:span 2"><span>${n}<br><audio controls src="${f}" style="width:100%"></audio></span></div>`;
        return `<div class="card" style="grid-column:1/-1"><h3 style="font-size:1.4rem">${t}</h3><p>${esc(x.desc || "")}</p><a class="btn" href="${f}" download>⬇ ${x.platform ? x.platform.toUpperCase() : "Download"}</a></div>`
      }).join("")
    });
  } catch { }
})();
