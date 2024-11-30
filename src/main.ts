
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshStandardMaterial,
    Mesh,
    DirectionalLight,
    Vector3,
    MathUtils,
    PlaneGeometry,
    MeshBasicMaterial,
    TextureLoader,
    DoubleSide, 
    PointLight
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Sky } from 'three/examples/jsm/objects/Sky';

console.log(`Main script running`);

// Create a scene
const scene: Scene = new Scene();

initSky(scene);

// Create a camera
const camera: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create light
const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);
const directionalLight2 = new DirectionalLight(0xffffff, 1);
directionalLight2.position.set(5, 5, -5);
scene.add(directionalLight2);

// Create a cube
const glassMaterial: MeshStandardMaterial = new MeshStandardMaterial({ 
    color: 0xaaaaff,
    transparent: true,     // Enable transparency
    opacity: 0.5,          // Set opacity (0 is fully transparent, 1 is fully opaque)
    roughness: 0.5,        // Optional: Control roughness of the material
    metalness: 0.5         // Optional: Control metalness of the material
});
const wallMaterial: MeshStandardMaterial = new MeshStandardMaterial({color: 0xbbddaa});
const fireplaceMaterial: MeshStandardMaterial = new MeshStandardMaterial({color: 0xffffff});
const tvMaterial: MeshStandardMaterial = new MeshStandardMaterial({color: 0x111111});
const sillMaterial: MeshStandardMaterial = new MeshStandardMaterial({color: 0x554400});
const floorMaterial: MeshStandardMaterial = new MeshStandardMaterial({color: 0x333333});

const yOffset = .3;

// Glass
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(3, 2.5, 0.02), glassMaterial);
  mesh.position.y += .4 + yOffset;
  return mesh;
})());

