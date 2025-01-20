import "./index.css";

const TextInput: React.FC<
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >
> = ({ ...props }) => <input {...props} className="text-input" />;

export default TextInput;
