import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Оси координат
scene.add(new THREE.AxesHelper(5));

// Сферы
const geometry = new THREE.SphereGeometry(0.1, 32, 32);
const sphereA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x0000ff }));
const sphereB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
const sphereC = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xffff00 }));

sphereA.position.set(1, 1, 1);
sphereB.position.set(2, 3, 4);
sphereC.position.set(21 / 13, 2, 63 / 26); // Проверь — эта точка НЕ лежит на 3x - 2z = 0

scene.add(sphereA, sphereB, sphereC);

// Плоскость: 3x - 2z = 0
const planeSize = 20;
const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.3,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// Вращение плоскости по нормали
// Вектор нормали (3, 0, -2), нормализованный
const normal = new THREE.Vector3(3, 0, -2).normalize();

// PlaneGeometry лежит в X–Y, у неё нормаль (0, 0, 1)
const defaultNormal = new THREE.Vector3(0, 0, 1);

// Кватернион поворота от (0, 0, 1) к нормали
const quaternion = new THREE.Quaternion().setFromUnitVectors(defaultNormal, normal);
plane.setRotationFromQuaternion(quaternion);

// Центр плоскости
plane.position.set(0, 0, 0);
scene.add(plane);

// Камера
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

// Контролы
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Tooltip
const tooltip = document.getElementById('tooltip');
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const spheres = [
    { mesh: sphereA, name: 'A' },
    { mesh: sphereB, name: 'B' },
    { mesh: sphereC, name: 'C' }
];

function onMouseMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(spheres.map(s => s.mesh));

    if (intersects.length > 0) {
        const intersected = intersects[0].object;
        const s = spheres.find(s => s.mesh === intersected);
        if (s) {
            const { x, y, z } = intersected.position;
            tooltip.style.left = `${event.clientX + 10}px`;
            tooltip.style.top = `${event.clientY + 10}px`;
            tooltip.innerText = `Точка ${s.name}\n(${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`;
            tooltip.style.display = 'block';
        }
    } else {
        tooltip.style.display = 'none';
    }
}

renderer.domElement.addEventListener('mousemove', onMouseMove);

// Обработка ресайза
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Анимация
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