// Bottom part of wall
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(3.5, .205, 0.03), wallMaterial);
  mesh.position.y += -.675 - .205 / 2 + yOffset;
  return mesh;
})());
// Horizontal stripe of wall
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(3.5, .42, 0.03), wallMaterial);
  mesh.position.y += .42 / 2 + yOffset;
  return mesh;
})());
// Verical stripe of wall
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(1.025, 1.545, 0.03), wallMaterial);
  mesh.position.y += -.215 / 2 + yOffset;
  return mesh;
})());
// Fireplace
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(0.91, .58, 0.18 * 2), fireplaceMaterial);
  mesh.position.y += -.3 - .58 / 2 + yOffset;
  return mesh;
})());
// Wall top horizontal slice
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(3.5, .42, 0.03), wallMaterial);
  mesh.position.y += .675 + .42 + .245 + .42 / 2 + yOffset;
  return mesh;
})());
// Left top window top
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(3.5 / 2 - .775 / 2 - .135, .40, 0.03), wallMaterial);
  mesh.position.y += .42 + .675 + .4 / 2 + yOffset;
  mesh.position.x += -3.5 / 2 + (3.5 / 2 - .775 / 2 - .135) / 2 + .05;
  return mesh;
})());
// Right top window top
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(3.5 / 2 - .775 / 2 - .135, .40, 0.03), wallMaterial);
  mesh.position.y += .42 + .675 + .4 / 2 + yOffset;
  mesh.position.x += +3.5 / 2 - (3.5 / 2 - .775 / 2 - .135) / 2 - .05;
  return mesh;
})());
// Left most vertical wall stripe
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(3.5 / 2 - .775 * 1.5 - .135, 2.6, 0.03), wallMaterial);
  mesh.position.y += .44 + yOffset;
  mesh.position.x += -3.5 / 2 + (3.5 / 2 - .775 * 1.5 - .135) / 2;
  return mesh;
})());
// Right most vertical wall stripe
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(3.5 / 2 - .775 * 1.5 - .135, 2.6, 0.03), wallMaterial);
  mesh.position.y += .44 + yOffset;
  mesh.position.x += 3.5 / 2 - (3.5 / 2 - .775 * 1.5 - .135) / 2;
  return mesh;
})());
// Left middle vertical stripe
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.135, 2.6, 0.03), wallMaterial);
  mesh.position.y += .44 + yOffset;
  mesh.position.x += -1.025 / 2 + .135 / 2;
  return mesh;
})());
// Right middle vertical stripe
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.135, 2.6, 0.03), wallMaterial);
  mesh.position.y += .44 + yOffset;
  mesh.position.x += 1.025 / 2 - .135 / 2;
  return mesh;
})());
// Small TV
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.655, .375, 0.03), tvMaterial);
  mesh.position.y += -.3 + .375 / 2 + .03 + yOffset;
  mesh.position.z += 0.07;
  return mesh;
})());
scene.add((() => {
  const textureLoader = new TextureLoader();
  const imageTexture = textureLoader.load('../football.png');
  const geometry = new PlaneGeometry(.635, .355);
  const material = new MeshBasicMaterial({
    map: imageTexture,
    side: DoubleSide
  });
  const plane = new Mesh(geometry, material);
  plane.position.y += -.3 + .375 / 2 + .03 + yOffset;
  plane.position.z += 0.071 + .03 / 2;
  return plane;
})());
scene.add((() => {
  const light = new PointLight(0xaaffaa, 0.1, 100);
  light.position.set(.15, -.3 + .375 / 2 + .03 + yOffset, 0.07 + .03 / 2 + .05);
  return light;
})());
scene.add((() => {
  const light = new PointLight(0xaaffaa, 0.1, 100);
  light.position.set(-.15, -.3 + .375 / 2 + .03 + yOffset, 0.07 + .03 / 2 + .05);
  return light;
})());
// Large TV
/*
scene.add((() => {   
  const mesh: Mesh = new Mesh(new BoxGeometry(.76, .46, 0.03), tvMaterial);
  mesh.position.y += -.3 + .46 / 2 + .03 + yOffset;
  mesh.position.z += 0.07;
  return mesh;
})());
scene.add((() => {
  const textureLoader = new TextureLoader();
  const imageTexture = textureLoader.load('../football.png');
  const geometry = new PlaneGeometry(.74, .44);
  const material = new MeshBasicMaterial({
    map: imageTexture,
    side: DoubleSide
  });
  const plane = new Mesh(geometry, material);
  plane.position.y += -.3 + .46 / 2 + .03 + yOffset;
  plane.position.z += 0.071 + .03 / 2;
  return plane;
})());
*/
// 98 inch
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.86, .49, 0.03), tvMaterial);
  mesh.position.y += -.3 + .49 / 2 + .03 + yOffset;
  mesh.position.z += -0.07;
  return mesh;
})());
scene.add((() => {
  const textureLoader = new TextureLoader();
  const imageTexture = textureLoader.load('../football.png');
  const geometry = new PlaneGeometry(.84, .47);
  const material = new MeshBasicMaterial({
    map: imageTexture,
    side: DoubleSide
  });
  const plane = new Mesh(geometry, material);
  plane.rotation.y += Math.PI;
  plane.position.y += -.3 + .49 / 2 + .03 + yOffset;
  plane.position.z += -0.071 - .03 / 2;
  return plane;
})());
scene.add((() => {
  const light = new PointLight(0xaaffaa, 0.1, 100);
  light.position.set(.15, -.3 + .375 / 2 + .03 + yOffset, -0.07 - .03 / 2 - .05);
  return light;
})());
scene.add((() => {
  const light = new PointLight(0xaaffaa, 0.1, 100);
  light.position.set(-.15, -.3 + .375 / 2 + .03 + yOffset, -0.07 - .03 / 2 - .05);
  return light;
})());

// Fireplace dark part
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.535, .38, 0.37), tvMaterial);
  mesh.position.y += -.3  - .15 - .38 / 2 + yOffset;
  return mesh;
})());
// vertical sill lower 1
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.03, .675, 0.04), sillMaterial);
  mesh.position.x += -1.025 / 2 - .775;
  mesh.position.y += -.675 / 2 + yOffset;
  return mesh;
})());
// vertical sill lower 2
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.03, .675, 0.04), sillMaterial);
  mesh.position.x += -1.025 / 2 - .03 / 2;
  mesh.position.y += -.675 / 2 + yOffset;
  return mesh;
})());
// vertical sill lower 3
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.03, .675, 0.04), sillMaterial);
  mesh.position.x += 1.025 / 2 + .775;
  mesh.position.y += -.675 / 2 + yOffset;
  return mesh;
})());
// vertical sill lower 4
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.03, .675, 0.04), sillMaterial);
  mesh.position.x += 1.025 / 2 + .03 / 2;
  mesh.position.y += -.675 / 2 + yOffset;
  return mesh;
})());

