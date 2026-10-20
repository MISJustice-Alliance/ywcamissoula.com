// Schema.org node factories. Each returns null when a required visible value
// is missing, so a page never gets partial or invented markup.

export function organizationNode(publisher) {
  if (!publisher?.name) return null;
  const node = { "@type": "Organization", name: publisher.name };
  if (publisher.url) node.url = publisher.url;
  return node;
}

// crumbs: the visible breadcrumb links; current: the page itself (visible H1 + canonical).
export function breadcrumbNode(crumbs, current) {
  const items = [...crumbs, current];
  if (crumbs.length === 0 || items.some((c) => !c?.name || !c?.url)) return null;
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })),
  };
}

// Requires a headline, the canonical URL, and at least one visible date.
export function articleNode(fields, publisher) {
  const { headline, url, description, datePublished, dateModified } = fields ?? {};
  if (!headline || !url || !(datePublished || dateModified)) return null;
  const node = { "@type": "Article", headline, mainEntityOfPage: url };
  if (description) node.description = description;
  if (datePublished) node.datePublished = datePublished;
  if (dateModified) node.dateModified = dateModified;
  const org = organizationNode(publisher);
  if (org) node.publisher = org;
  return node;
}

// Google requires a 50-5000 character description for Dataset.
export function datasetNode(fields) {
  const { name, description, url, creator, dateModified, isBasedOn, distribution } = fields ?? {};
  if (!name || !url || !description || description.length < 50 || description.length > 5000) return null;
  const org = organizationNode(creator);
  if (!org) return null;
  const node = { "@type": "Dataset", name, description, url, creator: org };
  if (dateModified) node.dateModified = dateModified;
  if (isBasedOn) node.isBasedOn = isBasedOn;
  if (distribution) node.distribution = distribution;
  return node;
}

// One block per page. "<" and line/paragraph separators are escaped so the
// JSON cannot end the <script> element or break older parsers.
export function toJsonLd(nodes) {
  const graph = nodes.filter(Boolean);
  if (graph.length === 0) return null;
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
    .replace(/</g, "\\u003c")
    .replace(new RegExp(String.fromCharCode(0x2028), "g"), "\\u2028")
    .replace(new RegExp(String.fromCharCode(0x2029), "g"), "\\u2029");
}
