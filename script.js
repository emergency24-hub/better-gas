/* Edit these company details here. Phone links, visible numbers, email,
   domain and footer details update automatically throughout the page. */
const company = {
  name: "Better Gas Ltd",
  phoneDisplay: "07520 654824",
  phoneDial: "+447520654824",
  email: "info@bettergasplumbingandheating.co.uk",
  domain: "bettergasplumbingandheating.co.uk",
  registeredOffice: "61 Warltersville Mansions Warltersville Road, London, England, N19 3AS",
  companyNumber: "12338743"
};

const services = [
  { id: "boiler", name: "Boiler services", image: "boiler.webp", alt: "Modern wall-mounted boiler", detail: "Servicing, repairs & installations", intro: "Help with boiler servicing, faults, repairs and new installations for London properties.", work: ["Boiler servicing", "Fault finding and repairs", "Boiler replacement and installation"] },
  { id: "gas", name: "Gas services", image: "gas.webp", alt: "Blue flame on a gas burner", detail: "Gas appliance work & checks", intro: "Gas appliance and pipework support for domestic and commercial properties.", work: ["Gas appliance work", "Gas pipework", "Gas system checks"] },
  { id: "plumbing", name: "Plumbing services", image: "plumbing.webp", alt: "Engineer working on pipework", detail: "Pipes, leaks & general plumbing", intro: "Practical help for leaks, pipework and everyday plumbing problems.", work: ["Leak investigation and repairs", "Pipework and fittings", "General plumbing work"] },
  { id: "heating", name: "Heating services", image: "heating.webp", alt: "Engineer fitting a heating component", detail: "Heating systems & radiators", intro: "Support for central heating systems, radiators and heating faults.", work: ["Heating fault finding", "Radiators and pipework", "System repairs and improvements"] },
  { id: "hiu", name: "HIU services", image: "hiu.webp", alt: "Engineer working on heat interface unit components", detail: "Heat interface unit support", intro: "Help with heat interface units in communal heating systems.", work: ["HIU checks", "Fault investigation", "Repairs and component work"] },
  { id: "heat-pumps", name: "Air source heat pumps", image: "heat-pump.webp", alt: "Outdoor air source heat pump", detail: "Heat pump services", intro: "Air source heat pump support for properties using low-carbon heating.", work: ["Heat pump enquiries", "System checks", "Heating system support"] },
  { id: "commercial", name: "Commercial gas & heating", image: "commercial.webp", alt: "Engineer working on commercial heating pipework", detail: "Commercial systems & plant rooms", intro: "Gas and heating support for businesses, managed properties and plant rooms.", work: ["Commercial heating systems", "Plant room equipment", "Gas and boiler work"] },
  { id: "emergency", name: "Emergency repairs", image: "emergency.webp", alt: "Engineer repairing plumbing under a sink", detail: "Urgent plumbing & heating help", intro: "When a plumbing or heating problem needs prompt attention, call to explain what has happened.", work: ["Leaks and plumbing faults", "Heating breakdowns", "Urgent repair enquiries"] },
  { id: "catering", name: "Commercial catering", image: "catering.webp", alt: "Commercial kitchen catering equipment", detail: "Kitchen equipment support", intro: "Support for gas and heating equipment in commercial catering settings.", work: ["Commercial kitchen equipment", "Gas appliance enquiries", "Fault investigation"] },
  { id: "underfloor", name: "Underfloor heating", image: "underfloor.webp", alt: "Underfloor heating pipework being installed", detail: "Underfloor systems", intro: "Help with underfloor heating systems and related pipework.", work: ["Underfloor heating enquiries", "System checks", "Repairs and adjustments"] }
];

document.querySelectorAll(".phone-display").forEach(el => { el.textContent = company.phoneDisplay; });
document.querySelectorAll(".call-link").forEach(el => { el.href = `tel:${company.phoneDial}`; });
document.querySelectorAll(".email-link").forEach(el => { el.textContent = company.email; el.href = `mailto:${company.email}`; });
document.querySelectorAll(".domain-link").forEach(el => { el.textContent = company.domain; el.href = `https://${company.domain}`; });
document.querySelectorAll(".company-name").forEach(el => { el.textContent = company.name; });
document.querySelectorAll(".company-number").forEach(el => { el.textContent = company.companyNumber; });
document.querySelectorAll(".company-address").forEach(el => { el.textContent = company.registeredOffice; });
document.getElementById("year").textContent = new Date().getFullYear();
document.querySelectorAll(".map-link").forEach(el => { el.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.registeredOffice)}`; });

const grid = document.getElementById("service-grid");
if (grid) services.forEach((service, index) => {
  const card = document.createElement("article");
  card.className = "service-card reveal";
  card.innerHTML = `<a class="service-card-link" href="service.html?service=${service.id}" aria-label="Learn about ${service.name}"><div class="service-image"><img src="assets/${service.image}" alt="${service.alt}" loading="lazy" width="700" height="500"></div><div class="service-content"><span class="service-number">${String(index + 1).padStart(2, "0")}</span><h3>${service.name}</h3><p>${service.detail}</p><span class="service-more">Explore service</span></div></a>`;
  grid.appendChild(card);
});

const detail = document.getElementById("service-detail");
if (detail) {
  const id = new URLSearchParams(location.search).get("service");
  const service = services.find(item => item.id === id) || services[0];
  document.title = `${service.name} | ${company.name}`;
  document.querySelector('meta[name="description"]').content = `${service.intro} Call ${company.name} on ${company.phoneDisplay}.`;
  detail.querySelector("h1").textContent = service.name;
  detail.querySelector(".detail-intro").textContent = service.intro;
  detail.querySelector(".detail-image").src = `assets/${service.image}`;
  detail.querySelector(".detail-image").alt = service.alt;
  detail.querySelector(".detail-work").replaceChildren(...service.work.map(item => { const li = document.createElement("li"); li.textContent = item; return li; }));
  detail.querySelector(".detail-heading").textContent = `Help with ${service.name.toLowerCase()}`;
}

const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute("aria-label", expanded ? "Open menu" : "Close menu");
  mobileNav.hidden = expanded;
});
mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
}));

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}