// vertical sill upper 1
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.03, .675, 0.04), sillMaterial);
  mesh.position.x += -1.025 / 2 - .775;
  mesh.position.y += .42 + .675 / 2 + yOffset;
  return mesh;
})());
// vertical sill upper 2
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.03, .675, 0.04), sillMaterial);
  mesh.position.x += -1.025 / 2 - .03 / 2;
  mesh.position.y += .42 + .675 / 2 + yOffset;
  return mesh;
})());
// vertical sill upper 3
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.03, .675, 0.04), sillMaterial);
  mesh.position.x += 1.025 / 2 + .775;
  mesh.position.y += .42 + .675 / 2 + yOffset;
  return mesh;
})());
// vertical sill upper 4
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.03, .675, 0.04), sillMaterial);
  mesh.position.x += 1.025 / 2 + .03 / 2;
  mesh.position.y += .42 + .675 / 2 + yOffset;
  return mesh;
})());
// vertical sill upper 5
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.03, .675, 0.04), sillMaterial);
  mesh.position.x += -.775 / 2;
  mesh.position.y += .42 + .675 / 2 + .245 + yOffset;
  return mesh;
})());
// vertical sill upper 6
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.03, .675, 0.04), sillMaterial);
  mesh.position.x += .775 / 2;
  mesh.position.y += .42 + .675 / 2 + .245 + yOffset;
  return mesh;
})());

// horizontal sill left 1
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.775, .03, 0.04), sillMaterial);
  mesh.position.x += -1.025 / 2 - .775 / 2;
  mesh.position.y += -.03 / 2 + yOffset;
  return mesh;
})());
// horizontal sill left 2
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.775, .03, 0.04), sillMaterial);
  mesh.position.x += -1.025 / 2 - .775 / 2;
  mesh.position.y += -.675 + .03 / 2 + yOffset;
  return mesh;
})());
// horizontal sill left 3
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.775, .03, 0.04), sillMaterial);
  mesh.position.x += -1.025 / 2 - .775 / 2;
  mesh.position.y += .42 + .03 / 2 + yOffset;
  return mesh;
})());
// horizontal sill left 4
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.775, .03, 0.04), sillMaterial);
  mesh.position.x += -1.025 / 2 - .775 / 2;
  mesh.position.y += .42 + .675 - .03 / 2 + yOffset;
  return mesh;
})());

// horizontal sill center 1
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.775, .03, 0.04), sillMaterial);
  mesh.position.y += .42 + .245 + .03 / 2 + yOffset;
  return mesh;
})());
// horizontal sill center 2
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.775, .03, 0.04), sillMaterial);
  mesh.position.y += .42 + .245 + .675 - .03 / 2 + yOffset;
  return mesh;
})());

// horizontal sill right 1
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.775, .03, 0.04), sillMaterial);
  mesh.position.x += 1.025 / 2 + .775 / 2;
  mesh.position.y += -.03 / 2 + yOffset;
  return mesh;
})());
// horizontal sill right 2
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.775, .03, 0.04), sillMaterial);
  mesh.position.x += 1.025 / 2 + .775 / 2;
  mesh.position.y += -.675 + .03 / 2 + yOffset;
  return mesh;
})());
// horizontal sill right 3
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.775, .03, 0.04), sillMaterial);
  mesh.position.x += 1.025 / 2 + .775 / 2;
  mesh.position.y += .42 + .03 / 2 + yOffset;
  return mesh;
})());
// horizontal sill right 4
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(.775, .03, 0.04), sillMaterial);
  mesh.position.x += 1.025 / 2 + .775 / 2;
  mesh.position.y += .42 + .675 - .03 / 2 + yOffset;
  return mesh;
})());

// floor
scene.add((() => { 
  const mesh: Mesh = new Mesh(new BoxGeometry(3.5, .03, 3.5), floorMaterial);
  mesh.position.y += -.675 - .205 - .03 / 2 + yOffset;
  return mesh;
})());





// Position camera
camera.position.z = 5;

// Initialize OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable smooth damping
controls.dampingFactor = 0.25; // Set damping factor for smooth movement
controls.screenSpacePanning = false; // Prevent panning from moving vertically
controls.maxPolarAngle = Math.PI / 2; // Limit the vertical angle of rotation

// Animation loop
const animate = function () {
  requestAnimationFrame(animate);

  controls.update();
  
  renderer.render(scene, camera);
};

animate();

function initSky(scene: Scene) {
    const sky = new Sky();
    sky.scale.setScalar( 450000 );
    scene.add( sky );
    // sky.material.uniforms.up.value = new Vector3(1, 0, 0);
    const sun = new Vector3();
    const elevation = 2;
    const azimuth = 120;
    const uniforms = sky.material.uniforms;
    uniforms[ 'turbidity' ].value = 10;
    uniforms[ 'rayleigh' ].value = 3;
    uniforms[ 'mieCoefficient' ].value = 0.005;
    uniforms[ 'mieDirectionalG' ].value = 0.7;
    const phi = MathUtils.degToRad(90 - elevation);
    const theta = MathUtils.degToRad(azimuth);
    sun.setFromSphericalCoords( 1, phi, theta );
    uniforms[ 'sunPosition' ].value.copy( sun );
}