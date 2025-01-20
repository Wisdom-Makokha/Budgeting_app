import "./index.css";

interface ButtonInterface
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className: string;
}

const Button: React.FC<ButtonInterface> = ({
    children,
    className,
    ...props
}) => {
    return (
        <button className={`${className} base-button`} {...props}>
            {children}
        </button>
    );
};

export default Button;
