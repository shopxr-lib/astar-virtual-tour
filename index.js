import { locationToSphere, sphereToLocation } from "./constants.js";

/**
 * An array of objects representing the positions and details of various locations.
 * Each object contains information about a specific location, including its tag, title,
 * position (top and left), and contents.
 *
 * @constant {Array<Object>}
 * @property {number} tag - The unique identifier for the location.
 * @property {string} title - The title of the location.
 * @property {string} top - The top position of the location as a percentage.
 * @property {string} left - The left position of the location as a percentage.
 * @property {Boolean} showInFloating - Whether the location should be shown in the floating container.
 * @property {Array<Object>} contents - An array of content objects related to the location.
 * @property {string} contents.title - The title of the content.
 * @property {string} contents.subtitle - The subtitle of the content.
 * @property {string} contents.description - The description of the content.
 * @property {string} contents.video - Youtube link
 */
const hostspotLocations = [
  {
    tag: 14,
    title: "RoPlus",
    top: "20%",
    left: "13.5%",
    contents: [
      {
        id: "ROPLUS",
        title: "RoPlus Intelligent Hybrid Robotic Gripping Solution",
        subtitle: "Engineering and Application",
        description:
          "Industrial-grade adaptive motor control box that can be communicated with most of the commercial robotic arms and interfaced to the versatile adaptive end-effector",
      },
    ],
  },
  {
    tag: 15,
    title: "Build Lab",
    top: "28%",
    left: "22%",
    contents: [
      {
        title: "Build Lab",
        subtitle: "",
        description:
          "We support Additive Manufacturing engineers in improving their manufacturing processes with top-tier 3D printers and simulation technology. Our experienced team minimise the runway to find build configurations that succeed and customise technology to integrate seamlessly into your process chain.",
      },
    ],
    showInFloating: true,
  },
  {
    tag: 13,
    title: "Material Lab",
    top: "1%",
    left: "28%",
    contents: [
      {
        title: "Material Lab",
        subtitle: "",
        description:
          "We enable partners to explore a wealth of knowledge in materials. We hold space for creativity and interdisciplinary study, pushing the envelope in material exploration.",
      },
    ],
    showInFloating: true,
  },
  {
    tag: 12,
    title: "IFinity",
    top: "11%",
    left: "33%",
    contents: [
      {
        title: "IFinity",
        subtitle: "",
        description:
          "A premium private meeting space ideal for meetings, project discussions, and networking.  [Table 12 pax; Backbenchers 15 pax] ",
      },
    ],
    showInFloating: true,
  },
  {
    tag: 16,
    title: "EV Section",
    top: "38%",
    left: "38%",
    contents: [
      {
        id: "LAMPPOST",
        title: "Lamp Post EV Charger",
        subtitle: "Ideation, Design, Engineering",
        description:
          "A built-in EV charging module for Singapore's lamp posts.",
        video: "https://www.youtube.com/embed/KaxFRmfwSF8",
      },
      {
        id: "BATTERYSWAP",
        title: "Battery Swapping Station",
        subtitle: "Ideation, Design, Engineering",
        description:
          "Battery Charging and Swapping Station (BCSS) that incorporate the use of solar power.",
        video: "https://youtube.com/embed/13nHtDnlAag",
      },
    ],
  },
  {
    tag: 11,
    title: "Impression Sunrise",
    top: "25%",
    left: "39.5%",
    contents: [
      {
        title: "Impression Sunrise",
        subtitle: "",
        description:
          "A meeting space for casual discussions in the heart of IF. [10 pax]",
      },
    ],
  },
  {
    tag: 17,
    title: "Edible Innovations",
    top: "48%",
    left: "41%",
    contents: [
      {
        id: "CRUNCH",
        title: "Crunch Cutlery",
        subtitle: "Ideation, Design, Engineering, Application",
        description:
          "Edible fork and spoon that helps to reduce plastic waste.",
        video: "https://youtube.com/embed/HWfLoyJQK5Y",
      },
      {
        id: "VERTICALAUTOMATION",
        title: "Vertical Automation System",
        subtitle: "Ideation, Design, Engineering, Application",
        description:
          "Automated machine that enables Crunch Cutlery to be freshly baked on-demand by the clients, further reducing plastic packaging waste",
      },
    ],
  },
  {
    tag: 18,
    top: "44%",
    left: "49%",
    title: "Smooder",
    contents: [
      {
        id: "SMOODER",
        title: "Smooder",
        subtitle: "Ideation, Design, Engineering, Application",
        description:
          "Singapore's first counter-top smoothie maker that blends fruits directly in a cup and self-cleans.",
        video: "https://youtube.com/embed/2cH4qVf_V9g",
      },
    ],
  },
  {
    tag: 10,
    top: "35%",
    left: "50%",
    title: "Airleo Eco Air System",
    contents: [
      {
        id: "AIRLEO",
        title: "Airleo Eco Air System",
        subtitle: "Ideation, Design, Engineering, Application",
        description:
          "An air-cooling system that economically generates cold air, without producing hot exhaust air at the same time.",
        video: "https://youtube.com/embed/cXOqrT-_Jlk",
      },
    ],
  },
  {
    tag: 9,
    top: "5%",
    left: "50.5%",
    title: "Design Lab 2",
    contents: [
      {
        title: "Design Lab 2",
        subtitle: "",
        description:
          "We specialize in customized solutions for product design and embedded systems, leveraging expertise in industrial design, electronics, mechanical development, simulation, firmware, and communication protocols. Our services encompass design, consulting, and engineering support, with flexible outsourcing and robust project management to meet partners' needs effectively.",
      },
    ],
    showInFloating: true,
  },
  {
    tag: 7,
    top: "39%",
    left: "59%",
    title: "Rebee Rehabilitation Wearable",
    contents: [
      {
        id: "REBEE",
        title: "Rebee Rehabilitation Wearable",
        subtitle: "Ideation, Design, Engineering, Application",
        description:
          "Wearable sensors to remotely detect and track patients doing physiotherapy.",
        video: "https://www.youtube.com/embed/xMCh1L3MqCA?si=og5qK8XlpKpKiog1",
      },
    ],
  },
  {
    tag: 8,
    top: "18%",
    left: "59%",
    title: "Electronic Lab",
    contents: [
      {
        title: "Electronic Lab",
        subtitle: "",
        description:
          "Here, we empower engineers and designers to explore, prototype, and refine electronic solutions. Functionality and innovation converge, offering essential tools and technology needed for electronic projects.",
      },
    ],
    showInFloating: true,
  },
  {
    tag: 6,
    top: "42%",
    left: "61.5%",
    title: "I4DEAs Milk Analyzer",
    contents: [
      {
        id: "ANALYSER",
        title: "I4DEAs Milk Analyzer",
        subtitle: "Ideation, Design, Engineering, Application",
        description:
          "I4DEAs is an A*STAR spin off selling the milk analyzer which can identify the authenticity of baby formula through a smart optical technology developed by A*STAR.",
        video: "https://www.youtube.com/embed/1VJdwHLbuGo?si=lYLTQyZM_sFqjolp",
      },
    ],
  },
  {
    tag: 5,
    top: "46%",
    left: "64.5%",
    title: "SHRED-AM Plastic Recycler",
    contents: [
      {
        id: "SHRED",
        title: "SHRED-AM Plastic Recycler",
        subtitle: "Ideation, Design, Engineering, Application",
        description:
          "An all-in-one grinder, extruder and winder machine designed to turn Type 7 plastic waste and into 3D printing filaments.",
      },
    ],
  },
  {
    tag: 4,
    top: "28%",
    left: "68%",
    title: "Mechanical Lab",
    contents: [
      {
        title: "Mechanical Lab",
        description:
          "We develop robotics and automation solutions, including 2D and 3D lidar navigation and vision-based lost recovery. We also explore robotic systems in manipulation, mobility, perception, intelligence, and mechatronics.",
      },
    ],
    showInFloating: true,
  },
  {
    tag: 3,
    top: "58%",
    left: "73%",
    title: "MedTech Lineup",
    contents: [
      {
        id: "KKH",
        title: "KKH In-Bed Child Cot Concept",
        subtitle: "Ideation and Design",
        description:
          "PoC design reconfigure general hospital bed for adult or child use, saving space, and expanding hospital bed resources.",
        video: "https://www.youtube.com/embed/rVH8JFZp1Pk?si=8Nxrr0xnELGbnij5",
      },
      {
        id: "PARI",
        title: "PARI Nebulizer",
        subtitle: "Ideation and Design",
        description:
          "New generation portable nebulizer system with enhanced design and UIUX.",
      },
      {
        id: "AASD",
        title: "BTI Automated Aseptic Sampling Device",
        subtitle: "Design and Engineering",
        description:
          "Device for aseptically and automatically extracting small volumes (below 1ml) of liquid samples for cell therapy manufacturing monitoring.",
      },
      {
        id: "CONNECTOR",
        title: "BTI Multi-Use Aseptic Connector",
        subtitle: "Engineering",
        description:
          "A multiple-use aseptic connector technology to replace single-use sterile connectors in bioprocessing and cell manufacturing.",
      },
    ],
  },
  {
    tag: 2,
    top: "42%",
    left: "81%",
    title: "Design Lab 1",
    contents: [
      {
        title: "Design Lab 1",
        subtitle: "",
        description:
          "We specialize in customized solutions for product design and embedded systems, leveraging expertise in industrial design, electronics, mechanical development, simulation, firmware, and communication protocols. Our services encompass design, consulting, and engineering support, with flexible outsourcing and robust project management to meet partners' needs effectively.",
      },
    ],
    showInFloating: true,
  },
  {
    tag: 1,
    top: "68%",
    left: "79%",
    title: "Auditorium",
    contents: [
      {
        title: "IF Auditorium",
        description:
          "An open concept meeting and event space that flows seamlessly into IF's showroom. [30 pax]",
      },
    ],
    showInFloating: true,
  },
  {
    tag: 19,
    top: "72%",
    left: "58%",
    title: "Entrance",
    showInFloating: true,
    contents: [
      {
        id: "IF",
        title: "Innovation Factory",
        description: "Welcome to Innovation Factory!",
        video: "https://www.youtube.com/embed/OvBqZ_b3yXE?si=k3hW4JbBjpY3qOkv",
      },
    ],
  },
];

