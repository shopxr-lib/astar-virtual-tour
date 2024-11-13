import * as THREE from 'https://cdn.skypack.dev/three@0.123.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.123.0/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.123.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.123.0/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.123.0/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.123.0/examples/jsm/postprocessing/UnrealBloomPass.js';

const panoramas = [
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-1.jpg?v=1731402007481',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-2.jpg?v=1731439302339',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-3.jpg?v=1731439302505',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-4.jpg?v=1731439303023',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-5.jpg?v=1731439303982',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-6.jpg?v=1731439307229',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-7.jpg?v=1731439307855',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-8.jpg?v=1731439310066',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-9.jpg?v=1731439311834',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-10.jpg?v=1731439313841',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-11.jpg?v=1731439316565',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-12.jpg?v=1731439317689',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-13.jpg?v=1731439319437',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-14.jpg?v=1731439321477',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-15.jpg?v=1731439323282',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-16.jpg?v=1731439325293',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-17.jpg?v=1731439326942',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-18.jpg?v=1731439329607',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-19.jpg?v=1731439331620',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-20.jpg?v=1731439343786',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-21.jpg?v=1731439344731',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-22.jpg?v=1731439362726',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-23.jpg?v=1731439364081',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-24.jpg?v=1731439365707',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-25.jpg?v=1731439367727',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-26.jpg?v=1731439368223',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-27.jpg?v=1731439370816',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-28.jpg?v=1731439373593',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-29.jpg?v=1731439375533',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-30.jpg?v=1731439377324',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-31.jpg?v=1731439394973',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-32.jpg?v=1731439395011',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-33.jpg?v=1731439397318',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-34.jpg?v=1731439397408',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-35.jpg?v=1731439399500',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-36.jpg?v=1731439402486',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-37.jpg?v=1731439403707',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-38.jpg?v=1731439406182',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-39.jpg?v=1731439407864',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-40.jpg?v=1731439409895',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-41.jpg?v=1731439411953',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-42.jpg?v=1731439414496',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-43.jpg?v=1731439416498',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-44.jpg?v=1731439418366',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-45.jpg?v=1731439419825',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-46.jpg?v=1731439422029',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-47.jpg?v=1731439431505',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-48.jpg?v=1731439432155',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-49.jpg?v=1731439433171',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-50.jpg?v=1731439435313',
  'https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-51.jpg?v=1731439437458',
]

const hotSpotInfo = [
  //hotspot index 0
  {
    spotIndex: 1, // when clicked, goes to this parorama image - index number
    visible: [0], // on which panorama index, will this hotspot will be shown
    pos: { x: -220, y: -100, z: -150 },
  },
  //hotspot index 1
  {
    spotIndex: 0,
    visible: [1],
    pos: { x: 230, y: -100, z: -150 },
  },
  {
    spotIndex: 2,
    visible: [1],
    pos: { x: -200, y: -100, z: -55 },
  },
  //hotspot index 2
  {
    spotIndex: 1,
    visible: [2],
    pos: { x: 150, y: -100, z: -25 },
  },
  {
    spotIndex: 3,
    visible: [2],
    pos: { x: -220, y: -100, z: 100 },
  },
  {
    spotIndex: 4,
    visible: [2],
    pos: { x: -260, y: -100, z: -200 },
  },
  //hotspot index 3
  {
    spotIndex: 2,
    visible: [3],
    pos: { x: 220, y: -100, z: -45 },
  },
  {
    spotIndex: 4,
    visible: [3],
    pos: { x: -10, y: -100, z: -300 },
  },
  {
    spotIndex: 5,
    visible: [3],
    pos: { x: -210, y: -80, z: -410 },
  },
  {
    spotIndex: 6,
    visible: [3],
    pos: { x: -260, y: -100, z: -200 },
  },
  {
    spotIndex: 7,
    visible: [3],
    pos: { x: -350, y: -100, z: -20 },
  },
  //hotspot index 4
  {
    spotIndex: 2,
    visible: [4],
    pos: { x: 270, y: -100, z: 120 },
  },
  {
    spotIndex: 3,
    visible: [4],
    pos: { x: 60, y: -100, z: 245 },
  },
  {
    spotIndex: 5,
    visible: [4],
    pos: { x: -265, y: -100, z: -140 },
  },
  {
    spotIndex: 6,
    visible: [4],
    pos: { x: -220, y: -100, z: 115 },
  },
  //hotspot index 5
  {
    spotIndex: 3,
    visible: [5],
    pos: { x: 250, y: -100, z: 330 },
  },
  {
    spotIndex: 4,
    visible: [5],
    pos: { x: 270, y: -100, z: 190 },
  },
  {
    spotIndex: 6,
    visible: [5],
    pos: { x: -5, y: -100, z: 270 },
  },
];


