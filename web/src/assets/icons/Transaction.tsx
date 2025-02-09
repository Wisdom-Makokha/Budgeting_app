const Transaction = ({
    width,
    height,
    color,
}: {
    width?: string;
    height?: string;
    color?: string;
}) => (
    <svg
        width={width ?? "30"}
        height={height ?? "30"}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M2.5 8.75H25M20 2.5L26.25 8.75L20 15M27.5 21.25H5M10 15L3.75 21.25L10 27.5"
            stroke={color ?? "#767676"}
            stroke-width="3"
        />
    </svg>
);

export default Transaction;
