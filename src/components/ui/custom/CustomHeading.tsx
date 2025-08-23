interface HeadingI {
  label: string;
}

export default function CustomHeading({ label }: HeadingI) {
  return <h1 className="text-white font-bold text-7xl">{label}</h1>;
}
