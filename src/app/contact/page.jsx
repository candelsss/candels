'use client'

import './contact.css'
import { CustomTitles } from '@/components/custom-titles/CustomTitles';
import { DropdownButton } from '@/components/buttons/DropDownButton';
import { Header } from '@/components/header/Header';
import { Button } from '@/components/buttons/Button';
import { CircleX, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import emailjs from '@emailjs/browser';



const Contact = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [webType, setWebType] = useState('');
    const [currentStage, setCurrentStage] = useState('');
    const [budget, setBudget] = useState('');

    // Estados para los dropdowns personalizados
    const [webTypeOpen, setWebTypeOpen] = useState(false);
    const [stageOpen, setStageOpen] = useState(false);
    const [budgetOpen, setBudgetOpen] = useState(false);
    const [webTypeClosing, setWebTypeClosing] = useState(false);
    const [stageClosing, setStageClosing] = useState(false);
    const [budgetClosing, setBudgetClosing] = useState(false);

    const [openForm, setOpenForm] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);



    const handleOpenForm = () => {
        setOpenForm(!openForm);
    }

    const handleCloseForm = () => {
        setIsClosing(true);
        setTimeout(() => {
            setOpenForm(false);
            setIsClosing(false);
        }, 400);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handleSubmit ejecutado');  // ← añade esto
        console.log('templateParams:', {        // ← y esto
            name, email, message, webType, currentStage, budget
        });

        const templateParams = {
            name,
            email,
            message,
            webType: webTypeOptions.find(opt => opt.value === webType)?.label || '',
            currentStage: stageOptions.find(opt => opt.value === currentStage)?.label || '',
            budget: budgetOptions.find(opt => opt.value === budget)?.label || ''
        };

        try {
            await emailjs.send(
                'service_ixtawq9',      // ← el de Gmail
                'template_0t5n2kd',     // ← tu plantilla
                templateParams,
                'E87yu09wFgGGzXjf0'       // ← Account > API Keys
            );

            setShowSuccessMessage(true);
            setName(''); setEmail(''); setMessage('');
            setWebType(''); setCurrentStage(''); setBudget('');

            setTimeout(() => {
                setShowSuccessMessage(false);
                handleCloseForm();
            }, 2000);

        } catch (error) {
            console.error('EmailJS error:', error);
            alert('Hubo un error al enviar. Inténtalo de nuevo.');
        }
    };

    // Handler functions para dropdowns con animación
    const handleWebTypeToggle = () => {
        if (webTypeOpen) {
            setWebTypeClosing(true);
            setTimeout(() => {
                setWebTypeOpen(false);
                setWebTypeClosing(false);
            }, 300);
        } else {
            setWebTypeOpen(true);
            setWebTypeClosing(false);
        }
    };

    const handleStageToggle = () => {
        if (stageOpen) {
            setStageClosing(true);
            setTimeout(() => {
                setStageOpen(false);
                setStageClosing(false);
            }, 300);
        } else {
            setStageOpen(true);
            setStageClosing(false);
        }
    };

    const handleClearForm = () => {
        setName('');
        setEmail('');
        setMessage('');
        setWebType('');
        setCurrentStage('');
        setBudget('');
    };

    const handleBudgetToggle = () => {
        if (budgetOpen) {
            setBudgetClosing(true);
            setTimeout(() => {
                setBudgetOpen(false);
                setBudgetClosing(false);
            }, 300);
        } else {
            setBudgetOpen(true);
            setBudgetClosing(false);
        }
    };

    // Opciones para los dropdowns
    const webTypeOptions = [
        { value: 'portfolio', label: 'Portfolio' },

        { value: 'blog', label: 'Blog' },
        { value: 'corporate', label: 'Web Corporativa' },
        { value: 'landing', label: 'Landing Page' },
        { value: 'other', label: 'Otro' }
    ];

    const stageOptions = [
        { value: 'idea', label: 'Solo tengo la idea' },
        { value: 'design', label: 'Tengo el diseño' },
        { value: 'content', label: 'Tengo el contenido' },
        { value: 'partial', label: 'Tengo algo avanzado' },
        { value: 'redesign', label: 'Quiero rediseñar web existente' }
    ];

    const budgetOptions = [
        { value: '500-1000', label: '500€ - 1,000€' },
        { value: '1000-2500', label: '1,000€ - 2,500€' },
        { value: '2500-5000', label: '2,500€ - 5,000€' },
        { value: '5000-10000', label: '5,000€ - 10,000€' },
        { value: '10000+', label: 'Más de 10,000€' }
    ];


    const contactOptions = [
        { value: 'mailto:hola.candels@gmail.com', label: 'EMAIL' },

        { value: 'https://www.instagram.com/candelsss__/', label: 'INSTAGRAM' },
        { value: 'https://wa.me/34654068208', label: 'WHATSAPP' }
    ]
    return (


        <>
            <Header />

            <main className="contact-main">

                <div className="contact-title">
                    <h2 className="contact-h2">Si has llegado hasta aquí,</h2>
                    <h1 className="contact-h1">hablemos :)</h1>
                </div>

                <div className="contact-content-wrapper">
                    <section className="contact-section">

                        <div className="contact-button-container">
                            <Button className="contact-btn" onClick={handleOpenForm} iconPosition='right' icon={<ArrowRight size={20} />}>
                                Iniciar proyecto
                            </Button></div>


                        {
                            openForm && (
                                <div className={`contact-form-overlay ${isClosing ? 'closing' : ''}`}>
                                    <div className={`contact-form-container ${isClosing ? 'closing' : ''}`}>
                                        <button className="close-button"
                                            onClick={handleCloseForm}></button>


                                        <div className="handle-container">
                                            <div className="close-handle" onClick={handleCloseForm}></div></div>

                                        <div className="form-title-cont">
                                            <h1 className="form-title-cont">Un buen proyecto, <br /> comienza aquí</h1>
                                            <p className="form-subtitle">Entender tus necesidades es el primer paso para construir una web con intención.</p>
                                        </div>

                                        <form className="contact-form" onSubmit={handleSubmit}>
                                            <input
                                                value={name}
                                                className='contact-input'
                                                type="text"
                                                placeholder="¿Cómo te llamas?"
                                                onChange={(e) => setName(e.target.value)}
                                            />

                                            <input
                                                value={email}
                                                className='contact-input'
                                                type="email"
                                                placeholder="¿Cuál es tu email?"
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />

                                            {/* Dropdown personalizado para tipo de web */}
                                            <div className="custom-dropdown">
                                                <div className="dropdown-input-container">
                                                    <input
                                                        type="text"
                                                        className='contact-input'
                                                        placeholder="¿Qué tipo de web necesitas?"
                                                        value={webTypeOptions.find(opt => opt.value === webType)?.label || ''}
                                                        readOnly
                                                        onClick={handleWebTypeToggle}
                                                    />
                                                    <span className={`dropdown-arrow ${webTypeOpen ? 'open' : ''}`}>
                                                        <ChevronDown size={20} />
                                                    </span>
                                                </div>
                                                {webTypeOpen && (
                                                    <div className={`dropdown-options ${webTypeClosing ? 'closing' : ''}`}>
                                                        {webTypeOptions.map((option, index) => (
                                                            <div
                                                                key={option.value}
                                                                className="dropdown-option"
                                                                style={{ animationDelay: `${index * 0.1}s` }}
                                                                onClick={() => {
                                                                    setWebType(option.value);
                                                                    setWebTypeClosing(true);
                                                                    setTimeout(() => {
                                                                        setWebTypeOpen(false);
                                                                        setWebTypeClosing(false);
                                                                    }, 300);
                                                                }}
                                                            >
                                                                {option.label}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Dropdown personalizado para etapa */}
                                            <div className="custom-dropdown">
                                                <div className="dropdown-input-container">
                                                    <input
                                                        type="text"
                                                        className='contact-input'
                                                        placeholder="¿En qué punto te encuentras?"
                                                        value={stageOptions.find(opt => opt.value === currentStage)?.label || ''}
                                                        readOnly
                                                        onClick={handleStageToggle}
                                                    />
                                                    <span className={`dropdown-arrow ${stageOpen ? 'open' : ''}`}>
                                                        <ChevronDown size={20} />
                                                    </span>
                                                </div>
                                                {stageOpen && (
                                                    <div className={`dropdown-options ${stageClosing ? 'closing' : ''}`}>
                                                        {stageOptions.map((option, index) => (
                                                            <div
                                                                key={option.value}
                                                                className="dropdown-option"
                                                                style={{ animationDelay: `${index * 0.1}s` }}
                                                                onClick={() => {
                                                                    setCurrentStage(option.value);
                                                                    setStageClosing(true);
                                                                    setTimeout(() => {
                                                                        setStageOpen(false);
                                                                        setStageClosing(false);
                                                                    }, 300);
                                                                }}
                                                            >
                                                                {option.label}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <textarea
                                                value={message}
                                                className='contact-textarea'
                                                placeholder="Breve descripción de tu proyecto"
                                                onChange={(e) => setMessage(e.target.value)}
                                            ></textarea>

                                            {/* Dropdown personalizado para presupuesto */}
                                            {/* <div className="custom-dropdown">
                                                <div className="dropdown-input-container">
                                                    <input
                                                        type="text"
                                                        className='contact-input'
                                                        placeholder="Presupuesto orientativo"
                                                        value={budgetOptions.find(opt => opt.value === budget)?.label || ''}
                                                        readOnly
                                                        onClick={handleBudgetToggle}
                                                    />
                                                    <span className={`dropdown-arrow ${budgetOpen ? 'open' : ''}`}>
                                                        <ChevronDown size={20} />
                                                    </span>
                                                </div>
                                                {budgetOpen && (
                                                    <div className={`dropdown-options ${budgetClosing ? 'closing' : ''}`}>
                                                        {budgetOptions.map((option, index) => (
                                                            <div
                                                                key={option.value}
                                                                className="dropdown-option"
                                                                style={{ animationDelay: `${index * 0.1}s` }}
                                                                onClick={() => {
                                                                    setBudget(option.value);
                                                                    setBudgetClosing(true);
                                                                    setTimeout(() => {
                                                                        setBudgetOpen(false);
                                                                        setBudgetClosing(false);
                                                                    }, 300);
                                                                }}
                                                            >
                                                                {option.label}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div> */}

                                            <div className="form-footer">
                                                <button
                                                    type="button"
                                                    className="clear-button"
                                                    onClick={handleClearForm}
                                                >
                                                    Borrar selección
                                                </button>
                                                <Button type="submit" className="submit-button">Enviar</Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )
                        }

                        {
                            showSuccessMessage && (
                                <div className="success-message">
                                    <p>Tu mensaje ha sido enviado</p>
                                </div>
                            )
                        }


                        <div className="contact-direct">

                            <div className="line-title">
                                <span className="line"></span>
                                <p className="line-p">CANALES DIRECTOS</p>
                            </div>

                            <ul className="direct-ul">
                                {
                                    contactOptions.map((option) => (
                                        <li key={option.value} className="direct-li">
                                            <p className="direct-title">{option.label}</p>
                                            <div className="direct-content">
                                                <a href={option.value} className="direct-p" target="_blank" rel="noopener noreferrer">
                                                    {option.label === 'EMAIL' ? 'hola.candels@gmail.com' :
                                                        option.label === 'INSTAGRAM' ? '@candelssss__' :
                                                            '(+34) 654 068 208'}
                                                </a>
                                                <span className="direct-icon"><ArrowUpRight size={20} /></span>
                                            </div>


                                        </li>

                                    ))
                                }

                            </ul>

                        </div>
                    </section>


                    <section className="contact-form-section">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <input
                                value={name}
                                className='contact-input'
                                type="text"
                                placeholder="¿Cómo te llamas?"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                value={email}
                                className='contact-input'
                                type="email"
                                placeholder="¿Cuál es tu email?"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            {/* Dropdown personalizado para tipo de web */}
                            <div className="custom-dropdown">
                                <div className="dropdown-input-container">
                                    <input
                                        type="text"
                                        className='contact-input'
                                        placeholder="¿Qué tipo de web necesitas?"
                                        value={webTypeOptions.find(opt => opt.value === webType)?.label || ''}
                                        readOnly
                                        onClick={handleWebTypeToggle}
                                    />
                                    <span className={`dropdown-arrow ${webTypeOpen ? 'open' : ''}`}>
                                        <ChevronDown size={20} />
                                    </span>
                                </div>
                                {webTypeOpen && (
                                    <div className={`dropdown-options ${webTypeClosing ? 'closing' : ''}`}>
                                        {webTypeOptions.map((option, index) => (
                                            <div
                                                key={option.value}
                                                className="dropdown-option"
                                                style={{ animationDelay: `${index * 0.1}s` }}
                                                onClick={() => {
                                                    setWebType(option.value);
                                                    setWebTypeClosing(true);
                                                    setTimeout(() => {
                                                        setWebTypeOpen(false);
                                                        setWebTypeClosing(false);
                                                    }, 300);
                                                }}
                                            >
                                                {option.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Dropdown personalizado para etapa */}
                            <div className="custom-dropdown">
                                <div className="dropdown-input-container">
                                    <input
                                        type="text"
                                        className='contact-input'
                                        placeholder="¿En qué punto te encuentras?"
                                        value={stageOptions.find(opt => opt.value === currentStage)?.label || ''}
                                        readOnly
                                        onClick={handleStageToggle}
                                    />
                                    <span className={`dropdown-arrow ${stageOpen ? 'open' : ''}`}>
                                        <ChevronDown size={20} />
                                    </span>
                                </div>
                                {stageOpen && (
                                    <div className={`dropdown-options ${stageClosing ? 'closing' : ''}`}>
                                        {stageOptions.map((option, index) => (
                                            <div
                                                key={option.value}
                                                className="dropdown-option"
                                                style={{ animationDelay: `${index * 0.1}s` }}
                                                onClick={() => {
                                                    setCurrentStage(option.value);
                                                    setStageClosing(true);
                                                    setTimeout(() => {
                                                        setStageOpen(false);
                                                        setStageClosing(false);
                                                    }, 300);
                                                }}
                                            >
                                                {option.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <textarea
                                value={message}
                                className='contact-textarea'
                                placeholder="Breve descripción de tu proyecto"
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>

                            {/* Dropdown personalizado para presupuesto */}
                            {/* <div className="custom-dropdown">
                                <div className="dropdown-input-container">
                                    <input
                                        type="text"
                                        className='contact-input'
                                        placeholder="Presupuesto orientativo"
                                        value={budgetOptions.find(opt => opt.value === budget)?.label || ''}
                                        readOnly
                                        onClick={handleBudgetToggle}
                                    />
                                    <span className={`dropdown-arrow ${budgetOpen ? 'open' : ''}`}>
                                        <ChevronDown size={20} />
                                    </span>
                                </div>
                                {budgetOpen && (
                                    <div className={`dropdown-options ${budgetClosing ? 'closing' : ''}`}>
                                        {budgetOptions.map((option, index) => (
                                            <div
                                                key={option.value}
                                                className="dropdown-option"
                                                style={{ animationDelay: `${index * 0.1}s` }}
                                                onClick={() => {
                                                    setBudget(option.value);
                                                    setBudgetClosing(true);
                                                    setTimeout(() => {
                                                        setBudgetOpen(false);
                                                        setBudgetClosing(false);
                                                    }, 300);
                                                }}
                                            >
                                                {option.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div> */}

                            <div className="form-footer">
                                <button
                                    type="button"
                                    className="clear-button"
                                    onClick={handleClearForm}
                                >
                                    Borrar selección
                                </button>
                                <Button type="submit" className="submit-button">Enviar</Button>
                            </div>
                        </form>
                    </section>
                </div>

            </main>


        </>
    );
}

export default Contact;
