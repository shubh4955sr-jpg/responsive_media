/**
 * Shared navigation configuration.
 * Add, remove, or reorder links in one place — both desktop and mobile
 * menus stay in sync automatically.
 */
const NAV_LINKS = [
  { label: "Home",       href: "#" },
  { label: "Service",    href: "#" },
  { label: "About Us",   href: "#" },
  { label: "Contact Us", href: "#" },
];

function buildNavItems(links) {
  return links
    .map(({ label, href }) => `<li><a href="${href}">${label}</a></li>`)
    .join("\n");
}

document.addEventListener("DOMContentLoaded", () => {
  const items = buildNavItems(NAV_LINKS);

  document.querySelectorAll("[data-nav]").forEach((list) => {
    list.innerHTML = items;
  });
});
