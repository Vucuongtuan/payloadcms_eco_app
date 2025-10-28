import Image from "next/image";

export function LogoIcon(props: {
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
}) {
  const { className, width, height, fill } = props;

  return (
    <Image
      src="/img/Header_B.svg"
      alt="Logo"
      {...(fill
        ? { fill: fill }
        : { width: width || 400, height: height || 94 })}
      className={className}
    />
  );
}
