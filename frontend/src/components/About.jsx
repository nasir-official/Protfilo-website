import { motion } from 'framer-motion';
import profileImg from '../assets/profile.png';

const About = () => {
    return (
        <section id="about" className="section container">
            <div className="section-header">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="heading-md"
                >
                    About Me
                </motion.h2>
                <div className="section-divider"></div>
            </div>

            <div className="grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="subtitle" style={{ marginBottom: '1.5rem' }}>
                        I am a passionate Machine Learning practitioner and Data Analyst dedicated to solving real-world problems through data-driven approaches. With a background in developing predictive systems for environmental risks and social dynamics, I focus on creating technology that makes a positive impact.
                    </p>
                    <p className="subtitle">
                        My work spans from road safety prediction models to water availability analysis, always maintaining a balance between mathematical rigor and user-centric design.
                    </p>

                    <div className="about-stats">
                        <div className="stat-box">
                            <span className="stat-number">5+</span>
                            <span className="stat-label">ML Models</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Data Projects</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="about-image"
                >
                    <img
                        src={profileImg}
                        alt="Muhammad Nasir"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default About;
