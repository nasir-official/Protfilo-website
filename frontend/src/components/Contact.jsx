import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
                setFormState({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error(result.error || 'Failed to send message');
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Oops! Something went wrong. Please try again.' });
            console.error('Form error:', error);
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
        }
    };

    return (
        <section id="contact" className="section container">
            <div className="section-header">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="heading-md"
                >
                    Get In Touch
                </motion.h2>
                <div className="section-divider"></div>
            </div>

            <div className="grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="contact-info"
                >
                    <h3 className="heading-sm" style={{ marginBottom: '1.5rem' }}>Connect With Me</h3>
                    <p className="subtitle">
                        Feel free to reach out for collaborations or just a friendly chat about data and AI.
                    </p>
                    
                    <div className="contact-details">
                        <div className="contact-item">
                            <i className="fas fa-envelope contact-icon"></i>
                            <span>example@email.com</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt contact-icon"></i>
                            <span>Pakistan</span>
                        </div>
                    </div>

                    <div className="social-links">
                        {['linkedin-in', 'github', 'twitter'].map((icon) => (
                            <motion.a
                                key={icon}
                                href="#"
                                className="social-link"
                            >
                                <i className={`fab fa-${icon}`}></i>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="contact-form-card"
                >
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="subject"
                                value={formState.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                value={formState.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                required
                                className="form-input form-textarea"
                            ></textarea>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary btn-submit"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>

                        <AnimatePresence>
                            {status.message && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`form-status ${status.type === 'success' ? 'text-success' : 'text-error'}`}
                                >
                                    {status.message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