const floorPlanContainer = document.querySelector(
  '[data-container="floor-plan"]'
);
const floorPlanFloatingContainer = document.querySelector(
  '[data-container="floor-plan-floating"]'
);

const url = new URL(window.location);
const sphereRaw = url.searchParams.get("sphere") || "0";
const locationTag = sphereToLocation[Number(sphereRaw)];

hostspotLocations.forEach((hotspot) => {
  const img = document.createElement("img");
  const isActive = hotspot.tag == locationTag;
  img.alt = hotspot.title;
  img.title = hotspot.title;
  img.dataset.tag = hotspot.tag;
  img.src = isActive
    ? "images/location-icon-active.png"
    : "images/location-icon.png";

  if (isActive) {
    img.classList.add("location-icon-active");
  }
  img.classList.add("img-fluid", "position-absolute");

  // close the modal when clicked on the location icon
  img.dataset["bsDismiss"] = "modal";

  img.dataset["bsToggle"] = "tooltip";
  img.dataset["bsPlacement"] = "top";
  img.dataset["bsTitle"] = hotspot.title;
  img.dataset["id"] = "location-icon";
  img.style.cursor = "pointer";
  img.style.top = hotspot.top;
  img.style.left = hotspot.left;
  img.style.width = "2%";

  const onclick = () => {
    const url = new URL(window.location);
    const sphereIndexes = locationToSphere[hotspot.tag];
    if (!sphereIndexes || sphereIndexes.length == 0) {
      return;
    }
    const sphereIndex = sphereIndexes[0];
    url.searchParams.set("sphere", sphereIndex);
    history.pushState({}, "", url);
    dispatchEvent(
      new PopStateEvent("popstate", {
        state: {
          source: "floor-plan",
        },
      })
    );
  };
  img.onclick = onclick;

  floorPlanContainer.appendChild(img);

  if (hotspot.showInFloating) {
    const cloneImg = img.cloneNode();
    cloneImg.style.top = `${0.9 * parseFloat(hotspot.top)}%`;
    cloneImg.style.left = `${0.97 * parseFloat(hotspot.left)}%`;
    cloneImg.style.width = "5%";
    cloneImg.onclick = onclick;

    // No modal needs to be displayed when clicked on the floating container
    // this prevents the annoying undefined error when because it's trying to remove a modal that doesn't exist
    delete cloneImg.dataset["bsDismiss"];

    floorPlanFloatingContainer.appendChild(cloneImg);
  }
});

