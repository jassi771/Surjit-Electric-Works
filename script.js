// ---- Settings ----
const SINCE = 1981;

// About section photo. Set to "" to hide it.
const ABOUT_IMAGE = "assets/about-site.webp";

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

// Project photos: add files to assets/gallery/ and set src.
// The Projects section stays hidden until at least one photo has a src.
const GALLERY = [
  { src: "", caption: "Substation erection" },
  { src: "", caption: "HT/LT cable laying" },
  { src: "", caption: "Transformer commissioning" },
  { src: "", caption: "Panel installation" },
  { src: "", caption: "Street lighting" },
  { src: "", caption: "Overhead lines" },
];
// ------------------

const $ = (s) => document.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const thisYear = new Date().getFullYear();

document.querySelectorAll("[data-years]").forEach((e) => (e.textContent = thisYear - SINCE + "+"));
document.querySelectorAll("[data-since-label]").forEach((e) => (e.textContent = SINCE));
document.querySelectorAll("[data-year]").forEach((e) => (e.textContent = thisYear));

// total contract value (lakh -> crore)
const totalLakh = CLIENTS.reduce((n, c) => n + c[4], 0);
$("#total-amount").textContent = "₹" + Math.floor(totalLakh / 100) + " Cr+";

// images
if (ABOUT_IMAGE) {
  const f = document.createElement("div");
  f.className = "photo";
  f.innerHTML = `<img src="${esc(ABOUT_IMAGE)}" alt="Surjit Electricals site work" loading="lazy">`;
  $("#about-side").prepend(f);
}

$("#client-list").innerHTML = CLIENTS.map(([n, d, site, yr, amt]) =>
  `<li><span class="nm">${esc(n)}</span><span class="amt">${amt} Lakh</span>` +
  (d ? `<span class="dir">${esc(d)}</span>` : "") +
  `<span class="site">${esc(site)}</span><span class="yr">${esc(yr)}</span></li>`
).join("");

// Projects section only appears once real photos are added
const PHOTOS = GALLERY.filter((g) => g.src);
if (!PHOTOS.length) {
  $("#projects").hidden = true;
  document.querySelector('.pills a[href="#projects"]').hidden = true;
} else {
  $("#gallery-grid").innerHTML = PHOTOS.map((g, i) =>
    `<figure><button type="button" data-i="${i}" aria-label="Enlarge: ${esc(g.caption)}"><img src="${esc(g.src)}" alt="${esc(g.caption)}" loading="lazy"></button>
    <figcaption>${esc(g.caption)}</figcaption></figure>`).join("");
}

// lightbox
const dlg = document.createElement("dialog");
dlg.innerHTML = `<img alt=""><p></p>`;
document.body.append(dlg);
dlg.addEventListener("click", () => dlg.close());
$("#gallery-grid").addEventListener("click", (e) => {
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
