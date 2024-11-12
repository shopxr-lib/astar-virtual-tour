const locationRelativePositions = [
  {
    tag: 14,
    title: "RoPlus",
    top: "20%",
    left: "13.5%",
  },
  {
    tag: 15,
    title: "Build Lab",
    top: "28%",
    left: "22%",
  },
  {
    tag: 13,
    title: "Materials Lab",
    top: "1%",
    left: "28%",
  },
  {
    tag: 12,
    title: "IFinity",
    top: "11%",
    left: "33%",
  },
  {
    tag: 16,
    title: "EV Section",
    top: "38%",
    left: "38%",
  },
  {
    tag: 11,
    title: "Impression Sunrise",
    top: "25%",
    left: "39.5%",
  },
  {
    tag: 17,
    title: "Edible Innovations",
    top: "48%",
    left: "41%",
  },
  {
    tag: 18,
    top: "44%",
    left: "49%",
    title: "Smooder",
  },
  {
    tag: 10,
    top: "35%",
    left: "50%",
    title: "Airleo",
  },
  {
    tag: 9,
    top: "5%",
    left: "50.5%",
    title: "Design Lab 2",
  },
  {
    tag: 7,
    top: "39%",
    left: "59%",
    title: "Rebee",
  },
  {
    tag: 8,
    top: "18%",
    left: "59%",
    title: "Electronic Lab",
  },
  {
    tag: 6,
    top: "42%",
    left: "61.5%",
    title: "Milk Analyzer",
  },
  {
    tag: 5,
    top: "46%",
    left: "64.5%",
    title: "SHRED-AM",
  },
  {
    tag: 4,
    top: "28%",
    left: "68%",
    title: "Mechanical Lab",
  },
  {
    tag: 3,
    top: "58%",
    left: "73%",
    title: "MedTech Lineup",
  },
  {
    tag: 2,
    top: "42%",
    left: "81%",
    title: "Design Lab 1",
  },
  {
    tag: 1,
    top: "68%",
    left: "79%",
    title: "Auditorium",
  },
];

const container = document.querySelector('[data-container="floor-plan"]');
const locationSrc = "images/location-icon.png";
locationRelativePositions.forEach((position, idx) => {
  const img = document.createElement("img");
  img.alt = position.title;
  img.title = position.title;
  img.dataset.tag = position.tag;
  img.src = locationSrc;
  img.classList.add("img-fluid", "position-absolute");
  img.style.cursor = "pointer";
  img.style.top = position.top;
  img.style.left = position.left;
  img.style.width = "1.5rem";
  img.style.height = "1.5rem";

  container.appendChild(img);
});
