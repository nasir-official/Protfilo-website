import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden text-center overflow-hidden">
            <div className="z-10 px-8">
                <motion.h4
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-['Orbitron'] text-[#00f2fe] text-xs md:text-sm tracking-[4px] uppercase mb-4"
                >
                    Machine Learning Engineer & Data Analyst
                </motion.h4>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="font-['Orbitron'] text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight text-white"
                >
                    Muhammad <span className="bg-gradient-to-r from-[#00f2fe] to-[#4568dc] bg-clip-text text-transparent">Nasir</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-2xl mx-auto text-[#8b949e] text-lg mb-10 leading-relaxed"
                >
                    Transforming complex data into actionable insights and predictive models. Specializing in risk prediction and environmental analysis.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex gap-6 justify-center"
                >
                    <a
                        href="#projects"
                        className="px-8 py-3 bg-[#00f2fe] text-[#0a0e14] font-bold rounded hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all transform hover:-translate-y-1 no-underline text-xs md:text-sm uppercase tracking-widest"
                    >
                        View Projects
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 border border-[#00f2fe] text-[#00f2fe] font-bold rounded hover:bg-[#00f2fe]/10 transition-all transform hover:-translate-y-1 no-underline text-xs md:text-sm uppercase tracking-widest"
                    >
                        Get In Touch
                    </a>
                </motion.div>
            </div>

            {/* Background blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8b949e]"
            >
                <span className="text-xs uppercase tracking-widest">Scroll Down</span>
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
