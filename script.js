// ---- Edit these ----
const SINCE = 1981; // brochure says 1981; confirm with Dad (you mentioned 2001)
const EMAIL = "surjit_electricals@yahoo.com";

// Clients from the company brochure (contract amounts intentionally not shown)
const CLIENTS = [
  ["Rizvi Builders", "Bandra, Khar, Santacruz, Juhu", "1981-93"],
  ["Neelam Developers", "Vaishali Nagar, Mulund (W)", "1983-87"],
  ["Raja Builders", "Khar, Bandra, Santacruz", "1994-04"],
  ["Gajra Group", "Airoli, Sanpada, Vashi, Navi Mumbai", "2004-11"],
  ["Hotel Yogi Executive", "Sanpada, Navi Mumbai", "2007-10"],
  ["Hotel Yogi Midtown", "Turbhe, Navi Mumbai", "2008-10"],
  ["Mukund Associates", "Vashi, Dronagiri, Uran", "2006-14"],
  ["G Space Developers", "Vashi, Dronagiri, Uran", "2009-13"],
  ["Vardhaman Cemacon Ltd", "Dronagiri, Uran", "2015-16"],
  ["Max Realties", "Bhoomi Mall, CBD Belapur", "2015-17"],
  ["Royal City", "Asangaon, Thane", "2014-16"],
  ["Gahlot Constructions", "Nerul, Vashi, Koparkharne", "2011-18"],
  ["Odhav Developers", "Silphata, Thane", "2016-18"],
  ["Hanjabai Charitable Trust", "College at Koparkharne, Navi Mumbai", "2017-18"],
  ["Gahlot & Akshar Associates", "Dronagiri, Uran", "2017-18"],
  ["Shree Ameva Constructions", "Dronagiri, Uran", "2017-18"],
];

// Add photos: put files in assets/gallery/ and list them here.
// Items without "src" show a placeholder tile.
const GALLERY = [
  { src: "", caption: "Substation erection" },
  { src: "", caption: "HT/LT cable laying" },
  { src: "", caption: "Transformer commissioning" },
  { src: "", caption: "Panel installation" },
  { src: "", caption: "Street lighting" },
  { src: "", caption: "Overhead lines" },
];
// --------------------

const $ = (s) => document.querySelector(s);
const years = new Date().getFullYear() - SINCE;
document.querySelectorAll("[data-years]").forEach((e) => (e.textContent = years));
document.querySelectorAll("[data-since-label]").forEach((e) => (e.textContent = SINCE));
document.querySelectorAll("[data-year]").forEach((e) => (e.textContent = new Date().getFullYear()));

const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

$("#client-list").innerHTML = CLIENTS.map(
  ([n, site, yr]) => `<li><b>${esc(n)}</b><span>${esc(site)}</span><span>${esc(yr)}</span></li>`
).join("");

$("#gallery-grid").innerHTML = GALLERY.map((g) =>
  `<figure>${g.src
    ? `<img src="${esc(g.src)}" alt="${esc(g.caption)}" loading="lazy">`
    : `<div class="ph" role="img" aria-label="Photo coming soon">Photo coming soon</div>`}
  <figcaption>${esc(g.caption)}</figcaption></figure>`
).join("");

const toggle = $(".nav-toggle"), nav = $("#nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", false); }
});

$("#enquiry").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  if (!f.reportValidity()) return;
  const d = new FormData(f);
  const body = `Name: ${d.get("name")}\nPhone: ${d.get("phone")}\nWork: ${d.get("work")}\n\n${d.get("msg")}`;
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Website enquiry: " + d.get("work"))}&body=${encodeURIComponent(body)}`;
});
