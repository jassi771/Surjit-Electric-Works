// ---- Settings ----
const SINCE = 1981;

// About section photo. Set to "" to hide it.
const ABOUT_IMAGE = "assets/about-panel.webp";

// Clients from the company brochure: [name, director, site, year, amount in lakh]
const CLIENTS = [
  ["Rizvi Builders", "Mr A H Rizvi", "Rizvi Park, Rizvi Nagar, Rizvi Complex, Rizvi College, Rizvi High School at Bandra, Khar, Santacruz, Juhu", "1981-93", 90],
  ["Neelam Developers", "Mr K Patel", "Vaishali Nagar, Mulund (W)", "1983-87", 28],
  ["Raja Builders", "Mr Narendra Bhatia", "Khar, Bandra, Santacruz", "1994-04", 75],
  ["Gajra Group", "Mr Ramesh Gajra", "Airoli, Sanpada, Vashi, Navi Mumbai", "2004-11", 45],
  ["Hotel Yogi Executive", "Mr Sagar Bahri", "Sanpada, Navi Mumbai", "2007-10", 88],
  ["Hotel Yogi Midtown", "Mr Naresh Bahri", "Turbhe, Navi Mumbai", "2008-10", 65],
  ["Mukund Associates", "Mr Devji Bhanushali", "Vashi, Dronagiri, Uran", "2006-14", 52],
  ["G Space Developers", "Mr Govind Bhanushali", "Vashi, Dronagiri, Uran", "2009-13", 70],
  ["Vardhaman Cemacon Ltd", "Mr Vinay Patel", "Dronagiri, Uran", "2015-16", 50],
  ["Max Realties", "Mr Ramesh Gajra", "Bhoomi Mall, CBD Belapur", "2015-17", 85],
  ["Royal City", "Mr Raju Bhanushali", "Asangaon, Thane", "2014-16", 25],
  ["Gahlot Constructions", "Mr Om Gahlot", "Nerul, Vashi, Koparkharne", "2011-18", 47],
  ["Odhav Developers", "Mr Govind Bhanushali", "Silphata, Thane", "2016-18", 55],
  ["Hanjabai Charitable Trust", "Mr Om Gahlot", "College at Koparkharne, Navi Mumbai", "2017-18", 35],
  ["Gahlot & Akshar Associates", "Mr Nitish Gahlot", "Dronagiri, Uran", "2017-18", 70],
  ["Shree Ameva Constructions", "", "Dronagiri, Uran", "2017-18", 50],
];

// Projects with photos. To add a project, copy one block and put its photos in
// assets/projects/<project-name>/. Photos and facts are all optional.
const PROJECTS = [
  {
    title: "630 KVA / 11 KV Compact Substation",
    location: "Gahlot Pharmacy College, Koperkhairne, Navi Mumbai",
    facts: [
      ["Capacity", "630 KVA / 11 KV"],
      ["Delivered", "Within 45 days"],
      ["Commissioning", "MSEDCL Team, Vashi Division"],
    ],
    photos: [
      { src: "assets/projects/gahlot-substation/enclosure-outdoor.webp", caption: "Compact substation installed on its plinth" },
      { src: "assets/projects/gahlot-substation/transformer-inside.webp", caption: "630 KVA transformer inside the enclosure" },
      { src: "assets/projects/gahlot-substation/panels-and-plinth.webp", caption: "HT/LT panels on the foundation" },
      { src: "assets/projects/gahlot-substation/metering-cubicle.webp", caption: "HT metering cubicle ready for commissioning" },
      { src: "assets/projects/gahlot-substation/earthing-and-cables.webp", caption: "Earthing strips and cable laid to the plinth" },
    ],
  },
];
// ------------------

const $ = (s) => document.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const thisYear = new Date().getFullYear();

document.querySelectorAll("[data-years]").forEach((e) => (e.textContent = thisYear - SINCE + "+"));
document.querySelectorAll("[data-since-label]").forEach((e) => (e.textContent = SINCE));
document.querySelectorAll("[data-year]").forEach((e) => (e.textContent = thisYear));

// images
if (ABOUT_IMAGE) {
  const f = document.createElement("div");
  f.className = "photo";
  f.innerHTML = `<img src="${esc(ABOUT_IMAGE)}" alt="Surjit Electricals site work" loading="lazy">`;
  $("#about-side").append(f);
}

$("#client-list").innerHTML = CLIENTS.map(([n, d, site, yr, amt]) =>
  `<li><span class="nm">${esc(n)}</span><span class="amt">${amt} Lakh</span>` +
  (d ? `<span class="dir">${esc(d)}</span>` : "") +
  `<span class="site">${esc(site)}</span><span class="yr">${esc(yr)}</span></li>`
).join("");

// Projects section only appears when at least one project has photos
const PHOTOS = [];
const shown = PROJECTS.filter((p) => p.photos && p.photos.length);
if (!shown.length) {
  $("#projects").hidden = true;
  document.querySelector('.pills a[href="#projects"]').hidden = true;
} else {
  $("#project-list").innerHTML = shown.map((p) => {
    const facts = (p.facts || []).map(([k, v]) => `<li><span>${esc(k)}</span>${esc(v)}</li>`).join("");
    const figs = p.photos.map((g) => {
      const i = PHOTOS.push({ ...g, title: p.title }) - 1;
      return `<figure><button type="button" data-i="${i}" aria-label="Enlarge: ${esc(g.caption)}"><img src="${esc(g.src)}" alt="${esc(g.caption)}" loading="lazy"></button><figcaption>${esc(g.caption)}</figcaption></figure>`;
    }).join("");
    return `<article class="project"><header><h3>${esc(p.title)}</h3><p>${esc(p.location || "")}</p>${facts ? `<ul class="facts">${facts}</ul>` : ""}</header><div class="gallery">${figs}</div></article>`;
  }).join("");
}

// lightbox
const dlg = document.createElement("dialog");
dlg.innerHTML = `<img alt=""><p></p>`;
document.body.append(dlg);
dlg.addEventListener("click", () => dlg.close());
$("#project-list").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-i]");
  if (!b) return;
  const g = PHOTOS[b.dataset.i];
  dlg.querySelector("img").src = g.src;
  dlg.querySelector("img").alt = g.caption;
  dlg.querySelector("p").textContent = g.caption;
  dlg.showModal();
});

// mobile nav
const toggle = $(".nav-toggle"), nav = $("#nav");
const setNav = (open) => { nav.classList.toggle("open", open); toggle.setAttribute("aria-expanded", open); };
toggle.addEventListener("click", () => setNav(!nav.classList.contains("open")));
nav.addEventListener("click", (e) => { if (e.target.closest("a")) setNav(false); });

// active nav pill follows scroll
const links = [...document.querySelectorAll(".pills a:not([hidden])")];
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main > section[id]").forEach((s) => io.observe(s));
