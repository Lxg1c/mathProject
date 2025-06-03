import {useThree} from "@react-three/fiber";
import {useEffect} from "react";
import * as THREE from "three";

export function CameraController({ points }) {
    const { camera, scene } = useThree();

    useEffect(() => {
        if (points.length === 0) return;

        // Рассчитываем ограничивающий бокс для всех точек
        const box = new THREE.Box3();
        points.forEach(p => {
            box.expandByPoint(new THREE.Vector3(p.x, p.y, p.z));
        });

        const size = box.getSize(new THREE.Vector3()).length();

        // Сохраняем размер в пользовательском свойстве сцены
        scene.userData.sphereSize = Math.max(0.1, Math.min(0.5, size * 0.05));
        // Рассчитываем центр и размер сцены
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Рассчитываем новую позицию камеры
        const maxDim = Math.max(size, 1);
        const cameraDistance = maxDim * 2;
        const direction = new THREE.Vector3(1, 0.5, 1).normalize();
        const cameraPosition = direction.multiplyScalar(cameraDistance).add(center);

        // Обновляем позицию камеры
        camera.position.copy(cameraPosition);
        camera.lookAt(center);
        camera.updateProjectionMatrix();

    }, [points, camera, scene]);

    return null;
}
