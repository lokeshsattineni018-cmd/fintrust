export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden bg-[#f1f0ee]">
      <div className="absolute -left-[20%] top-[-10%] h-[50vh] w-[50vh] rounded-full bg-emerald-400/15 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[45vh] w-[45vh] rounded-full bg-indigo-400/10 blur-[100px]" />
    </div>
  );
}
