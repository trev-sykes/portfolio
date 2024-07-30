import { useState, useEffect, FormEvent } from 'react';
import styles from './Contact.module.css'; // Ensure you create this CSS file

interface Contact {
    onClose: () => void;
}

const ContactPopup: React.FC<Contact> = ({ onClose }) => {
    const [from_name, setFrom_Name] = useState<string>('');
    const [phone_Number, setPhone_Number] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [sending, setSending] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState<boolean>(true); // Popup visibility state

    useEffect(() => {
        if (!visible) {
            const timer = setTimeout(() => onClose(), 500); // Match timeout with transition duration
            return () => clearTimeout(timer); // Cleanup timeout on component unmount
        }
    }, [visible, onClose]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSending(true);
        setSuccess(false);
        setError(null);

        try {
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: 'service_sok07xr', // Replace with your EmailJS service ID
                    template_id: 'template_fg95aqn', // Replace with your EmailJS template ID
                    user_id: 'ekj6CdZg1bJfloucD', // Replace with your EmailJS user ID
                    template_params: {
                        from_name,
                        phone_Number,
                        email,
                        message,
                        // Add other template parameters as needed
                    },
                }),
            });

            const responseText = await response.text();

            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (e) {
                console.error('Error parsing response as JSON:', e);
                responseData = responseText; // fallback to text response
            }

            if (response.ok) {
                setSuccess(true);
                setFrom_Name('');
                setPhone_Number('');
                setEmail('');
                setMessage('');

                // Close the popup after a short delay to let the success message show
                setTimeout(() => {
                    setVisible(false);
                }, 2000);
            } else {
                const errorMessage = responseData?.message || 'Failed to send message';
                console.error('Error response:', responseData);
                setError(errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className={`${styles.overlay} ${visible ? styles.visible : ''}`}>
            <div className={styles.popup}>
                <button className={styles.close} onClick={() => setVisible(false)}>×</button>
                {!success ? (
                    <>
                        <h2 className={styles.header}>Lessen the Space - Let's Connect</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={from_name}
                                onChange={(e) => setFrom_Name(e.target.value)}
                                placeholder="Full Name"
                                required
                            />
                            <input
                                type="text"
                                value={phone_Number}
                                onChange={(e) => setPhone_Number(e.target.value)}
                                placeholder="Phone Number"
                                required
                            />
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                required
                            />
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Please be nice..."
                                rows={4}
                                required
                            />
                            <button type="submit" disabled={sending} className={styles.button}>
                                {sending ? 'Sending...' : 'Send'}
                            </button>
                            {error && <p className={styles.error}>{error}</p>}
                        </form>
                    </>
                ) : (
                    <p className={styles.success}>Message sent!</p>
                )}
            </div>
        </div>
    );
};

export default ContactPopup;
