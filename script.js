const benchRoutes = [
  [[14, 72], [12, 68], [13, 62], [15, 55], [16, 48], [18, 43], [18, 34], [21, 28], [22, 19], [24, 13]],
  [[23, 14], [27, 13], [31, 15], [34, 13], [38, 15], [41, 13], [43, 17], [41, 21], [37, 23], [35, 29], [34, 35], [31, 40], [29, 43], [30, 47], [33, 51], [34, 56], [34, 61], [36, 65]],
  [[36, 65], [39, 70], [42, 72], [45, 68], [46, 63], [45, 59], [42, 55], [39, 51], [38, 47], [40, 44], [43, 46], [46, 50], [49, 55], [51, 54], [52, 49], [51, 44], [53, 42]],
  [[53, 42], [56, 39], [61, 40], [63, 37], [68, 34], [74, 34], [78, 36], [82, 36], [87, 39], [90, 42], [86, 45], [81, 47], [76, 49], [72, 47], [68, 45], [65, 43], [62, 46], [66, 49], [65, 53], [61, 51], [58, 48]],
  [[45, 20], [49, 18], [54, 18], [59, 21], [62, 26], [61, 31], [57, 35]],
  [[53, 57], [57, 60], [61, 59], [66, 61], [68, 66], [65, 69], [60, 69], [56, 67]],
  [[18, 58], [22, 60], [26, 63], [28, 68], [28, 74], [29, 80], [32, 84], [37, 86], [42, 83], [45, 78], [46, 72]]
];

const routeSegments = [
  [[0, 8.5], [100, 8.5]], [[0, 15], [100, 15]], [[0, 27], [100, 27]], [[0, 50], [100, 50]],
  [[0, 72], [100, 72]], [[0, 91.5], [100, 91.5]],
  [[4.2, 0], [4.2, 100]], [[50, 0], [50, 100]], [[95.8, 0], [95.8, 100]],
  [[45, 13], [45, 92]],
  [[12, 15], [32, 17]], [[32, 17], [45, 27]], [[55, 20], [75, 27]],
  [[12, 72], [30, 68]], [[30, 68], [45, 72]], [[55, 72], [78, 68]],
  [[22, 40], [25, 58]], [[28, 65], [36, 81]], [[78, 25], [83, 33]],
  [[41, 19], [47, 25]], [[78, 53], [84, 64]]
];

function distanceToSegment(pointX, pointY, start, end) {
  const deltaX = end[0] - start[0];
  const deltaY = end[1] - start[1];
  const lengthSquared = deltaX ** 2 + deltaY ** 2;
  const position = lengthSquared === 0
    ? 0
    : Math.max(0, Math.min(1, ((pointX - start[0]) * deltaX + (pointY - start[1]) * deltaY) / lengthSquared));
  const nearestX = start[0] + position * deltaX;
  const nearestY = start[1] + position * deltaY;
  return Math.hypot(pointX - nearestX, pointY - nearestY);
}

function isOnPath(pointX, pointY) {
  return routeSegments.some(([start, end]) => distanceToSegment(pointX, pointY, start, end) < 5.2);
}

function distanceToPath(pointX, pointY) {
  return Math.min(...routeSegments.map(([start, end]) => distanceToSegment(pointX, pointY, start, end)));
}

const parkBoundary = [
  [18, 12], [70, 12], [88, 20], [94, 33], [90, 48], [93, 62],
  [80, 77], [70, 92], [55, 98], [36, 99], [15, 94], [10, 82],
  [13, 68], [8, 57], [13, 43], [10, 28], [15, 17]
];

const waterBodies = [
  { centerX: 44.5, centerY: 23, radiusX: 2.5, radiusY: 3.5 },
  { centerX: 79, centerY: 29, radiusX: 2.8, radiusY: 3.5 },
  { centerX: 28, centerY: 51, radiusX: 3.5, radiusY: 10 },
  { centerX: 39, centerY: 75, radiusX: 5.5, radiusY: 10 },
  { centerX: 79, centerY: 59, radiusX: 3.5, radiusY: 5.5 }
];

