

interface VariantsColorProps {
    color: string,
    slug: string,
    title?: string,
    pricing?: any
}

export const VariantsColor = (props: {
    data: VariantsColorProps[]
    selectedColor?: string
    onColorSelect?: (variant: VariantsColorProps) => void
}) => {
    const { data, selectedColor, onColorSelect } = props
    
    return (
        <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500">Màu:</span>
            <div className="flex gap-1">
                {data.slice(0, 4).map((variant, idx) => (
                    <button
                        key={idx} 
                        onClick={() => onColorSelect?.(variant)}
                        className={`w-4 h-4 rounded-full border-2 shadow-sm hover:scale-110 transition-all cursor-pointer ${
                            selectedColor === variant.color 
                                ? 'border-gray-800 ring-2 ring-gray-300' 
                                : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: variant.color }}
                        title={variant.color}
                    />
                ))}
                {data.length > 4 && (
                    <span className="text-xs text-gray-400 ml-1">+{data.length - 4}</span>
                )}
            </div>
        </div>
    )
}