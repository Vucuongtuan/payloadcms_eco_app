interface SizeSelectorProps {
  sizes: any;
}

export const SizeSelector = ({ sizes }: SizeSelectorProps) => {
  const sizeOptions = [
    { key: "s", display: "S" },
    { key: "M", display: "M" },
    { key: "L", display: "L" },
    { key: "xl", display: "XL" },
    { key: "xxl", display: "XXL" },
  ];

  return (
    <div className="hidden group-hover:block absolute bottom-0 left-0 w-full h-1/12 text-xs font-medium tracking-wide">
      <div className="w-full h-full flex justify-center items-center gap-12">
        {sizeOptions.map(({ key, display }) => {
          const sizeData = (sizes as any)?.[key];
          const hasStock = sizeData?.inventory?.stock > 0;
          return (
            <span
              key={key}
              className={`text-2xl ${hasStock ? "text-white cursor-pointer" : "text-white/60 cursor-not-allowed"}`}
            >
              {display}
            </span>
          );
        })}
      </div>
    </div>
  );
};