const trees = [
  [77, 22, 4.8], [47, 17, 3.6], [17, 39, 3.2], [23, 78, 5], [69, 34, 4],
  [73, 61, 4.7], [42, 84, 3.2], [31, 29, 3], [39, 43, 3.7], [58, 48, 3],
  [20, 59, 3.2], [31, 73, 3.5], [65, 69, 3.1], [48, 71, 2.8], [80, 69, 3.4]
];

function isInsidePark(pointX, pointY) {
  let inside = false;
  for (let index = 0, previous = parkBoundary.length - 1; index < parkBoundary.length; previous = index++) {
    const [currentX, currentY] = parkBoundary[index];
    const [previousX, previousY] = parkBoundary[previous];
    const crosses = currentY > pointY !== previousY > pointY
      && pointX < ((previousX - currentX) * (pointY - currentY)) / (previousY - currentY) + currentX;
    if (crosses) inside = !inside;
  }
  return inside;
}

function isInWater(pointX, pointY) {
  const clearance = arguments[2] || 0;
  return waterBodies.some((body) => (
    ((pointX - body.centerX) / (body.radiusX + clearance)) ** 2
      + ((pointY - body.centerY) / (body.radiusY + clearance)) ** 2 < 1
  ));
}

function isUnderTree(pointX, pointY) {
  const clearance = arguments[2] || 0;
  return trees.some(([treeX, treeY, radius]) => Math.hypot(pointX - treeX, pointY - treeY) < radius + clearance);
}

function sampleRoute(route, spacing = 1.55, side = 1) {
  const samples = [];
  for (let pointIndex = 0; pointIndex < route.length - 1; pointIndex += 1) {
    const start = route[pointIndex];
    const end = route[pointIndex + 1];
    const segmentLength = Math.hypot(end[0] - start[0], end[1] - start[1]);
    const normalX = -(end[1] - start[1]) / segmentLength;
    const normalY = (end[0] - start[0]) / segmentLength;
    const steps = Math.max(1, Math.round(segmentLength / spacing));
    for (let step = 0; step < steps; step += 1) {
      const progress = step / steps;
      const routeX = start[0] + (end[0] - start[0]) * progress;
      const routeY = start[1] + (end[1] - start[1]) * progress;
      const offset = 3.6 * side;
      samples.push({
        x: routeX + normalX * offset,
        y: routeY + normalY * offset
      });
    }
  }
  return samples;
}

function distanceToBenchRoutes(pointX, pointY) {
  return Math.min(...benchRoutes.flatMap((route) => (
    route.slice(0, -1).map((start, pointIndex) => distanceToSegment(pointX, pointY, start, route[pointIndex + 1]))
  )));
}

const routePositions = benchRoutes
  .flatMap((route, routeIndex) => sampleRoute(route, 1.55, routeIndex % 2 === 0 ? 1 : -1))
  .filter((position) => (
    isInsidePark(position.x, position.y)
    && !isInWater(position.x, position.y, 1.4)
    && !isUnderTree(position.x, position.y, 1.4)
  ));

const minimumBenchDistance = 2.4;
const separatedRoutePositions = routePositions.reduce((acceptedPositions, position) => {
  const isTooClose = acceptedPositions.some((acceptedPosition) => (
    Math.hypot(position.x - acceptedPosition.x, position.y - acceptedPosition.y) < minimumBenchDistance
  ));
  if (!isTooClose) acceptedPositions.push(position);
  return acceptedPositions;
}, []);

const additionalPositions = [];
const additionalBenchTarget = 427;
const additionalBenchDistance = 1.6;
for (let yValue = 13; yValue <= 97 && additionalPositions.length < additionalBenchTarget; yValue += .9) {
  for (let xValue = 6; xValue <= 94 && additionalPositions.length < additionalBenchTarget; xValue += .9) {
    const candidate = { x: xValue, y: yValue };
    const isAvailable = isInsidePark(candidate.x, candidate.y)
      && !isInWater(candidate.x, candidate.y, 1.4)
      && !isUnderTree(candidate.x, candidate.y, 1.4)
      && distanceToBenchRoutes(candidate.x, candidate.y) > 4.5
      && ![...separatedRoutePositions, ...additionalPositions].some((position) => (
        Math.hypot(candidate.x - position.x, candidate.y - position.y) < additionalBenchDistance
      ));
    if (isAvailable) additionalPositions.push(candidate);
  }
}

