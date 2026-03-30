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
        <section id="projects" className="section container">
            <div className="section-header">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="heading-md"
                >
                    Featured Projects
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
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        variants={itemVariants}
                        className="project-card"
                    >
                        <div className="project-image-wrapper">
                            <div className="project-overlay"></div>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="project-image"
                            />
                        </div>
                        <div className="project-content">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.description}</p>
                            <div className="project-tech">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="tech-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="project-links">
                                <a href="#" className="project-link">
                                    <i className="fab fa-github"></i> Source
                                </a>
                                <a href="#" className="project-link">
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
