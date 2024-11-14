
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshStandardMaterial,
    Mesh,
    DirectionalLight
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

console.log(`Main script running`);

// Create a scene
const scene: Scene = new Scene();

// Create a camera
const camera: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create light
const directionalLight = new DirectionalLight(0xffffff, 1); // White light with intensity of 1
directionalLight.position.set(5, 5, 5); // Position the light above and to the right
scene.add(directionalLight);

// Create a cube
const geometry: BoxGeometry = new BoxGeometry();
const material: MeshStandardMaterial = new MeshStandardMaterial({ 
    color: 0x00ff00,
    transparent: true,     // Enable transparency
    opacity: 0.5,          // Set opacity (0 is fully transparent, 1 is fully opaque)
    roughness: 0.5,        // Optional: Control roughness of the material
    metalness: 0.5         // Optional: Control metalness of the material
});
const cube: Mesh = new Mesh(geometry, material);

scene.add(cube);

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
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
};

animate();