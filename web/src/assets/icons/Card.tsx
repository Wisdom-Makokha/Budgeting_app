const Card = (
    {
        // width,
        // height,
        // color,
    }: {
        width?: string;
        height?: string;
        color?: string;
    },
) => (
    <svg
        width="50"
        height="26"
        viewBox="0 0 50 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <ellipse cx="16.5" cy="13" rx="16.5" ry="12.5" fill="#F41919" />
        <ellipse cx="33.5" cy="13" rx="16.5" ry="12.5" fill="#FF8A00" />
    </svg>
);

export default Card;