const TransitionShader = {
  uniforms: {
    tDiffuse1: { value: null }, // First texture (current panorama)
    tDiffuse2: { value: null }, // Second texture (target panorama)
    progress: { value: 0.0 },   // Progress value for blending
  },
  vertexShader: `
      varying vec2 vUv;
      void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
  `,
  fragmentShader: `
      uniform sampler2D tDiffuse1;
      uniform sampler2D tDiffuse2;
      uniform float progress;
      varying vec2 vUv;
      
      void main() {
          vec4 tex1 = texture2D(tDiffuse1, vUv);
          vec4 tex2 = texture2D(tDiffuse2, vUv);
          gl_FragColor = mix(tex1, tex2, progress); // Blend the textures based on progress
      }
  `,
};


let camera, scene, renderer;
let composer, renderTarget1, renderTarget2, renderPass1, renderPass2, transitionPass, bloomPass;
let currentPos2;
let spheres = [];
let hotspotMeshes = [];

let currentSphere;
let nextSphere;
let transitioningToSphere2 = true;

let currentSphereIndex = 0;
let transitionProgress = 0;
let transitionSpeed = 0.01;

let transitioning = false;

let clock = new THREE.Clock();
let elapsedTime = 0;
let hotspotMesh, hotspotMesh1, hotspotMesh2;

let isUserInteracting = false,
  onPointerDownMouseX = 0, onPointerDownMouseY = 0,
  lon = 220, onPointerDownLon = 0,
  lat = 0, onPointerDownLat = 0,
  phi = 0, theta = 0,
  pinchStartDistance = 0,
  pinchStartFov = 0;

init();
animate();


function init() {

  const container = document.getElementById('image-container');

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
  scene = new THREE.Scene();

  // Geometry for panorama spheres
  const geometry = new THREE.SphereGeometry(500, 60, 40);
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(-1, 1, 1);

  // Load all textures and create spheres
  const textureLoader = new THREE.TextureLoader();
  panoramas.forEach((image, index) => {
    const texture = textureLoader.load(image);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.userData.index = index;
    sphere.visible = index === 0;
    scene.add(sphere);
    spheres.push(sphere);
  });

  currentSphere = spheres[0];
  nextSphere = spheres[1];

  const hotspotTexture = new THREE.TextureLoader().load('https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/hotspot-icon.png?v=1731393671236'); // Load the arrow image
  const hotspotMaterial = new THREE.MeshBasicMaterial({ map: hotspotTexture, transparent: true });
  const hotspotGeometry = new THREE.PlaneGeometry(40, 20);
  hotspotMesh = new THREE.Mesh(hotspotGeometry, hotspotMaterial);

  hotSpotInfo.forEach((e, index) => {
    const mesh = hotspotMesh.clone();
    mesh.position.set(e.pos.x, e.pos.y, e.pos.z);
    mesh.lookAt(camera.position);
    mesh.userData.spotIndex = e.spotIndex; //updated from index to e.spotIndex
    mesh.userData.visibleSpheres = e.visible;
    mesh.visible = e.visible.includes(currentSphereIndex);
    scene.add(mesh);
    hotspotMeshes.push(mesh);
    //console.log(e.spotIndex, "spotIndex")
  })


  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  container.style.touchAction = 'none';
  container.addEventListener('pointerdown', onPointerDown);

  document.addEventListener('wheel', onDocumentMouseWheel);

  container.addEventListener('touchstart', onTouchStart);
  container.addEventListener('touchmove', onTouchMove);
  container.addEventListener('touchend', onTouchEnd);

  window.addEventListener('resize', onWindowResize);

  //Handles mesh clicks
  renderer.domElement.addEventListener('click', onDocumentClick);


  composer = new EffectComposer(renderer);
  renderTarget1 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
  renderTarget2 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);


  // Set up render passes for each panorama
  renderPass1 = new RenderPass(scene, camera);
  renderPass2 = new RenderPass(scene, camera);
  renderPass1.renderToScreen = false;
  renderPass2.renderToScreen = false;

  // Transition shader pass
  transitionPass = new ShaderPass(TransitionShader);

  transitionPass.uniforms.tDiffuse1.value = renderTarget1.texture;
  transitionPass.uniforms.tDiffuse2.value = renderTarget2.texture;
  transitionPass.uniforms.progress.value = 0.0;
  composer.addPass(transitionPass);

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.4, 0.85);
  //composer.addPass(bloomPass);

  transitionProgress = 0.0;
  transitionSpeed = 0.01;
}

function onTouchStart(event) {
  if (event.touches.length === 2) {
    isUserInteracting = true;
    let touch1 = event.touches[0];
    let touch2 = event.touches[1];
    pinchStartDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
    pinchStartFov = camera.fov;
  }
}

function onTouchMove(event) {
  if (event.touches.length === 2 && isUserInteracting) {
    let touch1 = event.touches[0];
    let touch2 = event.touches[1];
    let pinchCurrentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
    let pinchScale = pinchStartDistance / pinchCurrentDistance;
    camera.fov = THREE.MathUtils.clamp(pinchStartFov * pinchScale, 30, 75);
    camera.updateProjectionMatrix();
  }
}

