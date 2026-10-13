import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

// 1. مصفوفة الصور بترتيب ظهورها والتوقيت بالثواني (عدلي المسارات حسب مشروعك)
const buildingSteps = [
  { id: 1, src: 'src/assets/images/1.jpg', delay: 0.5 },
  { id: 2, src: 'src/assets/images/18.jpg', delay: 2.0 },
  { id: 3, src: 'src/assets/images/42.jpg', delay: 3.5 },
  { id: 4, src: 'src/assets/images/51.jpg', delay: 5.0 },
];

// 2. تعريف أرقام الإحداثيات بشكل منفرد تماماً لتجنب مشاكل المتصفح والسيرفر
const camX = 5;
const camY = 5;
const camZ = 8;

const lightX = 10;
const lightY = 10;
const lightZ = 10;

const pLightX = -10;
const pLightY = -10;
const pLightZ = -10;

const boxWidth = 4;
const boxHeight = 0.05; // سمك اللوحة المعمارية ثلاثية الأبعاد
const boxDepth = 4;

// 3. مكون القطعة المعمارية الواحدة وطريقة تحريكها
function BuildingPart3D({ src, delay, targetY }) {
  const texture = useTexture(src);
  const meshRef = useRef();
  const [shouldStart, setShouldStart] = useState(false);

  // تشغيل المؤقت الزمني لبدء هبوط القطعة
  useEffect(() => {
    const timer = setTimeout(() => setShouldStart(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  // دالة تحديث الإطارات (Render Loop) لعمل حركة انسيابية مرنة
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (shouldStart) {
      const currentY = meshRef.current.position.y;
      
      // معادلة حركة ناعمة لتقريب الطابق لمكانه الصحيح تدريجياً (Lerp Effect)
      meshRef.current.position.y = currentY + (targetY - currentY) * 0.1;

      // زيادة الشفافية والظهور تدريجياً لتبدو القطعة ناعمة أثناء الهبوط
      if (meshRef.current.material.opacity < 1) {
        meshRef.current.material.opacity += delta * 2;
      }
    }
  });

  return (
    // نقطة البداية: تبدأ القطعة معلقة في الأعلى عند الارتفاع 6 في انتظار التوقيت
    <mesh ref={meshRef} position={[0, 6, 0]}>
      <boxGeometry args={[boxWidth, boxHeight, boxDepth]} /> 
      <meshStandardMaterial 
        map={texture} 
        transparent={true}
        opacity={0} 
        blending={2} // تأثير Multiply السحري لدمج وإخفاء الخلفيات البيضاء لصور الـ JPG
      />
    </mesh>
  );
}

// 4. المكون الرئيسي والتصدير
export default function AutoBuilding3D() {
  return (
    <div className="w-full h-screen bg-gray-950 relative">
      
      {/* مشهد الـ Canvas مع تمرير إحداثيات الكاميرا الآمنة */}
      <Canvas camera={{ position: [camX, camY, camZ], fov: 50 }}>
        
        {/* إضاءات المحيط لتبدو تفاصيل صور الـ JPG واضحة وجميلة */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[lightX, lightY, lightZ]} intensity={1.5} />
        <pointLight position={[pLightX, pLightY, pLightZ]} intensity={0.5} />

        {/* توزيع طبقات البناء هندسياً وبشكل متتالي */}
        {buildingSteps.map((step, index) => (
          <BuildingPart3D
            key={step.id}
            src={step.src}
            delay={step.delay}
            targetY={index * 0.6 - 1} // الارتفاع النهائي لكل طابق مستقر فوق الآخر
          />
        ))}

        {/* أداة التحكم بالماوس لتدوير المبنى بـ 360 درجة لمشاهدة تفاصيل الأبعاد */}
        <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} />
      </Canvas>

      {/* نصوص إرشادية للمستخدم ظاهرة فوق مشهد الـ 3D */}
      <div className="absolute top-10 w-full text-center pointer-events-none">
        <h1 className="text-white text-3xl font-extrabold tracking-wide drop-shadow-md">
          جاري تشييد المبنى الذكي تلقائياً 🏗️
        </h1>
        <p className="text-gray-400 text-sm mt-2">يمكنك سحب الشاشة بالماوس لتدوير المجسم بـ 360 درجة</p>
      </div>

    </div>
  );
}
