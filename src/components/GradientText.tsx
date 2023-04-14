export default function GradientText() {
  return (
    <div className="flex justify-center rounded-md bg-black/50 p-8 backdrop-blur-xl">
      <h1
        className={`bg-gradient-to-r from-[] to-[] bg-clip-text
        text-center text-6xl font-bold text-transparent`}
      >
        Gradient
      </h1>
    </div>
  );
}