const allBenchPositions = [...separatedRoutePositions, ...additionalPositions];
const benches = allBenchPositions.map((position, index) => {
  const adopted = index % 3 === 0;
  const location = position.y < 35 ? "Northwest forest" : position.y > 72 ? "Parade ground" : "Indian field";
  return {
    id: `B-${String(index + 1).padStart(3, "0")}`,
    x: position.x,
    y: position.y,
    status: adopted ? "adopted" : "available",
    location,
    detail: adopted ? "This bench has been adopted by a park supporter." : "A place to pause along the park path."
  };
});

const adoptionStorageKey = "bench-adoptions";
let savedAdoptions = {};
try {
  savedAdoptions = JSON.parse(localStorage.getItem(adoptionStorageKey) || "{}");
} catch (error) {
  savedAdoptions = {};
}
benches.forEach((bench) => {
  if (savedAdoptions[bench.id]) {
    bench.status = "adopted";
    bench.adoptionDetails = savedAdoptions[bench.id];
  }
});

const statValues = document.querySelectorAll(".map-stats strong");
statValues[0].textContent = benches.length;

const markerContainer = document.querySelector("#bench-markers");
const detailPanel = document.querySelector("#bench-detail");
const benchDialog = document.querySelector("#bench-dialog");
const dialogStatus = document.querySelector("#dialog-status");
const benchFacts = document.querySelector("#bench-facts");
const dialogTitle = document.querySelector("#dialog-title");
const dialogClose = document.querySelector("#dialog-close");
const adoptButton = document.querySelector("#adopt-button");
const adoptionForm = document.querySelector("#adoption-form");
let selectedBench = null;
let selectedMarker = null;
const adopterNames = ["The Rivera family", "Columbia Alumni Circle", "A neighborhood friend", "The Morgan family"];
const dedicationRecipients = ["someone they love", "a beloved mentor", "their family", "a friend who made a difference"];
const adoptionTerms = ["12 months", "24 months", "36 months", "60 months"];
const adoptionDates = ["March 2026", "June 2026", "September 2026", "January 2026"];
const benchNames = ["The Quiet Corner", "Maya's Landing", "The Reunion Seat", "Grandpa's Perch"];
const benchPurposes = [
  "For dramatic park snacks and excellent people-watching.",
  "A tiny outdoor office for big ideas and slow afternoons.",
  "Reserved for reunions, story swaps, and surprise hugs.",
  "A resting place for tired feet and very important daydreams."
];

function getBenchDetails(bench, benchIndex) {
  const isAdopted = bench.status === "adopted";
  const savedDetails = bench.adoptionDetails;
  return {
    status: isAdopted ? "Currently adopted" : "Available to adopt",
    adopter: savedDetails?.adopter || (isAdopted ? adopterNames[benchIndex % adopterNames.length] : "No adopter yet"),
    recipient: savedDetails?.recipient || (isAdopted ? dedicationRecipients[benchIndex % dedicationRecipients.length] : "Waiting for your love"),
    duration: savedDetails?.duration || (isAdopted ? adoptionTerms[benchIndex % adoptionTerms.length] : "Not yet adopted"),
    date: savedDetails?.date || (isAdopted ? adoptionDates[benchIndex % adoptionDates.length] : "Not applicable"),
    name: savedDetails?.name || (isAdopted ? benchNames[benchIndex % benchNames.length] : "Not yet named"),
    purpose: savedDetails?.purpose || (isAdopted ? benchPurposes[benchIndex % benchPurposes.length] : "Not yet adopted")
  };
}

