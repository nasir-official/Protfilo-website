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
        <section id="skills" className="section skills-container">
            <div className="container">
                <div className="section-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="heading-md"
                    >
                        Technical Skills
                    </motion.h2>
                    <div className="section-divider"></div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid-cols-3"
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={itemVariants}
                            className="skill-card"
                        >
                            <h3 className="skill-title">{category.title}</h3>
                            <div className="skill-tags">
                                {category.skills.map((skill) => (
                                    <span key={skill} className="tag">
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
