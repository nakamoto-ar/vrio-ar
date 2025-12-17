"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";
import { useNavigationStore } from "@/store/useNavigationStore";

// Define camera positions for each section
// [x, y, z]
const CAMERA_POSITIONS: Record<string, [number, number, number]> = {
    HOME: [0, 0, 8],
    PROCESS: [4, 0, 5],      // Side view, closer
    CREATIVE: [-4, 2, 6],    // Opposite side, elevated
    STRATEGY: [0, -3, 6],    // Low angle, looking up
    SYSTEMS: [0, 0, 3.5],    // Macro / Close up to core
};

// Define LookAt targets (centers of focus)
const LOOK_AT_TARGETS: Record<string, [number, number, number]> = {
    HOME: [0, 0, 0],
    PROCESS: [0, 0, 0],
    CREATIVE: [0, 0, 0],
    STRATEGY: [0, 1, 0],     // Look higher up
    SYSTEMS: [0, 0, 0],
};

export function CameraController() {
    const activeSection = useNavigationStore((state) => state.activeSection);

    useFrame((state, delta) => {
        // Get target position and focus point based on active section
        // Fallback to HOME if section undefined
        const targetPos = CAMERA_POSITIONS[activeSection] || CAMERA_POSITIONS.HOME;
        const targetLook = LOOK_AT_TARGETS[activeSection] || LOOK_AT_TARGETS.HOME;

        // Smoothly move camera position
        easing.damp3(state.camera.position, targetPos, 0.5, delta);

        // Smoothly adjust lookAt is harder directly, so we normally just look at 0,0,0
        // Or we controls orbiting. For now, let's keep it simple: Camera looks at 0,0,0 always, 
        // as VrioLogo is at 0,1,0. Let's adjust slightly.

        // Manual LookAt interpolated? 
        // A simple way is to let the camera look at the center. 
        // state.camera.lookAt(0, 1, 0); // Vrio Logo center

        // If we want dynamic lookAt we need to interpolate the quaternion or the target vector.
        // For atomic step, let's stick to moving the camera around the center (0,1,0).
        state.camera.lookAt(0, 1, 0);
    });

    return null;
}
