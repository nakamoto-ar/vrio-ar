"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Backdrop, ContactShadows, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useRef, useState } from "react";
import * as THREE from "three";
import { easing } from "maath";
import { VrioLogo } from "./VrioLogo";

function RobotArm() {
    const baseRef = useRef<THREE.Group>(null);
    const arm1Ref = useRef<THREE.Group>(null);
    const arm2Ref = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);

    // IK-ish logic: Simple damping rotation towards mouse
    useFrame((state, delta) => {
        if (!baseRef.current || !arm1Ref.current || !arm2Ref.current || !headRef.current) return;

        // Mouse positions mapped to rotation angles
        const x = state.pointer.x;
        const y = state.pointer.y;

        // Base swivel (y-axis)
        easing.dampE(baseRef.current.rotation, [0, -x * 0.5, 0], 0.2, delta);

        // Arm 1 lift (x-axis)
        easing.dampE(arm1Ref.current.rotation, [0.3 - y * 0.2, 0, 0], 0.2, delta);

        // Arm 2 bend (x-axis)
        easing.dampE(arm2Ref.current.rotation, [-0.5 + y * 0.2, 0, 0], 0.3, delta);

        // Head inspection (Look at center)
        // In a real IK setup, this would calculate angles. Here we fake it nicely.
        easing.dampE(headRef.current.rotation, [y * 0.5, 0, 0], 0.1, delta);
    });

    const mMetal = new THREE.MeshStandardMaterial({
        color: "#222",
        roughness: 0.2,
        metalness: 0.8,
    });

    const mJoint = new THREE.MeshStandardMaterial({
        color: "#FFC400",
        roughness: 0.3,
        metalness: 1.0,
    });

    return (
        <group position={[3, -2, -1]}>
            {/* BASE */}
            <group ref={baseRef}>
                <mesh position={[0, 0.5, 0]} material={mMetal}>
                    <cylinderGeometry args={[0.5, 0.8, 1, 16]} />
                </mesh>

                {/* JOINT 1 */}
                <mesh position={[0, 1, 0]} rotation={[0, 0, Math.PI / 2]} material={mJoint}>
                    <cylinderGeometry args={[0.3, 0.3, 1.2, 16]} />
                </mesh>

                {/* ARM 1 */}
                <group ref={arm1Ref} position={[0, 1, 0]}>
                    <mesh position={[0, 1.5, 0]} material={mMetal}>
                        <boxGeometry args={[0.4, 3, 0.4]} />
                    </mesh>

                    {/* JOINT 2 */}
                    <group position={[0, 3, 0]}>
                        <mesh rotation={[0, 0, Math.PI / 2]} material={mJoint}>
                            <cylinderGeometry args={[0.25, 0.25, 1, 16]} />
                        </mesh>

                        {/* ARM 2 */}
                        <group ref={arm2Ref}>
                            <mesh position={[0, 1.5, 0]} material={mMetal}>
                                <boxGeometry args={[0.3, 3, 0.3]} />
                            </mesh>

                            {/* HEAD */}
                            <group position={[0, 3, 0]} ref={headRef}>
                                <mesh rotation={[Math.PI / 2, 0, 0]} material={mJoint}>
                                    <cylinderGeometry args={[0.2, 0.4, 1, 16]} />
                                </mesh>
                                {/* Light/Sensor on head */}
                                <mesh position={[0, 0.5, 0.2]} material={new THREE.MeshBasicMaterial({ color: "#00FFFF" })}>
                                    <boxGeometry args={[0.1, 0.1, 0.4]} />
                                </mesh>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
}

export function HeroScene() {
    return (
        <div className="w-full h-screen absolute top-0 left-0 bg-void-blue">
            <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
                <fog attach="fog" args={["#050914", 5, 20]} />

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <group position={[0, 0, 0]}>
                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                        <VrioLogo />
                    </Float>
                </group>

                <RobotArm />

                <Backdrop
                    floor={10}
                    receiveShadow
                    scale={[20, 10, 5]}
                    position={[0, -4, -10]}
                >
                    <meshStandardMaterial color="#050914" roughness={0.1} metalness={0.5} />
                </Backdrop>

                {/* Post Processing */}
                <EffectComposer>
                    <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.6} />
                    <Noise opacity={0.05} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
