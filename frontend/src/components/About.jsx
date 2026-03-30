import { motion } from 'framer-motion';
import profileImg from '../assets/profile.png';

const About = () => {
    return (
        <section id="about" className="py-32 container">
            <div className="text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-['Orbitron'] text-4xl mb-4"
                >
                    About Me
                </motion.h2>
                <div className="w-16 h-1 bg-[#00f2fe] mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-[#8b949e] text-lg mb-6 leading-relaxed">
                        I am a passionate Machine Learning practitioner and Data Analyst dedicated to solving real-world problems through data-driven approaches. With a background in developing predictive systems for environmental risks and social dynamics, I focus on creating technology that makes a positive impact.
                    </p>
                    <p className="text-[#8b949e] text-lg mb-10 leading-relaxed">
                        My work spans from road safety prediction models to water availability analysis, always maintaining a balance between mathematical rigor and user-centric design.
                    </p>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col">
                            <span className="font-['Orbitron'] text-4xl font-black text-[#00f2fe]">5+</span>
                            <span className="text-xs uppercase tracking-widest text-[#8b949e]">ML Models</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-['Orbitron'] text-4xl font-black text-[#00f2fe]">10+</span>
                            <span className="text-xs uppercase tracking-widest text-[#8b949e]">Data Projects</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative group rounded-2xl overflow-hidden border border-white/10"
                >
                    <div className="absolute inset-0 bg-[#00f2fe]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <img
                        src={profileImg}
                        alt="Muhammad Nasir"
                        className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default About;
