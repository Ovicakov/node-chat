export default function health() {
  return () => {
    return { status: "ok" };
  };
}
