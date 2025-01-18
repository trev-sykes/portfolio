import { useState, useEffect, FormEvent } from 'react';
import { Minimize2 } from 'lucide-react';
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
    const [visible, setVisible] = useState<boolean>(false); // Popup visibility state
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    useEffect(() => {
        const img = new Image();
        img.src = '../../assets/pop-up.jpg'; // Path to your background image

        img.onload = () => {
            setImageLoaded(true);
        };

        img.onerror = () => {
            setImageLoaded(true); // Handle errors by still updating the state
        };

        return () => {
            // Cleanup
            img.onload = null;
            img.onerror = null;
        };
    }, []);

    useEffect(() => {
        if (imageLoaded) {
            setVisible(true); // Show popup once image is loaded
        }
    }, [imageLoaded]);

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

        // Ensure at least one of phone number or email is provided
        if (!phone_Number && !email) {
            setError('Please provide either a phone number or an email address.');
            setSending(false);
            return;
        }

        try {
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: 'service_sok07xr', // Replace with your EmailJS service ID
                    template_id: 'template_r04awcu', // Replace with your EmailJS template ID
                    user_id: 'ekj6CdZg1bJfloucD', // Replace with your EmailJS user ID
                    template_params: {
                        from_name,
                        phone_Number,
                        email,
                        message,
                    },
                }),
            });

            const responseText = await response.text();

            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (e) {
                console.error('Error parsing response as JSON:', e);
                responseData = responseText; // Fallback to text response
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
                {/* <button className={styles.close} onClick={() => setVisible(false)}>×</button> */}
                <Minimize2 className={styles.close} onClick={() => setVisible(false)} />
                {!success ? (
                    <>
                        <h2 className={styles.header}>Get In Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Your Name</label>
                            <input
                                name='name'
                                type="text"
                                value={from_name}
                                onChange={(e) => setFrom_Name(e.target.value)}
                                placeholder="Your name..."
                                required
                            />
                            <div className={styles.options}>
                                <label htmlFor="phone">Your Number</label>
                                <input
                                    name='phone'
                                    type="text"
                                    value={phone_Number}
                                    onChange={(e) => setPhone_Number(e.target.value)}
                                    placeholder="369-369-3693"
                                />
                                <h4 className={styles.optionsTitle}>Or</h4>
                                <label htmlFor="email"> Your Email</label>
                                <input
                                    name='email'
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Example@aol.com"
                                />
                            </div>
                            <label htmlFor="inquires">Your Message</label>
                            <textarea
                                name='inquiries'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="This is placeholder text..."
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
