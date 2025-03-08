import { locationToSphere, ROLE, sphereToLocation } from "./constants.js";

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
 * @property {Boolean} hideLocationIcon - Whether the location icon should be hidden.
 * @property {Boolean} showInFloating - Whether the location should be shown in the floating container.
 * @property {Boolean} showInfoImmediately - Whether the location information should be shown immediately.
 * @property {string} popupType - "accordion" | "modal". Default: "accordion"
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
          "An industrial-grade adaptive motor control box compatible with most commercial robotic arms, seamlessly interfacing with versatile adaptive end-effectors.",
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
          "We support Additive Manufacturing engineers to optimize their processes with cutting-edge 3D printers and advanced simulation technology. Our experienced team streamlines the path to successful build configurations and customizes solutions to seamlessly integrate into your production workflow.",
      },
    ],
    showInFloating: true,
    showInfoImmediately: true,
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
          "We empower partners to explore diverse material knowledge, fostering creativity and interdisciplinary study to push the boundaries of material exploration.",
      },
    ],
    showInFloating: true,
    showInfoImmediately: true,
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
          "A premium private meeting space perfect for meetings, discussions, and networking. (Table: 12 pax; Backbenchers: 15 pax)",
      },
    ],
    showInFloating: true,
    showInfoImmediately: true,
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
          "A built-in EV charging module integrated into lamp posts, providing seamless and accessible electric vehicle charging.",
        video: "https://www.youtube.com/embed/KaxFRmfwSF8",
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
          "Casual meeting space in the heart of IF, seats 12 comfortably.",
      },
    ],
    showInfoImmediately: true,
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
          "Edible forks and spoons designed to minimize plastic waste, offering a sustainable alternative for eco-friendly dining.",
        video: "https://youtube.com/embed/HWfLoyJQK5Y",
      },
      {
        id: "VERTICALAUTOMATION",
        title: "Vertical Automation System",
        subtitle: "Ideation, Design, Engineering, Application",
        description:
          "An automated machine bakes Crunch Cutlery on-demand, reducing plastic waste and carbon emissions from transport.",
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
          "Singapore's first counter-top smoothie maker blends fruits directly in a cup and features a self-cleaning function.",
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
    showInfoImmediately: true,
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
          "Wearable sensors remotely monitor and track physiotherapy patient progress effectively.",
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
    showInfoImmediately: true,
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
          "I4DEAs, an A*STAR spin-off, offers a milk analyzer using smart optical technology to authenticate baby formula with precision.",
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
          "An integrated machine that combines grinding, extrusion, and winding functions to transform Type 7 plastic waste into 3D printing filaments.",
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
          "The Mechanical Lab is fully equipped for electromechanical, robotics, and automation projects, supporting mechanical design, electrical routing, PCB collaboration, prototyping, and showcasing devices like UVC LED systems on display.",
      },
    ],
    showInFloating: true,
    showInfoImmediately: true,
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
          "A proof-of-concept design that reconfigures a general hospital bed for both adult and child use, optimizing space and expanding the availability of hospital bed resources.",
        video: "https://www.youtube.com/embed/rVH8JFZp1Pk?si=8Nxrr0xnELGbnij5",
      },
      {
        id: "PARI",
        title: "PARI Nebulizer",
        subtitle: "Ideation and Design",
        description:
          "A next-generation portable nebulizer system featuring an enhanced design and improved UI/UX for better user experience and functionality.",
      },
      {
        id: "AASD",
        title: "BTI Automated Aseptic Sampling Device",
        subtitle: "Design and Engineering",
        description:
          "A device designed for the aseptic and automatic extraction of small liquid sample volumes (under 1ml) for monitoring in cell therapy manufacturing.",
      },
      {
        id: "CONNECTOR",
        title: "BTI Multi-Use Aseptic Connector",
        subtitle: "Engineering",
        description:
          "A multi-use aseptic connector technology designed to replace single-use sterile connectors in bioprocessing and cell manufacturing, offering enhanced sustainability and cost-efficiency.",
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
    showInfoImmediately: true,
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
          "An Open-concept meeting and event space, designed to flow seamlessly into IF's showroom, accommodating up to 30 guests.",
      },
    ],
    showInFloating: true,
    showInfoImmediately: true,
  },
  {
    tag: 19,
    top: "72%",
    left: "58%",
    title: "Entrance",
    showInFloating: true,
    hideInfoIcon: true,
    contents: [
      {
        id: "IF",
        title: "Innovation Factory",
        description: "Welcome to Innovation Factory!",
        video: "https://www.youtube.com/embed/OvBqZ_b3yXE?si=k3hW4JbBjpY3qOkv",
      },
    ],
  },
  {
    tag: 20,
    title: "Innovation Factory Booklet",
    hideLocationIcon: true,
    hideInfoIcon: true,
    contents: [
      {
        id: "IFBOOKLET",
        title: "Innovation Factory Booklet",
        pdf: "/assets/files/IFBooklet.pdf",
      },
    ],
    popupType: "modal",
  },

  {
    tag: 21,
    title: "EV Section (2)",
    top: "38%",
    left: "38%",
    contents: [
      {
        id: "BATTERYSWAP",
        title: "Battery Swapping Station",
        subtitle: "Ideation, Design, Engineering",
        description:
          "A solar-powered battery charging and swapping station provides sustainable energy solutions for efficient EV charging and replacement.",
        video: "https://youtube.com/embed/13nHtDnlAag",
      },
    ],
    hideLocationIcon: true,
  },
  {
    tag: 22,
    title: "Co-Working Desks",
    top: "38%",
    left: "38%",
    contents: [
      {
        id: "COWORKINGDESK",
        title: "Co-Working Desks",
        description:
          "As part of your IF Membership benefit, enjoy complimentary access to our co-working desks, designed for productivity and collaboration.",
      },
    ],
    hideLocationIcon: true,
    showInfoImmediately: true,
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
  if (hotspot.hideLocationIcon) {
    return;
  }

  const img = document.createElement("img");
  const isActive = hotspot.tag == locationTag;
  img.alt = hotspot.title;
  img.title = hotspot.title;
  img.dataset.tag = hotspot.tag;
  img.src = isActive
    ? "/assets/images/location-icon-active.png"
    : "/assets/images/location-icon.png";

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
    url.searchParams.delete("contentId");
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
  if (location) {
    if (contentId) {
      content = location.contents.find((content) => content.id === contentId);
    } else if (location.contents) {
      content = location.contents[0];
    }
  }

  clearAccordion();
  if (content) {
    if (location.popupType === "modal") {
      const modal = renderModal(content);
      if (event && event.state && event.state.source === "show-icon-content") {
        modal.show();
      }
    } else {
      if (location.showInfoImmediately || role === ROLE.ADMIN) {
        renderAccordion(content, location.showInfoImmediately || contentId);
      }
    }
  }
}

