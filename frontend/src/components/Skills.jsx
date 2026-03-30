import { motion } from 'framer-motion';

const Skills = () => {
    const categories = [
        {
            title: 'Machine Learning',
            skills: ['Supervised Learning', 'Random Forest', 'XGBoost', 'Neural Networks', 'NLP']
        },
        {
            title: 'Data Science',
            skills: ['Python (Pandas, Numpy)', 'Data Visualization', 'Feature Engineering', 'Statistical Analysis']
        },
        {
            title: 'Backend & Tools',
            skills: ['Flask', 'SQLAlchemy', 'Git', 'Scikit-learn']
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="py-32 bg-[#161b22]/50">
            <div className="container">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-['Orbitron'] text-4xl mb-4 text-white"
                    >
                        Technical Skills
                    </motion.h2>
                    <div className="w-16 h-1 bg-[#00f2fe] mx-auto rounded-full"></div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="bg-[#161b22] p-10 rounded-2xl border border-white/5 hover:border-[#00f2fe]/30 transition-colors"
                        >
                            <h3 className="font-['Orbitron'] text-[#00f2fe] text-lg mb-8 uppercase tracking-widest">{category.title}</h3>
                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 bg-white/5 rounded-full text-xs text-[#8b949e] border border-white/10 hover:border-[#00f2fe]/30 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
