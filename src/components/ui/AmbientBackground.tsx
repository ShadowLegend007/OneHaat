import React from 'react';

export const AmbientBackground: React.FC = React.memo(() => {
  return (
    <>
      {/* 3.5% Film Grain Overlay */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* Fixed Ambient Pastel Mesh Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        {/* Top-right emerald/teal blob */}
        <div
          className="absolute -top-[15%] -right-[10%] w-[650px] h-[650px] rounded-full masked-pastel-blob opacity-25"
          style={{
            background: 'radial-gradient(circle, #D1FAE5 0%, #A7F3D0 40%, rgba(255,255,255,0) 70%)',
          }}
        />

        {/* Mid-left warm amber/yellow blob */}
        <div
          className="absolute top-[35%] -left-[15%] w-[600px] h-[600px] rounded-full masked-pastel-blob opacity-20"
          style={{
            background: 'radial-gradient(circle, #FEF3C7 0%, #FDE68A 40%, rgba(255,255,255,0) 70%)',
          }}
        />

        {/* Lower-right teal/emerald blob */}
        <div
          className="absolute top-[65%] -right-[15%] w-[700px] h-[700px] rounded-full masked-pastel-blob opacity-20"
          style={{
            background: 'radial-gradient(circle, #CCFBF1 0%, #99F6E4 40%, rgba(255,255,255,0) 70%)',
          }}
        />
      </div>
    </>
  );
});

AmbientBackground.displayName = 'AmbientBackground';
