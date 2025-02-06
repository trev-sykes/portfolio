import { Copy } from 'lucide-react';
import styles from './CodeBlockFormatter.module.css';

interface CodeBlockFormatterProps {
    code: string;
    language: string;
}

const CodeBlockFormatter: React.FC<CodeBlockFormatterProps> = ({ code, language }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.language}>{language}</span>
                <button
                    onClick={copyToClipboard}
                    className={styles.button}
                    title="Copy code"
                >
                    <Copy className="h-4 w-4" />
                </button>
            </div>
            <div className={styles.codeWrapper}>
                <pre>
                    <code className={styles.code}>{code}</code>
                </pre>
            </div>
        </div>
    );
};

export default CodeBlockFormatter;