function showBenchDetails(bench, benchIndex) {
  const isAdopted = bench.status === "adopted";
  const details = getBenchDetails(bench, benchIndex);
  selectedBench = bench;
  detailPanel.innerHTML = `
    <div class="detail-content">
      <div>
        <span class="status ${isAdopted ? "adopted" : ""}">${isAdopted ? "Currently adopted" : "Available to adopt"}</span>
        <h3>${bench.id} · ${bench.location}</h3>
        <p>${bench.detail}</p>
      </div>
      ${isAdopted ? "" : `<button class="detail-tag detail-action" type="button">CHOOSE THIS BENCH</button>`}
    </div>
  `;
  dialogTitle.textContent = `${bench.id} · ${bench.location}`;
  dialogStatus.textContent = details.status;
  dialogStatus.className = `dialog-status ${isAdopted ? "adopted" : "available"}`;
  benchFacts.hidden = false;
  adoptionForm.hidden = true;
  adoptButton.hidden = isAdopted;
  adoptButton.disabled = false;
  adoptButton.textContent = "ADOPT ME";
  benchFacts.innerHTML = `
    ${isAdopted ? `<div><dt>Bench name</dt><dd>${details.name}</dd></div><div><dt>Purpose</dt><dd>${details.purpose}</dd></div>` : ""}
    <div><dt>Adopted by</dt><dd>${details.adopter}</dd></div>
    <div><dt>Adopted for</dt><dd>${details.recipient}</dd></div>
    <div><dt>Adoption duration</dt><dd>${details.duration}</dd></div>
    <div><dt>Adopted</dt><dd>${details.date}</dd></div>
  `;
  const chooseButton = detailPanel.querySelector(".detail-action");
  if (chooseButton) chooseButton.addEventListener("click", () => openAdoptionForm(bench));
  benchDialog.showModal();
}

function openAdoptionForm(bench) {
  dialogTitle.textContent = `Adopt ${bench.id} · ${bench.location}`;
  dialogStatus.textContent = "Tell us how you will make this perch yours";
  dialogStatus.className = "dialog-status available";
  benchFacts.hidden = true;
  adoptButton.hidden = true;
  adoptionForm.hidden = false;
  adoptionForm.reset();
  benchDialog.showModal();
  adoptionForm.querySelector("input").focus();
}

dialogClose.addEventListener("click", () => benchDialog.close());
adoptButton.addEventListener("click", () => {
  adoptButton.disabled = true;
  adoptButton.textContent = "ADOPT ME";
  benchDialog.close();
  detailPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  detailPanel.focus({ preventScroll: true });
});
adoptionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(adoptionForm);
  const adoptionDetails = {
    adopter: formData.get("adopterName"),
    purpose: formData.get("description"),
    recipient: formData.get("recipient"),
    duration: formData.get("duration"),
    date: new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date()),
    name: formData.get("benchName")
  };
  selectedBench.adoptionDetails = adoptionDetails;
  savedAdoptions[selectedBench.id] = adoptionDetails;
  localStorage.setItem(adoptionStorageKey, JSON.stringify(savedAdoptions));
  selectedBench.status = "adopted";
  selectedMarker.classList.remove("available");
  selectedMarker.classList.add("adopted", "newly-adopted");
  selectedMarker.setAttribute("aria-label", `${selectedBench.id}, adopted, ${selectedBench.location}`);
  adoptionForm.hidden = true;
  benchFacts.hidden = true;
  dialogTitle.textContent = "Adoption complete!";
  dialogStatus.textContent = "CONGRATULATIONS ON YOUR ADOPTION!";
  dialogStatus.className = "dialog-status congratulations";
});
benchDialog.addEventListener("click", (event) => {
  if (event.target === benchDialog) benchDialog.close();
});

benches.forEach((bench, benchIndex) => {
  const marker = document.createElement("button");
  marker.className = `bench-marker ${bench.status}`;
  if (bench.adoptionDetails) marker.classList.add("newly-adopted");
  marker.type = "button";
  marker.style.left = `${bench.x}%`;
  marker.style.top = `${bench.y}%`;
  marker.textContent = "";
  marker.setAttribute("aria-label", `${bench.id}, ${bench.status}, ${bench.location}`);
  marker.addEventListener("click", () => {
    selectedMarker = marker;
    showBenchDetails(bench, benchIndex);
  });
  markerContainer.appendChild(marker);
});
