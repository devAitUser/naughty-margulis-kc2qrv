import { ServiceCard } from "./ServiceCard";

const services = [
  {
    title: "Scolarité et examens",
    items: ["Outils pédagogiques", "Outils collaboratifs", "Assistance"],
  },
  {
    title: "Messagerie",
    items: [
      "Notes → Consulter vos notes aux épreuves",
      "Calendrier des examens",
      "Messagerie électronique des étudiants",
    ],
  },
];

export const MainMenu = () => (
  <div className="services-grid">
    {services.map((service, index) => (
      <ServiceCard key={index} title={service.title} items={service.items} />
    ))}
  </div>
);
