
import * as THREE from 'three';

export type ShapeType = 'sphere' | 'grid' | 'helix' | 'chaos';

export interface AvatarUserData {
  id: number;
  name: string;
  targetPos: THREE.Vector3;
  originalLayoutPos: THREE.Vector3; // Added to store base layout position
  targetScale: number;
  baseScale: number;
  floatPhase: number;
  floatSpeed: number;
  explosionVelocity: THREE.Vector3;
  tempScale?: number;
}

export interface AppConfig {
  userCount: number;
  radius: number;
  baseSize: number;
  hoverSize: number;
  animSpeed: number;
  autoRotateSpeed: number;
  uniqueImageCount: number;
}
