'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PanchangData } from '../types';
import { VEDIC_NAKSHATRAS } from '../data/nakshatras';
import { useLanguage } from '../context/LanguageContext';


interface CelestialCanvasProps {
  panchang: PanchangData;
  offsetDays?: number;
  isPlaying?: boolean;
  subtitles?: string;
  cameraFocus?: 'default' | 'moon' | 'sun' | 'nakshatra';
}

export const CelestialCanvas: React.FC<CelestialCanvasProps> = ({
  panchang,
  offsetDays = 0,
  isPlaying = false,
  subtitles = '',
  cameraFocus = 'default',
}) => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Celestial Objects
  const earthTiltGroupRef = useRef<THREE.Group | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const earthCloudsRef = useRef<THREE.Mesh | null>(null);
  const sunGroupRef = useRef<THREE.Group | null>(null);
  const sunMeshRef = useRef<THREE.Mesh | null>(null);
  const sunProminence1Ref = useRef<THREE.Sprite | null>(null);
  const sunProminence2Ref = useRef<THREE.Sprite | null>(null);
  const sunGlowRef = useRef<THREE.Sprite | null>(null);
  const sunPointLightRef = useRef<THREE.PointLight | null>(null);
  const sunlightRef = useRef<THREE.DirectionalLight | null>(null);
  const moonMeshRef = useRef<THREE.Mesh | null>(null);
  const tithiSectorRef = useRef<THREE.Mesh | null>(null);
  const nakshatraSpritesRef = useRef<THREE.Sprite[]>([]);

  // Visual Sightline & Active Nakshatra Indicators
  const sightlineBeamRef = useRef<THREE.Line | null>(null);
  const activeSectorArcRef = useRef<THREE.Line | null>(null);
  const activeSectorBoundariesRef = useRef<THREE.LineSegments | null>(null);
  const activeNakshatraBeaconRef = useRef<THREE.Sprite | null>(null);
  const activeNakshatraLabelRef = useRef<THREE.Sprite | null>(null);
  const sightlineLabelRef = useRef<THREE.Sprite | null>(null);

  // Interaction state
  const isDraggingRef = useRef(false);
  const previousPointerPosRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0 });
  const targetSceneRotationRef = useRef({ x: 0.35, y: -0.4 });
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 16, 26));

  // Refs for camera choreography (kept in sync with props via useEffect)
  const isPlayingRef = useRef(isPlaying);
  const cameraFocusRef = useRef(cameraFocus);
  const wasSpeakingRef = useRef(false);
  const initialDistanceRef = useRef(26);
  const initialCamYRef = useRef(16);

  const orbitRadiusSun = 15;
  const orbitRadiusMoon = 5.4;
  const nakshatraRingRadius = orbitRadiusSun + 2.8;

  // NASA SDO Fiery Solar Corona Halo Gradient
  const createSunGlowTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 256, 256);

    const grd = ctx.createRadialGradient(128, 128, 20, 128, 128, 128);
    grd.addColorStop(0, 'rgba(255, 245, 215, 1)');
    grd.addColorStop(0.25, 'rgba(249, 115, 22, 0.9)');
    grd.addColorStop(0.55, 'rgba(220, 38, 38, 0.45)');
    grd.addColorStop(0.8, 'rgba(153, 27, 27, 0.12)');
    grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 256, 256);

    return new THREE.CanvasTexture(canvas);
  };

  // Pulsing Target Beacon Halo for Active Nakshatra
  const createActiveBeaconTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 256, 256);

    // Glowing target circle
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(251, 191, 36, 0.85)');
    grad.addColorStop(0.4, 'rgba(245, 158, 11, 0.45)');
    grad.addColorStop(0.8, 'rgba(217, 119, 6, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(128, 128, 120, 0, Math.PI * 2);
    ctx.fill();

    // Outer ring
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(128, 128, 112, 0, Math.PI * 2);
    ctx.stroke();

    // Crosshairs
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.8)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(128, 8);
    ctx.lineTo(128, 248);
    ctx.moveTo(8, 128);
    ctx.lineTo(248, 128);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  // 3D Floating Badge Label explicitly marking "CURRENT NAKSHATRA / वर्तमान नक्षत्र"
  const createActiveLabelTexture = (lang: 'hi' | 'en', name: string, num: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 180;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 640, 180);

    // Rounded background pill with generous padding
    const rx = 16, ry = 16, rw = 608, rh = 148, radius = 36;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(rx, ry, rw, rh, radius) : ctx.rect(rx, ry, rw, rh);
    ctx.fill();

    // High-visibility golden border
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Pulsing indicator dot
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(72, 90, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Title line: "CURRENT NAKSHATRA" or "वर्तमान सक्रिय नक्षत्र"
    ctx.font = '900 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'left';
    ctx.fillText(lang === 'hi' ? 'वर्तमान सक्रिय नक्षत्र' : 'CURRENT NAKSHATRA', 114, 70);

    // Subtitle line: "#{num}. {Name}"
    ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`#${num}. ${name}`, 114, 126);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  // 3D Floating Label along the Earth -> Moon sightline
  const createSightlineLabelTexture = (lang: 'hi' | 'en') => {
    const canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 80;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 440, 80);

    // Soft pill
    ctx.fillStyle = 'rgba(2, 6, 23, 0.88)';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(10, 10, 420, 60, 20) : ctx.rect(10, 10, 420, 60);
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Text: "Earth ➔ Moon Sightline"
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText(lang === 'hi' ? 'दृष्टि रेखा (पृथ्वी ➔ चन्द्र ➔ नक्षत्र)' : 'Lunar Sightline (Earth ➔ Moon)', 220, 48);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  // Vedic Nakshatra Badge Texture
  const createNakshatraBadgeTexture = (
    index: number,
    emoji: string,
    hindiName: string,
    englishName: string
  ) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 512, 512);

    // Deep cosmic gradient background
    const bgGrad = ctx.createRadialGradient(256, 256, 40, 256, 256, 240);
    bgGrad.addColorStop(0, 'rgba(26, 22, 68, 0.98)');
    bgGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.96)');
    bgGrad.addColorStop(1, 'rgba(217, 119, 6, 0.92)');

    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
    ctx.fill();

    // Outer golden boundary ring
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(256, 256, 234, 0, Math.PI * 2);
    ctx.stroke();

    // Inner subtle cosmic glow ring
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(256, 256, 222, 0, Math.PI * 2);
    ctx.stroke();

    // Illuminated circular backdrop disc behind symbol
    const iconDiscGrad = ctx.createRadialGradient(256, 172, 10, 256, 172, 115);
    iconDiscGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    iconDiscGrad.addColorStop(0.5, 'rgba(251, 191, 36, 0.3)');
    iconDiscGrad.addColorStop(0.85, 'rgba(129, 140, 248, 0.2)');
    iconDiscGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = iconDiscGrad;
    ctx.beginPath();
    ctx.arc(256, 172, 115, 0, Math.PI * 2);
    ctx.fill();

    const formattedEmoji = emoji.includes('\uFE0F') ? emoji : `${emoji}\uFE0F`;

    ctx.save();
    ctx.font = '135px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 14;

    const emojiMetrics = ctx.measureText(formattedEmoji);
    const emojiAscent = emojiMetrics.actualBoundingBoxAscent || 95;
    const emojiDescent = emojiMetrics.actualBoundingBoxDescent || 25;
    const emojiCenterY = 172 + (emojiAscent - emojiDescent) / 2;
    ctx.fillText(formattedEmoji, 256, emojiCenterY);
    ctx.restore();

    // Devanagari Hindi Name
    ctx.save();
    ctx.font = 'bold 64px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#fef08a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 10;
    const hindiMetrics = ctx.measureText(hindiName);
    const hindiAscent = hindiMetrics.actualBoundingBoxAscent || 44;
    const hindiDescent = hindiMetrics.actualBoundingBoxDescent || 12;
    const hindiCenterY = 320 + (hindiAscent - hindiDescent) / 2;
    ctx.fillText(hindiName, 256, hindiCenterY);
    ctx.restore();

    // English Name & Lunar Mansion Number
    ctx.save();
    ctx.font = '700 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 8;
    const englishLabel = `${index + 1}. ${englishName}`;
    const engMetrics = ctx.measureText(englishLabel);
    const engAscent = engMetrics.actualBoundingBoxAscent || 32;
    const engDescent = engMetrics.actualBoundingBoxDescent || 10;
    const engCenterY = 396 + (engAscent - engDescent) / 2;
    ctx.fillText(englishLabel, 256, engCenterY);
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
    return texture;
  };

  const createNakshatraRing = () => {
    const group = new THREE.Group();
    const radius = nakshatraRingRadius;

    const circleGeo = new THREE.BufferGeometry();
    const points: THREE.Vector3[] = [];
    const segments = 108;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, -Math.sin(theta) * radius));
    }
    circleGeo.setFromPoints(points);
    const circleMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.5 });
    group.add(new THREE.Line(circleGeo, circleMat));

    const nakshatraDegrees = 360 / 27;
    nakshatraSpritesRef.current = [];

    for (let i = 0; i < 27; i++) {
      const angleDeg = i * nakshatraDegrees;
      const rad = (angleDeg * Math.PI) / 180;
      const innerR = radius - 1.4;
      const outerR = radius + 0.6;

      const p1 = new THREE.Vector3(Math.cos(rad) * innerR, 0, -Math.sin(rad) * innerR);
      const p2 = new THREE.Vector3(Math.cos(rad) * outerR, 0, -Math.sin(rad) * outerR);
      const tickGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const tickMat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0xf59e0b : 0x818cf8,
        transparent: true,
        opacity: i % 3 === 0 ? 0.8 : 0.45,
      });
      group.add(new THREE.Line(tickGeo, tickMat));

      const midAngleDeg = angleDeg + nakshatraDegrees / 2;
      const midRad = (midAngleDeg * Math.PI) / 180;
      const badgeR = radius + 2.0;

      const nData = VEDIC_NAKSHATRAS[i];
      if (nData) {
        const badgeTexture = createNakshatraBadgeTexture(
          i,
          nData.emoji,
          nData.name,
          nData.transliteration
        );

        const spriteMat = new THREE.SpriteMaterial({
          map: badgeTexture,
          transparent: true,
          opacity: 1.0,
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(Math.cos(midRad) * badgeR, 0.3, -Math.sin(midRad) * badgeR);
        sprite.scale.set(2.5, 2.5, 1);
        group.add(sprite);
        nakshatraSpritesRef.current.push(sprite);
      }
    }

    return group;
  };

  const createOrbitPaths = () => {
    const group = new THREE.Group();

    const makeOrbitLine = (radius: number, color: number, opacity: number) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(128).map((p) => new THREE.Vector3(p.x, 0, p.y));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineDashedMaterial({
        color,
        transparent: true,
        opacity,
        dashSize: 0.5,
        gapSize: 0.2,
      });
      const line = new THREE.Line(geometry, material);
      line.computeLineDistances();
      return line;
    };

    group.add(makeOrbitLine(orbitRadiusSun, 0xf59e0b, 0.4));
    group.add(makeOrbitLine(orbitRadiusMoon, 0x60a5fa, 0.5));
    return group;
  };

  // Initialize Scene
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const isMobile = width < 640 || width < height;
    const initialDistance = isMobile ? 38 : 26;
    const initialCamY = isMobile ? 22 : 16;

    // Persist initial camera values for speaking-mode transitions
    initialDistanceRef.current = initialDistance;
    initialCamYRef.current = initialCamY;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, initialCamY, initialDistance);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    targetCameraPosRef.current.set(0, initialCamY, initialDistance);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.setClearColor(0x060913, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    containerRef.current.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    const textureLoader = new THREE.TextureLoader();

    const earthTexture = textureLoader.load('/textures/earth.jpg');
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const earthCloudsTexture = textureLoader.load('/textures/earth_clouds.png');

    const sunTexture = textureLoader.load('/textures/sun.jpg');
    sunTexture.colorSpace = THREE.SRGBColorSpace;

    const sunProminencesTexture = textureLoader.load('/textures/sun_prominences.png');
    sunProminencesTexture.colorSpace = THREE.SRGBColorSpace;

    const moonTexture = textureLoader.load('/textures/moon.jpg');
    moonTexture.colorSpace = THREE.SRGBColorSpace;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x334155, 0.45);
    scene.add(ambientLight);

    // Directional sunlight emanating from Sun towards Earth
    const dirSunLight = new THREE.DirectionalLight(0xffecd1, 2.6);
    dirSunLight.position.set(orbitRadiusSun, 0, 0);
    scene.add(dirSunLight);
    sunlightRef.current = dirSunLight;

    // 1. Earth
    const earthTiltGroup = new THREE.Group();
    earthTiltGroup.rotation.z = (23.44 * Math.PI) / 180;
    scene.add(earthTiltGroup);
    earthTiltGroupRef.current = earthTiltGroup;

    const earthGeo = new THREE.SphereGeometry(1.6, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.05,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthTiltGroup.add(earthMesh);
    earthMeshRef.current = earthMesh;

    // Cloud Layer
    const cloudGeo = new THREE.SphereGeometry(1.63, 64, 64);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: earthCloudsTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthMesh.add(cloudMesh);
    earthCloudsRef.current = cloudMesh;

    // Atmospheric Glow
    const atmosphereGeo = new THREE.SphereGeometry(1.72, 48, 48);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    earthMesh.add(atmosphere);

    // 2. Sun
    const sunGroup = new THREE.Group();
    scene.add(sunGroup);
    sunGroupRef.current = sunGroup;

    const sunGeo = new THREE.SphereGeometry(2.2, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);
    sunMeshRef.current = sunMesh;

    const sunPointLight = new THREE.PointLight(0xffedd5, 3.4, 250, 0.45);
    sunGroup.add(sunPointLight);
    sunPointLightRef.current = sunPointLight;

    const promMat1 = new THREE.SpriteMaterial({
      map: sunProminencesTexture,
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.95,
      depthWrite: false,
    });
    const promSprite1 = new THREE.Sprite(promMat1);
    promSprite1.scale.set(4.8, 4.8, 1);
    sunGroup.add(promSprite1);
    sunProminence1Ref.current = promSprite1;

    const promMat2 = new THREE.SpriteMaterial({
      map: sunProminencesTexture,
      color: 0xffaa44,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.65,
      depthWrite: false,
      rotation: Math.PI / 4,
    });
    const promSprite2 = new THREE.Sprite(promMat2);
    promSprite2.scale.set(5.0, 5.0, 1);
    sunGroup.add(promSprite2);
    sunProminence2Ref.current = promSprite2;

    const sunGlowMat = new THREE.SpriteMaterial({
      map: createSunGlowTexture(),
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.92,
      depthWrite: false,
    });
    const sunGlow = new THREE.Sprite(sunGlowMat);
    sunGlow.scale.set(8.8, 8.8, 1);
    sunGroup.add(sunGlow);
    sunGlowRef.current = sunGlow;

    // 3. Moon
    const moonGeo = new THREE.SphereGeometry(0.65, 48, 48);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.85,
      metalness: 0.05,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    scene.add(moonMesh);
    moonMeshRef.current = moonMesh;

    // Tithi Sector Wedge
    const tithiGeo = new THREE.BufferGeometry();
    const tithiMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      depthTest: true,
    });
    const tithiMesh = new THREE.Mesh(tithiGeo, tithiMat);
    tithiMesh.renderOrder = 5;
    scene.add(tithiMesh);
    tithiSectorRef.current = tithiMesh;

    // =========================================================
    // 4. LUNAR SIGHTLINE RAY (Earth -> Moon -> Nakshatra)
    // =========================================================
    const sightlineGeo = new THREE.BufferGeometry();
    const sightlineMat = new THREE.LineDashedMaterial({
      color: 0x38bdf8,
      dashSize: 0.5,
      gapSize: 0.2,
      transparent: true,
      opacity: 0.95,
      linewidth: 2,
    });
    const sightlineBeam = new THREE.Line(sightlineGeo, sightlineMat);
    scene.add(sightlineBeam);
    sightlineBeamRef.current = sightlineBeam;

    // Active Sector Arc (Illuminated 13°20' arc along the Nakshatra ring)
    const arcGeo = new THREE.BufferGeometry();
    const arcMat = new THREE.LineBasicMaterial({
      color: 0xfbbf24,
      linewidth: 3,
      transparent: true,
      opacity: 0.95,
    });
    const activeArc = new THREE.Line(arcGeo, arcMat);
    scene.add(activeArc);
    activeSectorArcRef.current = activeArc;

    // Active Sector Boundaries (Lines radiating from origin to 13°20' boundaries)
    const boundGeo = new THREE.BufferGeometry();
    const boundMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.45,
    });
    const activeBoundaries = new THREE.LineSegments(boundGeo, boundMat);
    scene.add(activeBoundaries);
    activeSectorBoundariesRef.current = activeBoundaries;

    // Active Nakshatra Pulsing Target Beacon Halo
    const beaconMat = new THREE.SpriteMaterial({
      map: createActiveBeaconTexture(),
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const beaconSprite = new THREE.Sprite(beaconMat);
    beaconSprite.scale.set(4.2, 4.2, 1);
    scene.add(beaconSprite);
    activeNakshatraBeaconRef.current = beaconSprite;

    // Floating Label Sprite for "CURRENT NAKSHATRA"
    const labelMat = new THREE.SpriteMaterial({
      map: createActiveLabelTexture(language, panchang.nakshatra.name, panchang.nakshatra.index + 1),
      transparent: true,
      opacity: 0.98,
      depthWrite: false,
    });
    const labelSprite = new THREE.Sprite(labelMat);
    labelSprite.scale.set(5.0, 1.4, 1);
    scene.add(labelSprite);
    activeNakshatraLabelRef.current = labelSprite;

    // Floating Sightline Label Sprite
    const sightLabelMat = new THREE.SpriteMaterial({
      map: createSightlineLabelTexture(language),
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const sightLabelSprite = new THREE.Sprite(sightLabelMat);
    sightLabelSprite.scale.set(3.4, 0.65, 1);
    scene.add(sightLabelSprite);
    sightlineLabelRef.current = sightLabelSprite;

    // Nakshatra Ring
    scene.add(createNakshatraRing());

    // Orbit paths
    scene.add(createOrbitPaths());

    // Starfield
    const starCount = 2500;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const colorPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xdce6ff),
      new THREE.Color(0xffeedd),
      new THREE.Color(0xffd79e),
    ];

    for (let i = 0; i < starCount; i++) {
      const r = 120 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const brightness = 0.5 + Math.random() * 0.5;
      starColors[i * 3] = color.r * brightness;
      starColors[i * 3 + 1] = color.g * brightness;
      starColors[i * 3 + 2] = color.b * brightness;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // Pointer controls
    const domEl = renderer.domElement;

    const onPointerDown = (clientX: number, clientY: number) => {
      isDraggingRef.current = true;
      previousPointerPosRef.current = { x: clientX, y: clientY };
      rotationVelocityRef.current = { x: 0, y: 0 };
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return;
      const deltaX = clientX - previousPointerPosRef.current.x;
      const deltaY = clientY - previousPointerPosRef.current.y;
      previousPointerPosRef.current = { x: clientX, y: clientY };

      rotationVelocityRef.current = {
        x: deltaY * 0.004,
        y: deltaX * 0.004,
      };

      targetSceneRotationRef.current.y += deltaX * 0.006;
      targetSceneRotationRef.current.x += deltaY * 0.006;
      targetSceneRotationRef.current.x = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, targetSceneRotationRef.current.x));
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();

    let initialPinchDist = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2) {
        isDraggingRef.current = false;
        initialPinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2 && initialPinchDist > 0) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = (initialPinchDist - dist) * 0.08;
        initialPinchDist = dist;

        const currentDist = targetCameraPosRef.current.length();
        const newDist = Math.max(14, Math.min(55, currentDist + delta));
        targetCameraPosRef.current.setLength(newDist);
      }
    };

    const handleTouchEnd = () => {
      onPointerUp();
      initialPinchDist = 0;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.025;
      const currentDist = targetCameraPosRef.current.length();
      const newDist = Math.max(14, Math.min(55, currentDist + zoomFactor));
      targetCameraPosRef.current.setLength(newDist);
    };

    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    domEl.addEventListener('wheel', handleWheel, { passive: false });

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      // Inertia & Smooth Dragging
      if (!isDraggingRef.current) {
        targetSceneRotationRef.current.y += rotationVelocityRef.current.y;
        targetSceneRotationRef.current.x += rotationVelocityRef.current.x;
        rotationVelocityRef.current.x *= 0.92;
        rotationVelocityRef.current.y *= 0.92;
      }

      scene.rotation.y += (targetSceneRotationRef.current.y - scene.rotation.y) * 0.1;
      scene.rotation.x += (targetSceneRotationRef.current.x - scene.rotation.x) * 0.1;

      if (earthMeshRef.current) earthMeshRef.current.rotation.y += 0.0008;
      if (earthCloudsRef.current) earthCloudsRef.current.rotation.y += 0.0012;

      // Dynamic solar animation
      if (sunMeshRef.current) sunMeshRef.current.rotation.y += 0.0014;

      if (sunProminence1Ref.current) {
        sunProminence1Ref.current.material.rotation += 0.00045;
        const pulse1 = 4.8 + Math.sin(time * 2.1) * 0.11 + Math.cos(time * 3.8) * 0.05;
        sunProminence1Ref.current.scale.set(pulse1, pulse1, 1);
        sunProminence1Ref.current.material.opacity = 0.9 + Math.sin(time * 1.7) * 0.08;
      }

      if (sunProminence2Ref.current) {
        sunProminence2Ref.current.material.rotation -= 0.00035;
        const pulse2 = 5.0 + Math.cos(time * 1.9) * 0.14 + Math.sin(time * 3.1) * 0.06;
        sunProminence2Ref.current.scale.set(pulse2, pulse2, 1);
        sunProminence2Ref.current.material.opacity = 0.62 + Math.cos(time * 2.3) * 0.1;
      }

      if (sunGlowRef.current) {
        const auraPulse = 8.8 + Math.sin(time * 1.4) * 0.35;
        sunGlowRef.current.scale.set(auraPulse, auraPulse, 1);
      }

      if (sunPointLightRef.current) {
        sunPointLightRef.current.intensity = 3.4 + Math.sin(time * 2.4) * 0.25;
      }

      // Active Nakshatra Beacon Pulsing Animation
      if (activeNakshatraBeaconRef.current) {
        const beaconScale = 4.0 + Math.sin(time * 3.5) * 0.45;
        activeNakshatraBeaconRef.current.scale.set(beaconScale, beaconScale, 1);
        activeNakshatraBeaconRef.current.material.opacity = 0.75 + Math.sin(time * 3.5) * 0.25;
        activeNakshatraBeaconRef.current.material.rotation += 0.005;
      }

      // ── Camera Choreography: driven by cameraFocusRef ──
      const focus = cameraFocusRef.current;

      if (focus !== 'default') {
        wasSpeakingRef.current = true;

        if (focus === 'moon') {
          // Close fly-in near the moon's orbital region
          targetCameraPosRef.current.lerp(new THREE.Vector3(0, 5, 9), 0.04);
          targetSceneRotationRef.current.x += (0.1 - targetSceneRotationRef.current.x) * 0.04;
        } else if (focus === 'sun') {
          // Documentary angle looking across the sun
          targetCameraPosRef.current.lerp(new THREE.Vector3(15, 25, 15), 0.04);
          targetSceneRotationRef.current.x += (0.15 - targetSceneRotationRef.current.x) * 0.04;
        } else if (focus === 'nakshatra') {
          // Wide top-down view to reveal the full nakshatra ring
          targetCameraPosRef.current.lerp(new THREE.Vector3(0, 44, 4), 0.04);
          targetSceneRotationRef.current.x += (-Math.PI / 2.4 - targetSceneRotationRef.current.x) * 0.04;
        }
      } else if (wasSpeakingRef.current) {
        // Smoothly return to the default perspective after sequence ends
        const defaultPos = new THREE.Vector3(0, initialCamYRef.current, initialDistanceRef.current);
        targetCameraPosRef.current.lerp(defaultPos, 0.04);
        targetSceneRotationRef.current.x += (0.35 - targetSceneRotationRef.current.x) * 0.04;
        if (targetCameraPosRef.current.distanceTo(defaultPos) < 0.1) {
          wasSpeakingRef.current = false;
        }
      }

      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCameraPosRef.current, 0.06);
        cameraRef.current.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newWidth / newHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newWidth, newHeight);
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      domEl.removeEventListener('wheel', handleWheel);
      renderer.dispose();
    };
  }, []);

  // Keep refs in sync with props for the animation loop closure
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    cameraFocusRef.current = cameraFocus;
  }, [cameraFocus]);

  // Update Sun & Moon coordinates, Geocentric Lunar Sightline, Active Nakshatra Highlight & Sector
  useEffect(() => {
    if (!sunGroupRef.current || !moonMeshRef.current || !tithiSectorRef.current) return;

    // Use Sidereal coordinates so the Moon aligns with the fixed Nakshatra star ring!
    const sunLon = panchang.angles.sunSidereal;
    const moonLon = panchang.angles.moonSidereal;
    const relAngle = panchang.angles.relative;

    const sunRad = (sunLon * Math.PI) / 180;
    const moonRad = (moonLon * Math.PI) / 180;

    const sunX = Math.cos(sunRad) * orbitRadiusSun;
    const sunZ = -Math.sin(sunRad) * orbitRadiusSun;

    // Sun Revolution Position along the Ecliptic
    sunGroupRef.current.position.set(sunX, 0, sunZ);
    if (sunlightRef.current) {
      sunlightRef.current.position.set(sunX, 0, sunZ);
      sunlightRef.current.target.position.set(0, 0, 0);
      sunlightRef.current.target.updateMatrixWorld();
    }

    // Moon Revolution Position along its Lunar Orbit
    const moonX = Math.cos(moonRad) * orbitRadiusMoon;
    const moonZ = -Math.sin(moonRad) * orbitRadiusMoon;
    moonMeshRef.current.position.set(moonX, 0, moonZ);

    // Authentic Tidal Locking Physics (Near Side faces Earth)
    moonMeshRef.current.lookAt(0, 0, 0);

    // Diurnal axial rotation of Earth
    if (earthMeshRef.current) {
      const earthAngle = ((offsetDays || 0) * Math.PI * 2) % (Math.PI * 2);
      earthMeshRef.current.rotation.y = earthAngle;
    }
    if (earthCloudsRef.current) {
      const cloudAngle = (((offsetDays || 0) * Math.PI * 2 * 1.05) % (Math.PI * 2));
      earthCloudsRef.current.rotation.y = cloudAngle;
    }

    // =========================================================================
    // GEOCENTRIC LUNAR SIGHTLINE: Earth (0,0,0) -> Moon -> Outer Celestial Ring
    // =========================================================================
    const sightDist = nakshatraRingRadius + 4.2;
    const sightX = Math.cos(moonRad) * sightDist;
    const sightZ = -Math.sin(moonRad) * sightDist;

    if (sightlineBeamRef.current) {
      const sightPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(moonX, 0, moonZ),
        new THREE.Vector3(sightX, 0, sightZ),
      ];
      sightlineBeamRef.current.geometry.dispose();
      const sGeo = new THREE.BufferGeometry().setFromPoints(sightPoints);
      sightlineBeamRef.current.geometry = sGeo;
      sightlineBeamRef.current.computeLineDistances();
    }

    // Position Sightline label halfway between Moon and Nakshatra
    if (sightlineLabelRef.current) {
      const labelDist = orbitRadiusMoon + 5.2;
      const lx = Math.cos(moonRad) * labelDist;
      const lz = -Math.sin(moonRad) * labelDist;
      sightlineLabelRef.current.position.set(lx, 1.4, lz);
      sightlineLabelRef.current.material.map = createSightlineLabelTexture(language);
      sightlineLabelRef.current.material.needsUpdate = true;
    }

    // =========================================================================
    // ACTIVE NAKSHATRA 13°20' ARC & BOUNDARY RAYS
    // =========================================================================
    const activeIdx = panchang.nakshatra.index;
    const nakshatraDegrees = 360 / 27;
    const startDeg = activeIdx * nakshatraDegrees;
    const endDeg = (activeIdx + 1) * nakshatraDegrees;
    const midDeg = startDeg + nakshatraDegrees / 2;
    const midRad = (midDeg * Math.PI) / 180;

    // Highlighted Arc along the outer ring
    if (activeSectorArcRef.current) {
      const arcPoints: THREE.Vector3[] = [];
      const arcSegments = 24;
      for (let s = 0; s <= arcSegments; s++) {
        const deg = startDeg + (s / arcSegments) * nakshatraDegrees;
        const r = (deg * Math.PI) / 180;
        arcPoints.push(new THREE.Vector3(Math.cos(r) * (nakshatraRingRadius + 0.1), 0.2, -Math.sin(r) * (nakshatraRingRadius + 0.1)));
      }
      activeSectorArcRef.current.geometry.dispose();
      activeSectorArcRef.current.geometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
    }

    // Boundary rays from Earth to the 13°20' limits
    if (activeSectorBoundariesRef.current) {
      const r1 = (startDeg * Math.PI) / 180;
      const r2 = (endDeg * Math.PI) / 180;
      const boundPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(r1) * (nakshatraRingRadius + 2.2), 0, -Math.sin(r1) * (nakshatraRingRadius + 2.2)),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(r2) * (nakshatraRingRadius + 2.2), 0, -Math.sin(r2) * (nakshatraRingRadius + 2.2)),
      ];
      activeSectorBoundariesRef.current.geometry.dispose();
      activeSectorBoundariesRef.current.geometry = new THREE.BufferGeometry().setFromPoints(boundPoints);
    }

    // =========================================================================
    // ACTIVE NAKSHATRA TARGET BEACON & 3D LABEL
    // =========================================================================
    const badgeR = nakshatraRingRadius + 2.0;
    const badgeX = Math.cos(midRad) * badgeR;
    const badgeZ = -Math.sin(midRad) * badgeR;

    if (activeNakshatraBeaconRef.current) {
      activeNakshatraBeaconRef.current.position.set(badgeX, 0.3, badgeZ);
    }

    if (activeNakshatraLabelRef.current) {
      activeNakshatraLabelRef.current.position.set(badgeX, 2.7, badgeZ);
      const nakshatraDisplayName = language === 'hi' ? panchang.nakshatra.name : panchang.nakshatra.nameEn;
      activeNakshatraLabelRef.current.material.map = createActiveLabelTexture(language, nakshatraDisplayName, activeIdx + 1);
      activeNakshatraLabelRef.current.material.needsUpdate = true;
    }

    // Active Nakshatra Highlighting on Sprites:
    // Noticeable scale and full opacity for active nakshatra
    if (nakshatraSpritesRef.current.length === 27) {
      nakshatraSpritesRef.current.forEach((sprite, idx) => {
        if (idx === activeIdx) {
          sprite.scale.set(3.8, 3.8, 1);
          sprite.material.opacity = 1.0;
        } else {
          sprite.scale.set(2.3, 2.3, 1);
          sprite.material.opacity = 0.75;
        }
      });
    }

    // Tithi Sector Mesh (Relative elongation wedge between Sun and Moon)
    const segments = 64;
    const relAngleRad = (relAngle * Math.PI) / 180;
    const vertices: number[] = [];

    for (let i = 0; i < segments; i++) {
      const a1 = sunRad + (i / segments) * relAngleRad;
      const a2 = sunRad + ((i + 1) / segments) * relAngleRad;

      const x1 = Math.cos(a1) * (orbitRadiusSun + 0.3);
      const z1 = -Math.sin(a1) * (orbitRadiusSun + 0.3);

      const x2 = Math.cos(a2) * (orbitRadiusSun + 0.3);
      const z2 = -Math.sin(a2) * (orbitRadiusSun + 0.3);

      vertices.push(0, 0, 0);
      vertices.push(x1, 0, z1);
      vertices.push(x2, 0, z2);
    }

    tithiSectorRef.current.geometry.dispose();
    const newGeo = new THREE.BufferGeometry();
    newGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    newGeo.computeVertexNormals();
    tithiSectorRef.current.geometry = newGeo;
  }, [panchang, offsetDays, language]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div
        ref={containerRef}
        id="canvas-container"
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'none' }}
      />

      {/* Bottom info strip: shows AI subtitles during playback, static sightline label otherwise */}
      <div className="pointer-events-none absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 w-[94%] sm:w-auto max-w-lg text-center px-2 mb-[env(safe-area-inset-bottom,0px)]">
        {subtitles && isPlaying ? (
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-sky-500/30 text-xs sm:text-sm font-semibold shadow-xl text-slate-100 text-center">
            <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0 animate-pulse" />
            <span className="leading-snug">{subtitles}</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 text-xs sm:text-sm font-semibold shadow-xl text-slate-200 text-left sm:text-center">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0 animate-ping" />
            <span className="leading-snug break-words">
              {language === 'hi' ? (
                <>
                  <strong className="text-cyan-300 font-bold">दृष्टि रेखा:</strong> पृथ्वी-चन्द्रमा की सीध नक्षत्र{' '}
                  <strong className="text-amber-300 font-bold">{panchang.nakshatra.name}</strong> ({panchang.nakshatra.index + 1}वां, 13°20' क्षेत्र) के सम्मुख है
                </>
              ) : (
                <>
                  <strong className="text-cyan-300 font-bold">Lunar Sightline:</strong> Earth→Moon aligns with{' '}
                  <strong className="text-amber-300 font-bold">{panchang.nakshatra.nameEn}</strong> (#{panchang.nakshatra.index + 1}, 13°20' sector)
                </>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
