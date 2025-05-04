const ServiceCard = ({ title, items }) => (
  <div className="service-card">
    <h3>{title}</h3>
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);
