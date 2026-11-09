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
  { name: "Boiler services", image: "boiler.webp", alt: "Modern wall-mounted boiler", detail: "Servicing, repairs & installations" },
  { name: "Gas services", image: "gas.webp", alt: "Blue flame on a gas burner", detail: "Gas appliance work & checks" },
  { name: "Plumbing services", image: "plumbing.webp", alt: "Engineer working on pipework", detail: "Pipes, leaks & general plumbing" },
  { name: "Heating services", image: "heating.webp", alt: "Engineer fitting a heating component", detail: "Heating systems & radiators" },
  { name: "HIU services", image: "hiu.webp", alt: "Engineer working on heat interface unit components", detail: "Heat interface unit support" },
  { name: "Air source heat pumps", image: "heat-pump.webp", alt: "Outdoor air source heat pump", detail: "Heat pump services" },
  { name: "Commercial gas & heating", image: "commercial.webp", alt: "Engineer working on commercial heating pipework", detail: "Commercial systems & plant rooms" },
  { name: "Emergency repairs", image: "emergency.webp", alt: "Engineer repairing plumbing under a sink", detail: "Urgent plumbing & heating help" },
  { name: "Commercial catering", image: "catering.webp", alt: "Commercial kitchen catering equipment", detail: "Kitchen equipment support" },
  { name: "Underfloor heating", image: "underfloor.webp", alt: "Underfloor heating pipework being installed", detail: "Underfloor systems" }
];

document.querySelectorAll(".phone-display").forEach(el => { el.textContent = company.phoneDisplay; });
document.querySelectorAll(".call-link").forEach(el => { el.href = `tel:${company.phoneDial}`; });
document.querySelectorAll(".email-link").forEach(el => { el.textContent = company.email; el.href = `mailto:${company.email}`; });
document.querySelectorAll(".domain-link").forEach(el => { el.textContent = company.domain; el.href = `https://${company.domain}`; });
document.querySelectorAll(".company-name").forEach(el => { el.textContent = company.name; });
document.querySelectorAll(".company-number").forEach(el => { el.textContent = company.companyNumber; });
document.querySelectorAll(".company-address").forEach(el => { el.textContent = company.registeredOffice; });
document.getElementById("year").textContent = new Date().getFullYear();

const grid = document.getElementById("service-grid");
services.forEach((service, index) => {
  const card = document.createElement("article");
  card.className = "service-card reveal";
  card.innerHTML = `<div class="service-image"><img src="assets/${service.image}" alt="${service.alt}" loading="lazy" width="700" height="500"></div><div class="service-content"><span class="service-number">${String(index + 1).padStart(2, "0")}</span><h3>${service.name}</h3><p>${service.detail}</p><a href="tel:${company.phoneDial}" aria-label="Call about ${service.name}">Call about this <span class="arrow-icon" aria-hidden="true"></span></a></div>`;
  grid.appendChild(card);
});

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
