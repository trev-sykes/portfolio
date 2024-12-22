import { Copy } from 'lucide-react';

interface CodeBlockFormatterProps {
    code: string;
    language: string;
}

const CodeBlockFormatter: React.FC<CodeBlockFormatterProps> = ({ code, language }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className="relative my-4 rounded-lg bg-gray-900 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                <span className="text-sm text-gray-400">{language}</span>
                <button
                    onClick={copyToClipboard}
                    className="p-1 rounded hover:bg-gray-700 transition-colors"
                    title="Copy code"
                >
                    <Copy className="h-4 w-4 text-gray-400" />
                </button>
            </div>
            <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-gray-300 font-mono">{code}</code>
            </pre>
        </div>
    );
};

export default CodeBlockFormatter;
