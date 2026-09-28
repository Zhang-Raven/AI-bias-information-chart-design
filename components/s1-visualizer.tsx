import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ShapeType, AvatarUserData } from './s1-types';
import { CONFIG } from './s1-constants';
import { soundManager } from './s1-sound-manager';
import { RULE_DATA } from './s1-data';

interface VisualizerProps {
  currentShape: ShapeType;
  terms: string[];
  consequentTerms: Set<string>;
}

// Map specific output nodes to their full-screen popup pages
const OUTPUT_POPUP_MAP: Record<string, string> = {
  'expression:smiling': '/smile001/smile003.html',
  'occupation:tech': '/tech001/tech003.html',
  'occupation:medical': '/medical001/医疗二级界面003.html'
};

const Visualizer: React.FC<VisualizerProps> = ({ currentShape, terms, consequentTerms }) => {
  // ===== Refs =====
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const avatarsRef = useRef<THREE.Sprite[]>([]);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);
  const linesRef = useRef<THREE.Line[]>([]);
  
  // State refs
  const selectedAvatarRef = useRef<THREE.Sprite | null>(null);
  const hoveredAvatarRef = useRef<THREE.Sprite | null>(null);
  const relatedAvatarsRef = useRef<THREE.Sprite[]>([]);
  const isExplodingRef = useRef(false);
  const isZoomedRef = useRef(false);
  
  // Layout cache
  const layoutsRef = useRef<Record<ShapeType, THREE.Vector3[]>>({
    sphere: [], grid: [], helix: [], chaos: []
  });

  // ===== Memoized Relationships =====
  const relationshipMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    RULE_DATA.rules.forEach(rule => {
      const allTerms = [
        ...rule.antecedents.map(([attr, val]) => `${attr}:${val}`),
        ...rule.consequents.map(([attr, val]) => `${attr}:${val}`)
      ];
      allTerms.forEach(termA => {
        if (!map.has(termA)) map.set(termA, new Set());
        allTerms.forEach(termB => {
          if (termA !== termB) map.get(termA)!.add(termB);
        });
      });
    });
    return map;
  }, []);

  // ===== Canvas Drawing =====
  const createNodeTexture = (term: string): THREE.CanvasTexture => {
    const isOutput = consequentTerms.has(term);
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const centerX = size / 2, centerY = size / 2;
    const [hue, sat, light] = isOutput ? [207, 100, 63] : [0, 0, 95];

    // Gradient background
    const grad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, 240);
    grad.addColorStop(0, isOutput ? `hsla(${hue}, ${sat}%, ${light}%, 0.4)` : `hsla(0, 0%, 100%, 0.25)`);
    grad.addColorStop(1, isOutput ? `hsla(${hue}, ${sat}%, 15%, 0)` : `hsla(0, 0%, 20%, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 250, 0, Math.PI * 2);
    ctx.fill();

    // Text
    const [attr, val] = term.split(':');
    ctx.shadowColor = "rgba(0,0,0,0.9)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 6;
    ctx.textAlign = "center";
    
    ctx.fillStyle = isOutput ? `hsl(${hue}, 90%, 80%)` : `hsl(0, 0%, 70%)`;
    ctx.font = "bold 40px Arial";
    ctx.fillText(attr.toUpperCase(), centerX, centerY - 30);
    
    ctx.fillStyle = "white";
    ctx.font = "bold 68px Arial";
    ctx.fillText(val || "", centerX, centerY + 55);

    // Border
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
    ctx.strokeStyle = isOutput ? `hsla(${hue}, 100%, 70%, 0.7)` : `hsla(0, 0%, 100%, 0.4)`;
    ctx.lineWidth = 14;
    if (!isOutput) ctx.setLineDash([15, 20]);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  };

  // ===== Layout Calculations =====
  const calculateLayouts = () => {
    const count = terms.length;
    const layouts: Record<ShapeType, THREE.Vector3[]> = { sphere: [], grid: [], helix: [], chaos: [] };

    // Sphere (Fibonacci)
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      layouts.sphere.push(new THREE.Vector3(
        Math.cos(theta) * r, y, Math.sin(theta) * r
      ).multiplyScalar(CONFIG.radius * 1.15));
    }

    // Grid
    const gridSize = Math.ceil(Math.pow(count, 1/3));
    const spacing = 160;
    const offset = (gridSize * spacing) / 2 - spacing / 2;
    let idx = 0;
    for (let x = 0; x < gridSize && idx < count; x++) {
      for (let y = 0; y < gridSize && idx < count; y++) {
        for (let z = 0; z < gridSize && idx < count; z++) {
          layouts.grid.push(new THREE.Vector3(
            x * spacing - offset, y * spacing - offset, z * spacing - offset
          ));
          idx++;
        }
      }
    }

    // Helix
    for (let i = 0; i < count; i++) {
      const theta = i * 0.4;
      const y = -(i * 15) + (count * 7.5);
      layouts.helix.push(new THREE.Vector3(320 * Math.cos(theta), y, 320 * Math.sin(theta)));
    }

    // Chaos
    for (let i = 0; i < count; i++) {
      layouts.chaos.push(new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(1000),
        THREE.MathUtils.randFloatSpread(1000),
        THREE.MathUtils.randFloatSpread(1000)
      ));
    }

    layoutsRef.current = layouts;
  };

  // ===== Node Hit Detection =====
  const findNodeAtPosition = (
    mouse: { ndcX: number; ndcY: number; clientX: number; clientY: number }
  ): THREE.Sprite | null => {
    if (!cameraRef.current) return null;
    const camera = cameraRef.current;
    
    const raycaster = new THREE.Raycaster();
    raycaster.params.Sprite.threshold = CONFIG.hoverSize * 1.6; // enlarge hit area for easier hover
    raycaster.setFromCamera({ x: mouse.ndcX, y: mouse.ndcY } as THREE.Vector2, camera);
    
    const intersects = raycaster.intersectObjects(avatarsRef.current);
    if (intersects.length > 0) return intersects[0].object as THREE.Sprite;

    // Screen-space fallback so hovering near a sprite still counts
    let closest: { sprite: THREE.Sprite | null; dist: number } = { sprite: null, dist: Infinity };
    avatarsRef.current.forEach(avatar => {
      const projected = avatar.position.clone().project(camera);
      const screenX = (projected.x * 0.5 + 0.5) * window.innerWidth;
      const screenY = (-projected.y * 0.5 + 0.5) * window.innerHeight;
      const dist = Math.hypot(screenX - mouse.clientX, screenY - mouse.clientY);
      if (dist < closest.dist) {
        closest = { sprite: avatar, dist };
      }
    });

    const screenThreshold = CONFIG.hoverSize * 1.1; // px tolerance
    return closest.dist <= screenThreshold ? closest.sprite : null;
  };

  // ===== Relationship State Management =====
  const updateRelationships = (centerNode: THREE.Sprite | null) => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    // 清除所有现有连线
    linesRef.current.forEach(line => scene.remove(line));
    linesRef.current = [];

    if (!centerNode) {
      relatedAvatarsRef.current = [];
      avatarsRef.current.forEach(avatar => {
        (avatar.userData as AvatarUserData).targetPos.copy(
          (avatar.userData as AvatarUserData).originalLayoutPos
        );
      });
      return;
    }

    const centerName = (centerNode.userData as AvatarUserData).name;
    const relatedTerms = relationshipMap.get(centerName) || new Set();
    
    relatedAvatarsRef.current = avatarsRef.current.filter(
      a => a !== centerNode && relatedTerms.has((a.userData as AvatarUserData).name)
    );

    if (!cameraRef.current) return;

    const camera = cameraRef.current;
    const centerPos = (centerNode.userData as AvatarUserData).originalLayoutPos;
    const isOutputNode = consequentTerms.has(centerName);

    // 如果是 output 节点，则吸附相关节点；如果是 input 节点，只显示连线
    if (isOutputNode) {
      // 紧密吸附半径 - 允许重叠
      const attachRadius = CONFIG.baseSize * 0.8;
      
      // 随机分布在中心节点周围，允许重叠
      relatedAvatarsRef.current.forEach((avatar) => {
        // 在球面上随机分布点
        const theta = Math.random() * Math.PI * 2; // 水平角度
        const phi = Math.acos(2 * Math.random() - 1); // 垂直角度，均匀分布
        
        const x = attachRadius * Math.sin(phi) * Math.cos(theta);
        const y = attachRadius * Math.sin(phi) * Math.sin(theta);
        const z = attachRadius * Math.cos(phi);
        
        const offset = new THREE.Vector3(x, y, z);
        const targetPos = centerPos.clone().add(offset);
        (avatar.userData as AvatarUserData).targetPos.copy(targetPos);
      });
    } else {
      // input 节点：不吸附，保持原位
      relatedAvatarsRef.current.forEach((avatar) => {
        (avatar.userData as AvatarUserData).targetPos.copy(
          (avatar.userData as AvatarUserData).originalLayoutPos
        );
      });
    }

    // 创建连线（对所有相关节点），确保每对节点只生成一条线
    const createdPairs = new Set<string>();
    relatedAvatarsRef.current.forEach(avatar => {
      const pairKey = [centerName, (avatar.userData as AvatarUserData).name].sort().join('->');
      if (createdPairs.has(pairKey)) return;
      createdPairs.add(pairKey);

      const material = new THREE.LineBasicMaterial({
        color: 0x6AB3FF,
        transparent: true,
        opacity: 0.4,
        linewidth: 1
      });
      
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(6); // 两个点，每个点3个坐标
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const line = new THREE.Line(geometry, material);
      line.userData = { from: centerNode, to: avatar, key: pairKey };
      scene.add(line);
      linesRef.current.push(line);
    });

    // Reset non-related nodes
    avatarsRef.current.forEach(avatar => {
      if (avatar !== centerNode && !relatedAvatarsRef.current.includes(avatar)) {
        (avatar.userData as AvatarUserData).targetPos.copy(
          (avatar.userData as AvatarUserData).originalLayoutPos
        );
      }
    });
  };

  // ===== Node Scale Updates =====
  const updateNodeScales = () => {
    const hasSelection = selectedAvatarRef.current !== null;

    avatarsRef.current.forEach(avatar => {
      const data = avatar.userData as AvatarUserData;
      const mat = avatar.material as THREE.SpriteMaterial;

      if (avatar === selectedAvatarRef.current) {
        data.targetScale = CONFIG.hoverSize * 1.3;
        avatar.renderOrder = 999;
        mat.depthTest = false;
        mat.opacity = 1.0;
        mat.color.setHex(0xffffff);
      } else if (data.tempScale) {
        data.targetScale = data.tempScale;
        avatar.renderOrder = 998;
        mat.depthTest = false;
        mat.opacity = 0.95;
        mat.color.setHex(0xf8f0ff);
      } else {
        data.targetScale = data.baseScale;
        avatar.renderOrder = 0;
        mat.depthTest = true;
        mat.opacity = hasSelection ? 0.1 : 1.0;
        mat.color.setHex(0xffffff);
      }
      mat.needsUpdate = true;
    });
  };

  // ===== Camera Animation =====
  const animateCamera = (from: THREE.Vector3, to: THREE.Vector3) => {
    if (!cameraRef.current) return;
    const camera = cameraRef.current;
    const duration = 1000;
    const startTime = Date.now();
    
    const tick = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      camera.position.lerpVectors(from, to, eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  };

  // ===== Event Handlers =====
  const handleMouseMove = (event: MouseEvent) => {
    const mouse = {
      ndcX: (event.clientX / window.innerWidth) * 2 - 1,
      ndcY: -(event.clientY / window.innerHeight) * 2 + 1,
      clientX: event.clientX,
      clientY: event.clientY
    };

    const node = findNodeAtPosition(mouse);
    
    // If clicked, ignore hover
    if (selectedAvatarRef.current) {
      document.body.style.cursor = 'default';
      return;
    }

    // 修改：所有节点都响应悬浮，不仅仅是consequent节点
    if (node) {
      document.body.style.cursor = 'pointer';
      if (hoveredAvatarRef.current !== node) {
        hoveredAvatarRef.current = node;
        updateRelationships(node);
        updateNodeScales();
      }
    } else {
      document.body.style.cursor = 'default';
      if (hoveredAvatarRef.current) {
        hoveredAvatarRef.current = null;
        updateRelationships(null);
        updateNodeScales();
      }
    }
  };

  const handleClick = (event: MouseEvent) => {
    const mouse = {
      ndcX: (event.clientX / window.innerWidth) * 2 - 1,
      ndcY: -(event.clientY / window.innerHeight) * 2 + 1,
      clientX: event.clientX,
      clientY: event.clientY
    };

    const node = findNodeAtPosition(mouse);
    const nodeName = node ? (node.userData as AvatarUserData).name : null;

    // If the clicked node is one of the designated outputs, open its popup
    if (nodeName && OUTPUT_POPUP_MAP[nodeName]) {
      const popupUrl = OUTPUT_POPUP_MAP[nodeName];
      window.open(encodeURI(popupUrl), '_blank', 'noopener,noreferrer');
      soundManager.playBling();
      return;
    }

    if (node && consequentTerms.has(nodeName || '')) {
      if (selectedAvatarRef.current === node) {
        // Deselect
        selectedAvatarRef.current = null;
        isExplodingRef.current = false;
        updateRelationships(null);
        updateNodeScales();
      } else {
        // Select
        selectedAvatarRef.current = node;
        isExplodingRef.current = false;
        updateRelationships(node);
        updateNodeScales();
      }
      soundManager.playLink();
    } else if (!node) {
      // Click background - deselect
      selectedAvatarRef.current = null;
      isExplodingRef.current = false;
      updateRelationships(null);
      updateNodeScales();
    }
  };

  const handleDoubleClick = (event: MouseEvent) => {
    const mouse = {
      ndcX: (event.clientX / window.innerWidth) * 2 - 1,
      ndcY: -(event.clientY / window.innerHeight) * 2 + 1,
      clientX: event.clientX,
      clientY: event.clientY
    };

    const node = findNodeAtPosition(mouse);

    if (!node) {
      // Zoom toggle
      if (!cameraRef.current) return;
      const from = cameraRef.current.position.clone();
      const to = isZoomedRef.current ? new THREE.Vector3(0, 0, 900) : new THREE.Vector3(0, 0, 500);
      animateCamera(from, to);
      isZoomedRef.current = !isZoomedRef.current;
    } else if (consequentTerms.has((node.userData as AvatarUserData).name)) {
      // Explosion effect
      selectedAvatarRef.current = node;
      updateRelationships(node);
      updateNodeScales();
      isExplodingRef.current = true;
      soundManager.playExplosion();
      
      relatedAvatarsRef.current.forEach(avatar => {
        (avatar.userData as AvatarUserData).explosionVelocity.set(
          THREE.MathUtils.randFloatSpread(10),
          THREE.MathUtils.randFloatSpread(10),
          THREE.MathUtils.randFloatSpread(10)
        );
      });
    }
  };

  // ===== Main Scene Setup =====
  useEffect(() => {
    if (!containerRef.current) return;

    calculateLayouts();

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, 0.0008);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(0, 100, 900); // 提高初始Y位置，为顶部标题留出空间
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = CONFIG.autoRotateSpeed;
    controls.enableZoom = false;
    controlsRef.current = controls;

    const onTouchStart = () => controls.enableZoom = true;
    const onTouchEnd = () => controls.enableZoom = false;
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    renderer.domElement.addEventListener('touchend', onTouchEnd);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(6000);
    for (let i = 0; i < 6000; i++) {
      starPos[i] = THREE.MathUtils.randFloatSpread(3000);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ 
      color: 0x8888aa, size: 1.5, transparent: true, opacity: 0.6 
    })));

    // Atmosphere
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(CONFIG.radius * 2.5, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x440088, transparent: true, opacity: 0.03,
        side: THREE.BackSide, blending: THREE.AdditiveBlending
      })
    );
    scene.add(atmosphere);
    atmosphereRef.current = atmosphere;

    // Create node sprites
    terms.forEach((term, i) => {
      const texture = createNodeTexture(term);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
      
      const pos = layoutsRef.current[currentShape][i] || new THREE.Vector3();
      sprite.position.copy(pos);
      sprite.scale.set(CONFIG.baseSize, CONFIG.baseSize, 1);

      sprite.userData = {
        id: i,
        name: term,
        targetPos: pos.clone(),
        originalLayoutPos: pos.clone(),
        targetScale: CONFIG.baseSize,
        baseScale: CONFIG.baseSize,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.5 + Math.random() * 0.5,
        explosionVelocity: new THREE.Vector3()
      } as AvatarUserData;

      scene.add(sprite);
      avatarsRef.current.push(sprite);
    });

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('dblclick', handleDoubleClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      const time = Date.now() * 0.001;
      if (atmosphereRef.current) atmosphereRef.current.rotation.y += 0.0005;

      // Update nodes
      avatarsRef.current.forEach(avatar => {
        const data = avatar.userData as AvatarUserData;
        const floatY = Math.sin(time * data.floatSpeed + data.floatPhase) * 5;
        
        // Position
        if (isExplodingRef.current && relatedAvatarsRef.current.includes(avatar)) {
          avatar.position.add(data.explosionVelocity);
          data.explosionVelocity.multiplyScalar(0.95);
        } else {
          const target = data.targetPos.clone();
          target.y += floatY;
          avatar.position.lerp(target, CONFIG.animSpeed);
        }
        
        // Scale
        avatar.scale.lerp(
          new THREE.Vector3(data.targetScale, data.targetScale, 1),
          CONFIG.animSpeed * 2
        );
      });

      // Update lines
      linesRef.current.forEach(line => {
        const from = line.userData.from as THREE.Sprite;
        const to = line.userData.to as THREE.Sprite;
        const positions = line.geometry.attributes.position.array as Float32Array;
        
        positions[0] = from.position.x;
        positions[1] = from.position.y;
        positions[2] = from.position.z;
        positions[3] = to.position.x;
        positions[4] = to.position.y;
        positions[5] = to.position.z;
        
        line.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('dblclick', handleDoubleClick);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchend', onTouchEnd);
      linesRef.current.forEach(line => scene.remove(line));
      linesRef.current = [];
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [terms, consequentTerms]);

  // ===== Shape Change Handler =====
  useEffect(() => {
    avatarsRef.current.forEach((avatar, i) => {
      const data = avatar.userData as AvatarUserData;
      const newPos = layoutsRef.current[currentShape][i];
      if (newPos) {
        data.originalLayoutPos.copy(newPos);
        data.targetPos.copy(newPos);
      }
    });
    selectedAvatarRef.current = null;
    hoveredAvatarRef.current = null;
    relatedAvatarsRef.current = [];
    isExplodingRef.current = false;
    updateNodeScales();
  }, [currentShape]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default Visualizer;