function isMobile() {
  return window.innerWidth <= 768;
}

if (!isMobile()) {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

function populateHotspotCard(event) {
  const url = new URL(window.location);
  const sphereRaw = url.searchParams.get("sphere") || "0";
  const locationTag = sphereToLocation[Number(sphereRaw)];
  const location = hostspotLocations.find((l) => l.tag == locationTag);
  const hotspotCard = document.querySelector('[data-container="hotspot-card"]');
  if (!location) {
    hotspotCard.innerHTML = "";
    return;
  }

  // if the event is triggered by hotspot change location, then do not respect the contentId in the url yet.
  // The contentId is only respected when the user clicks on the (i) icon.
  // Although contentId is deleted when location is changed (using hidden.bs.modal event listener),
  // the old contentId is still in the url.
  let contentId;
  if (
    event &&
    event.state &&
    event.state.source !== "hotspot-change-location"
  ) {
    contentId = url.searchParams.get("contentId");
  }

  let content;

  if (contentId) {
    content = location.contents.find((content) => content.id === contentId);
    if (content) {
      const modal = renderModal(content);
      modal.show();
    }
  } else if (location.contents) {
    content = location.contents[0];
    renderModal(content);
  }

  const shouldShowInfoIcon = location.contents && location.contents.length == 1;

  const infoIconImg = document.createElement("img");
  infoIconImg.src = "images/information-icon.png";
  infoIconImg.classList.add("img-fluid");
  infoIconImg.style.width = "20px";
  infoIconImg.style.height = "20px";
  infoIconImg.style.cursor = "pointer";
  infoIconImg.dataset["bsToggle"] = "modal";
  infoIconImg.dataset["bsTarget"] = "#hotspot-detail-modal";

  const card = `
  <div class="card" style="max-width: 18rem;">
    <div class="card-body">
      <div class="d-flex align-items-center" style="gap:1rem;">
        <p class="m-0">${location.title}</p>
        ${shouldShowInfoIcon ? infoIconImg.outerHTML : ""}
      </div>
    </div>
  </div>
  `;
  hotspotCard.innerHTML = card;
}

function renderModal(content) {
  const existingModal = document.getElementById("hotspot-detail-modal");
  if (existingModal) {
    existingModal.remove();
  }

  const modalHTML = `
    <div class="modal fade" id="hotspot-detail-modal" tabindex="-1" aria-labelledby="hotspot-detail-modal-label" aria-hidden="true" data-bs-backdrop="false" style="top: 35%; width:auto; height:auto;">
      <div class="modal-dialog" style="overflow-y:scroll;max-height:60vh;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="hotspot-detail-modal-label">${
              content.title
            }</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${
              content.subtitle
                ? `<h6 class="card-subtitle mb-2 text-body-secondary">${content.subtitle}</h6>`
                : ""
            }
            <p class="card-text">${content.description}</p>
            ${
              content.video
                ? `<div class="ratio ratio-16x9">
                     <iframe data-container="youtube-embed" src="${content.video}" title="YouTube video" allowfullscreen></iframe>
                   </div>`
                : ""
            }
          </div>
        </div>
      </div>
    </div>
  `;

  const hotspotCardContainer = document.querySelector(
    "[data-container='hotspot-card']"
  );
  hotspotCardContainer.insertAdjacentHTML("afterend", modalHTML);

  const modalElement = document.getElementById("hotspot-detail-modal");
  const modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener("hidden.bs.modal", () => {
    const url = new URL(window.location);
    url.searchParams.delete("contentId");
    history.pushState({}, "", url);

    const iframe = document.querySelector("[data-container='youtube-embed']");
    if (iframe) {
      // Reset the iframe src to stop the video from playing
      const temp = iframe.src;
      iframe.src = temp;
    }
  });
  return modal;
}

populateHotspotCard();
window.addEventListener("popstate", populateHotspotCard);
window.addEventListener("popstate", function () {
  const url = new URL(window.location);
  const sphereRaw = url.searchParams.get("sphere") || "0";
  const locationTag = sphereToLocation[Number(sphereRaw)];

  this.document.querySelectorAll('[data-id="location-icon"]').forEach((img) => {
    if (img.dataset.tag == locationTag) {
      img.classList.add("location-icon-active");
      img.src = "images/location-icon-active.png";
    } else {
      img.classList.remove("location-icon-active");
      img.src = "images/location-icon.png";
    }
  });
});
