import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="hero">
            <div className="container hero-content">
                <motion.h4
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overline"
                >
                    Machine Learning Engineer & Data Analyst
                </motion.h4>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="heading-lg"
                >
                    Muhammad <span className="text-gradient">Nasir</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="subtitle"
                >
                    Transforming complex data into actionable insights and predictive models. Specializing in risk prediction and environmental analysis.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="hero-actions"
                >
                    <a href="#projects" className="btn btn-primary">
                        View Projects
                    </a>
                    <a href="#contact" className="btn btn-outline">
                        Get In Touch
                    </a>
                </motion.div>
            </div>

            {/* Background blobs */}
            <div className="blob-container">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="scroll-indicator"
            >
                <span>Scroll Down</span>
                <motion.i 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="fas fa-chevron-down"
                ></motion.i>
            </motion.div>
        </section>
    );
};

export default Hero;
