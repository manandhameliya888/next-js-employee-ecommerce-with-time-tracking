export default function Loading() {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div
          className="w-12 aspect-square rounded-full animate-[spin_1s_linear_infinite]"
          style={{
            background: `
              radial-gradient(farthest-side, #7c3aed 94%, transparent) top/8px 8px no-repeat,
              conic-gradient(transparent 30%, #7c3aed)`,
            WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)`,
            mask: `radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)`,
          }}
        ></div>
      </div>
    );
  }
