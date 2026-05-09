export interface Template {
  id: string;
  name: string;
  type: string;
  accent: "blue" | "purple" | "emerald" | "orange";
  headlineEdit: string;
  codeLines: string[];
  dragTo: { x: number; y: number };
}

export const templates: Template[] = [
  {
    id: "ecommerce",
    name: "E-Commerce Store",
    type: "Next.js / Shopify",
    accent: "blue",
    headlineEdit: "Shop Premium Gear",
    codeLines: [
      "<Product price={item.price} />",
      "cart.add(item.id, qty)",
      "stripe.checkout(cart)",
    ],
    dragTo: { x: 90, y: 0 },
  },
  {
    id: "saas",
    name: "SaaS Dashboard",
    type: "React / Tailwind",
    accent: "purple",
    headlineEdit: "Track Every Metric",
    codeLines: [
      "const { data } = useQuery(METRICS)",
      "<Chart data={data.weekly} />",
      'setFilter("last_30_days")',
    ],
    dragTo: { x: 0, y: 60 },
  },
  {
    id: "portfolio",
    name: "Portfolio / Agency",
    type: "Next.js / GSAP",
    accent: "emerald",
    headlineEdit: "We Craft Experiences",
    codeLines: [
      'gsap.from(".hero", { y: 60 })',
      "<ProjectCard key={p.slug} />",
      "router.push(`/work/${slug}`)",
    ],
    dragTo: { x: -70, y: 0 },
  },
  {
    id: "restaurant",
    name: "Restaurant",
    type: "Next.js / Prismic",
    accent: "orange",
    headlineEdit: "Reserve Your Table",
    codeLines: [
      "const menu = await prismic.get()",
      "<MenuItem dish={item} />",
      "booking.create({ date, guests })",
    ],
    dragTo: { x: 60, y: 40 },
  },
];
