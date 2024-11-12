import * as THREE from 'https://cdn.skypack.dev/three@0.123.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.123.0/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.123.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.123.0/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.123.0/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.123.0/examples/jsm/postprocessing/UnrealBloomPass.js';

const panoramas = [
  'assets/env/1.webp',
  'assets/env/2.webp',
  'assets/env/3.webp',
  'assets/env/4.webp',
  'assets/env/5.webp',
  'assets/env/6.webp',
  'assets/env/7.webp',
  'assets/env/8.webp',
  'assets/env/9.webp',
  'assets/env/10.webp',
  'assets/env/11.webp',
  'assets/env/12.webp',
  'assets/env/13.webp',
  'assets/env/14.webp',
  'assets/env/15.webp',
  'assets/env/16.webp',
  'assets/env/17.webp',
  'assets/env/18.webp',
  'assets/env/19.webp',
  'assets/env/20.webp',
  'assets/env/21.webp',
  'assets/env/22.webp',
  'assets/env/23.webp',
  'assets/env/24.webp',
  'assets/env/25.webp',
  'assets/env/26.webp',
  'assets/env/27.webp',
  'assets/env/28.webp',
  'assets/env/29.png',
  'assets/env/30.webp',
  'assets/env/31.png',
  'assets/env/32.png',
  'assets/env/33.png',
  'assets/env/34.png',
  'assets/env/35.png',
  'assets/env/36.png',
  'assets/env/37.png',
  'assets/env/38.png',
  'assets/env/39.png',
  'assets/env/40.png',
  'assets/env/41.png',
  'assets/env/42.png',
  'assets/env/43.png',
  'assets/env/44.png',
  'assets/env/45.png',
  'assets/env/46.png',
  'assets/env/47.png',
  'assets/env/48.png',
  'assets/env/49.png',
  'assets/env/50.png',
  'assets/env/51.png',
]

const hotSpotInfo = [
  {
    spotIndex: 0,
    visible: [1],
    pos: { x: 250, y: -100, z: -180 },
  },
  {
    spotIndex: 1,
    visible: [0, 2],
    pos: { x: -200, y: -100, z: -150 },
  },
  {
    spotIndex: 2,
    visible: [1, 3],
    pos: { x: -300, y: -100, z: -150 },
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

  const hotspotTexture = new THREE.TextureLoader().load('assets/icons/hotspot-icon.png'); // Load the arrow image
  const hotspotMaterial = new THREE.MeshBasicMaterial({ map: hotspotTexture, transparent: true });
  const hotspotGeometry = new THREE.PlaneGeometry(40, 20);
  hotspotMesh = new THREE.Mesh(hotspotGeometry, hotspotMaterial);

  hotSpotInfo.forEach((e, index) => {
    const mesh = hotspotMesh.clone();
    mesh.position.set(e.pos.x, e.pos.y, e.pos.z);
    mesh.lookAt(camera.position);
    mesh.userData.spotIndex = index;
    mesh.userData.visibleSpheres = e.visible;
    mesh.visible = e.visible.includes(currentSphereIndex);
    scene.add(mesh);
    hotspotMeshes.push(mesh);
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
  composer.addPass(bloomPass);

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

  hotspotMeshes.forEach((mesh) => {
    mesh.visible = mesh.userData.visibleSpheres.includes(currentSphereIndex);
  })

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
    // Update the transition progress
    transitionProgress += transitionSpeed;

    // Limit the progress to 1.0 and stop the transition when complete
    if (transitionProgress >= 1.0) {
      transitionProgress = 1.0;
      transitioning = false;
      currentSphere.visible = false;
      nextSphere.visible = true;

      currentSphere = spheres[currentSphereIndex];
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

document.addEventListener("DOMContentLoaded", function () {
  sliderImages.forEach(function (img) {
    img.addEventListener("click", function () {
      // Call selectImage function and pass the clicked image
      selectImage(img);
    });
  });
});

function selectImage(image) {

  sliderImages.forEach(function (img) {
    img.classList.remove('selected');
  });

  image.classList.add('selected');

  const targetIndex = panoramas.findIndex(img => img === image.alt);

  console.log(targetIndex, "plplplplp")
  spheres.forEach(function (sphere) {
    sphere.visible = false;
  });
  spheres[targetIndex].visible = true;
  currentSphere = spheres[targetIndex];
  nextSphere = spheres[(targetIndex + 1) % spheres.length];
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
    console.log(currentSphereIndex, "currentSphereIndex")

  }
}