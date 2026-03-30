import { motion } from 'framer-motion';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: 'Road Accident Predictor',
            description: 'An ML-based system to predict accident risk scores based on environmental and temporal features.',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
            tags: ['Python', 'ML', 'Flask']
        },
        {
            id: 2,
            title: 'Landslide Risk Prediction',
            description: 'Real-time risk assessment model for landslide-prone areas using environmental sensor data.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
            tags: ['Data Science', 'GIS', 'XGBoost']
        },
        {
            id: 3,
            title: 'Water Availability Predictor',
            description: 'Predictive analysis tool to estimate future water resources based on historical consumption patterns.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
            tags: ['Time-Series', 'Analysis', 'Matplotlib']
        },
        {
            id: 4,
            title: 'Student Dropout Predictor',
            description: 'Predicting academic performance and dropout risk using educational data mining techniques.',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
            tags: ['Education', 'Classification', 'Pandas']
        },
        {
            id: 5,
            title: 'Tourist Demand Predict',
            description: 'Forecasting tourism trends and demand for localized areas using seasonal and historical data.',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800',
            tags: ['Forecasting', 'Tourism', 'Data Analysis']
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0 }
    };

    return (
        <section id="projects" className="py-32 container">
            <div className="text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-['Orbitron'] text-4xl mb-4 text-white"
                >
                    Featured Projects
                </motion.h2>
                <div className="w-16 h-1 bg-[#00f2fe] mx-auto rounded-full"></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        variants={itemVariants}
                        whileHover={{ y: -12 }}
                        className="bg-[#161b22]/70 rounded-2xl overflow-hidden border border-white/10 hover:border-[#00f2fe]/40 transition-all group"
                    >
                        <div className="h-60 overflow-hidden relative">
                            <div className="absolute inset-0 bg-[#00f2fe]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="p-8">
                            <h3 className="font-['Orbitron'] text-xl mb-4 text-white group-hover:text-[#00f2fe] transition-colors">{project.title}</h3>
                            <p className="text-[#8b949e] text-sm mb-6 leading-relaxed flex-grow">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="text-[10px] uppercase font-bold text-[#00f2fe] bg-[#00f2fe]/10 px-3 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-6">
                                <a href="#" className="text-white text-xs uppercase tracking-widest no-underline flex items-center gap-2 hover:text-[#00f2fe] transition-colors">
                                    <i className="fab fa-github"></i> Source
                                </a>
                                <a href="#" className="text-white text-xs uppercase tracking-widest no-underline flex items-center gap-2 hover:text-[#00f2fe] transition-colors">
                                    <i className="fas fa-external-link-alt"></i> Live Demo
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Projects;
