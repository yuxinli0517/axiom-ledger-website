// src/components/Background.tsx

const Background = () => {
  return (
    <>
      {/* 基础背景色 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -20,
          background: 'linear-gradient(180deg, #FDFCFB 0%, #F7F6F3 50%, #F3F2EF 100%)',
        }}
      />

      {/* 细腻噪点纹理层 - 高级纸张质感 */}
      <svg style={{ position: 'fixed', width: 0, height: 0 }}>
        <defs>
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -15,
          opacity: 0.035,
          filter: 'url(#grain)',
          pointerEvents: 'none',
        }}
      />

      {/* 微妙的光影层 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -10,
          background: `
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.8) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 0% 80%, rgba(247,246,243,0.5) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* 边缘微暗 vignette 效果 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -5,
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.015) 100%)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
};

export default Background;