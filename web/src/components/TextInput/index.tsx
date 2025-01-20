import "./index.css";

interface TextInputInterface
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    classname?: string;
}
const TextInput: React.FC<TextInputInterface> = ({ className, ...props }) => (
    <input {...props} className={`text-input ${className}`} />
);

export default TextInput;
