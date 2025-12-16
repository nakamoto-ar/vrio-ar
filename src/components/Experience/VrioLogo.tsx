"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";

// Geometry constants for the V shape
// We will create 3 main segments for the triangle/V shape
// 1. Left diagonal
// 2. Right diagonal
// 3. Top bar (optional, based on the logo description "Triangular shapes")
// The logo is a Triangle pointing down.
// Let's create it out of multiple "shards" (instanced or individual meshes)

const GOLD_MATERIAL = new THREE.MeshStandardMaterial({
    color: "#FFC400",
    roughness: 0.3,
    metalness: 1.0,
});

const BLUE_MATERIAL = new THREE.MeshStandardMaterial({
    color: "#050914",
    roughness: 0.1,
});

const HOLOGRAPHIC_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: "#FFFFFF",
    emissive: "#00FFFF", // Cyan tint for holographic feel
    emissiveIntensity: 2.0,
    roughness: 0.2,
    metalness: 0.8,
    transmission: 0.1, // Slight transparency
    thickness: 1,
});

function Shard({
    position,
    rotation,
    scale,
    material,
    delay = 0,
    hovered,
}: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    material: THREE.Material;
    delay?: number;
    hovered: boolean;
}) {
    const mesh = useRef<THREE.Mesh>(null);

    // Random start position for "dispersed" state
    const startPos = useMemo(() => {
        return [
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
        ] as [number, number, number];
    }, []);

    const startRot = useMemo(() => {
        return [
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
        ] as [number, number, number];
    }, []);

    useFrame((state, delta) => {
        if (!mesh.current) return;

        // Target state
        const targetPos = hovered ? position : startPos;
        const targetRot = hovered ? rotation : startRot;

        // Magnetic easing
        // damp3(current, target, smoothTime, delta)
        easing.damp3(mesh.current.position, targetPos, hovered ? 0.3 : 1.5, delta);
        easing.dampE(mesh.current.rotation, targetRot, hovered ? 0.4 : 1.2, delta);
    });

    return (
        <mesh ref={mesh} material={material} scale={scale}>
            {/* Utilizing Cylinder for "prism" feel with 3 sides */}
            <cylinderGeometry args={[0.2, 0.5, 3, 3]} />
        </mesh>
    );
}

export function VrioLogo() {
    const [hovered, setHovered] = useState(false);

    // Define the shards that make up the triangle logo
    // This is a simplified artistic interpretation of the provided logo
    // 1. Center V (Gold + Blue)
    // 2. Outer V (White)

    return (
        <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Left Leg of V - Gold */}
            <Shard
                position={[-1.5, 0, 0]}
                rotation={[0, 0, Math.PI / 6]}
                scale={[1, 1, 1]}
                material={GOLD_MATERIAL}
                hovered={hovered}
            />
            {/* Right Leg of V - Blue */}
            <Shard
                position={[1.5, 0, 0]}
                rotation={[0, 0, -Math.PI / 6]}
                scale={[1, 1, 1]}
                material={BLUE_MATERIAL}
                hovered={hovered}
            />

            {/* Top Bar - Holographic White (The "cap" of the triangle) */}
            <Shard
                position={[0, 2.8, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={[1, 1.2, 1]} // Make it wider
                material={HOLOGRAPHIC_MATERIAL}
                hovered={hovered}
            />

            {/* Additional Details / Shards for complexity */}
            <Shard
                position={[-0.8, 1, 0.5]}
                rotation={[0, 0, Math.PI / 6]}
                scale={[0.5, 0.5, 0.5]}
                material={HOLOGRAPHIC_MATERIAL}
                hovered={hovered}
            />
            <Shard
                position={[0.8, 1, -0.5]}
                rotation={[0, 0, -Math.PI / 6]}
                scale={[0.5, 0.5, 0.5]}
                material={GOLD_MATERIAL}
                hovered={hovered}
            />
        </group>
    );
}