function onTouchEnd(event) {
  if (event.touches.length < 2) {
    isUserInteracting = false;
  }
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function onPointerDown(event) {

  if (event.isPrimary === false) return;

  isUserInteracting = true;

  onPointerDownMouseX = event.clientX;
  onPointerDownMouseY = event.clientY;

  onPointerDownLon = lon;
  onPointerDownLat = lat;

  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);

}

function onPointerMove(event) {

  if (event.isPrimary === false) return;

  lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
  lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;

}

function onPointerUp() {

  if (event.isPrimary === false) return;

  isUserInteracting = false;

  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);

  clock.elapsedTime = 0;

}

function onDocumentMouseWheel(event) {

  const fov = camera.fov + event.deltaY * 0.05;

  camera.fov = THREE.MathUtils.clamp(fov, 10, 75);

  camera.updateProjectionMatrix();

}

function animate() {

  requestAnimationFrame(animate);
  update(clock.getElapsedTime());
}

function update(elapsedTime) {

  if (isUserInteracting === false && elapsedTime > 2) {

    lon += 0.03;

  }

  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.MathUtils.degToRad(90 - lat);
  theta = THREE.MathUtils.degToRad(lon);

  const x = 500 * Math.sin(phi) * Math.cos(theta);
  const y = 500 * Math.cos(phi);
  const z = 500 * Math.sin(phi) * Math.sin(theta);

  camera.lookAt(x, y, z);

  if (transitioning) {
    hotspotMeshes.forEach(mesh => mesh.visible = false);
    
    // Update the transition progress
    transitionProgress += transitionSpeed;

    // Limit the progress to 1.0 and stop the transition when complete
    if (transitionProgress >= 1.0) {
      transitionProgress = 1.0;
      transitioning = false;
      currentSphere.visible = false;
      nextSphere.visible = true;

      currentSphere = spheres[currentSphereIndex];
      
      hotspotMeshes.forEach(mesh => {
        mesh.visible = mesh.userData.visibleSpheres.includes(currentSphereIndex);
      });
    }

    // Set the progress of the transition in the shader
    transitionPass.uniforms.progress.value = transitionProgress;
    if (transitionProgress < 0.5) {
      camera.fov = THREE.MathUtils.lerp(75, 50, transitionProgress); // From 75 (default) to 50 (zoomed in)
    } else {
      camera.fov = THREE.MathUtils.lerp(50, 75, transitionProgress); // From 75 (default) to 50 (zoomed in)
    }

    camera.updateProjectionMatrix();
  }

  currentSphere.visible = true;
  nextSphere.visible = false;

  // Render the first panorama to its render target
  renderer.setRenderTarget(renderTarget1);
  renderer.render(scene, camera);

  currentSphere.visible = false;
  nextSphere.visible = true;
  // Render the second panorama to its render target
  renderer.setRenderTarget(renderTarget2);
  renderer.render(scene, camera);


  // Reset render target and update transition progress
  renderer.setRenderTarget(null);

  // Render final effect
  composer.render();

}

//Handling image click events
var sliderImages = document.querySelectorAll('#image-slider img');
let selectedImageIndex;

// document.addEventListener("DOMContentLoaded", function () {
//   sliderImages.forEach(function (img) {
//     img.addEventListener("click", function () {
//       // Call selectImage function and pass the clicked image
//       selectImage(img);
//     });
//   });
// });

function selectImage(currentIndex) {

//   sliderImages.forEach(function (img) {
//     img.classList.remove('selected');
//   });

//   image.classList.add('selected');

//   const targetIndex = panoramas.findIndex(img => img === image.alt);

  //console.log(targetIndex, "plplplplp")
//   spheres.forEach(function (sphere) {
//     sphere.visible = false;
//   });
  
//   spheres[targetIndex].visible = true;
//   currentSphere = spheres[targetIndex];
//   nextSphere = spheres[(targetIndex + 1) % spheres.length];
  
    
  
    hotspotMeshes.forEach(mesh => {
        scene.remove(mesh);
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) mesh.material.dispose();
    });
    hotspotMeshes.length = 0;
  
    
    hotSpotInfo.forEach(e => {
        if (e.visible.includes(currentIndex)) {
            const mesh = hotspotMesh.clone();
            mesh.position.set(e.pos.x, e.pos.y, e.pos.z);
            mesh.lookAt(camera.position);
            mesh.userData.spotIndex = e.spotIndex;
            mesh.userData.visibleSpheres = e.visible;
            mesh.visible = true;
            scene.add(mesh);
            hotspotMeshes.push(mesh);
        }
    });
}

// Function to handle click events on the document
function onDocumentClick(event) {
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  // Find intersections with hotspot meshes
  let intersectsHotspotMesh = raycaster.intersectObjects(hotspotMeshes);

  // If there are intersections, execute your function or code
  if (intersectsHotspotMesh.length > 0) {
    let intersectedMesh = intersectsHotspotMesh[0].object;
    transitioning = true;
    transitionProgress = 0.0;
    currentSphereIndex = intersectedMesh.userData.spotIndex;
    nextSphere = spheres[currentSphereIndex];
    
    //console.log(currentSphereIndex, "currentSphereIndex")
    
    selectImage(currentSphereIndex);
  }
}