function renderAccordion(content, open) {
  const accordionHtml = `
    <div class="accordion" id="accordion">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button ${
            !open ? "collapsed" : ""
          }" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="${open}" aria-controls="collapseOne">
            <div class="d-flex flex-column gap-1 align-items-start">
              <span class="fs-4">${content.title}</span>
              ${
                content.subtitle
                  ? `<span class="text-secondary">${content.subtitle}</span>`
                  : ""
              }
            </div>
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse ${
          open ? "show" : ""
        }" data-bs-parent="#accordion">
          <div class="accordion-body">
            ${content.description ? `<p>${content.description}</p>` : ""}
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

  const container = document.querySelector('[data-container="accordion"]');
  container.innerHTML = accordionHtml;

  const accordionElement = document.querySelector("#accordion");
  accordionElement.addEventListener("hidden.bs.collapse", () => {
    const iframe = document.querySelector("[data-container='youtube-embed']");
    if (iframe) {
      // Reset the iframe src to stop the video from playing
      const temp = iframe.src;
      iframe.src = temp;
    }
  });
}

function clearAccordion() {
  const container = document.querySelector('[data-container="accordion"]');
  container.innerHTML = "";
}

function renderModal(content) {
  const modalHTML = `
    <div class="modal fade" id="hotspot-detail-modal" tabindex="-1" aria-labelledby="hotspot-detail-modal-label" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <div class="d-flex flex-column" style="gap:1rem;">
              <h5 class="modal-title" id="hotspot-detail-modal-label">${
                content.title
              }</h5>
              ${
                content.subtitle
                  ? `<h6 class="card-subtitle mb-2 text-body-secondary">${content.subtitle}</h6>`
                  : ""
              }
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${content.description ? `<p>${content.description}</p>` : ""}
            ${
              content.video
                ? `<div class="ratio ratio-16x9">
                     <iframe data-container="youtube-embed" src="${content.video}" title="YouTube video" allowfullscreen></iframe>
                   </div>`
                : ""
            }
            ${
              content.pdf
                ? isMobile()
                  ? `<div><a href="${content.pdf}" download>Download PDF</a></div>`
                  : `<div class="w-100" style="height:80vh;">
                    <object class="w-100 h-100" data="${content.pdf}" type="application/pdf">
                      <a href="${content.pdf}" download>Download PDF</a>
                    </object>
                  </div>`
                : ""
            }
          </div>
        </div>
      </div>
    </div>
  `;

  const modalContainer = document.querySelector("[data-container='modal']");
  modalContainer.innerHTML = modalHTML;

  const modalElement = document.getElementById("hotspot-detail-modal");
  const modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener("hidden.bs.modal", () => {
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
      img.src = "/assets/images/location-icon-active.png";
    } else {
      img.classList.remove("location-icon-active");
      img.src = "/assets/images/location-icon.png";
    }
  });
});
