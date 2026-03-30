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
        <section id="contact" className="py-32 container">
            <div className="text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-['Orbitron'] text-4xl mb-4 text-white"
                >
                    Get In Touch
                </motion.h2>
                <div className="w-16 h-1 bg-[#00f2fe] mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center"
                >
                    <h3 className="font-['Orbitron'] text-2xl mb-6 text-white">Connect With Me</h3>
                    <p className="text-[#8b949e] text-lg mb-10 leading-relaxed">
                        Feel free to reach out for collaborations or just a friendly chat about data and AI.
                    </p>
                    
                    <div className="flex flex-col gap-6 mb-10">
                        <div className="flex items-center gap-4 text-[#8b949e]">
                            <i className="fas fa-envelope text-[#00f2fe] text-xl"></i>
                            <span>example@email.com</span>
                        </div>
                        <div className="flex items-center gap-4 text-[#8b949e]">
                            <i className="fas fa-map-marker-alt text-[#00f2fe] text-xl"></i>
                            <span>Pakistan</span>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        {['linkedin-in', 'github', 'twitter'].map((icon) => (
                            <motion.a
                                key={icon}
                                href="#"
                                whileHover={{ y: -5, color: '#00f2fe' }}
                                className="text-2xl text-white transition-colors"
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
                    className="glass-card p-10 md:p-14"
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#00f2fe] transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                type="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                                className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#00f2fe] transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                name="subject"
                                value={formState.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                required
                                className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#00f2fe] transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <textarea
                                name="message"
                                value={formState.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                required
                                className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#00f2fe] transition-all h-40 resize-none"
                            ></textarea>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-[#00f2fe] text-[#0a0e14] font-bold rounded uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>

                        <AnimatePresence>
                            {status.message && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`text-center py-2 text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
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
