'use client';

import './inicio.css';
import { CircleChevronRight } from 'lucide-react';
import Link from 'next/link';
import { CountUp } from '@/components/counter/Counter';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Inicio() {
    const logoContainerRef = useRef(null);

    useLayoutEffect(() => {
        if (!logoContainerRef.current) return;

        // Verificar si la animación ya se ejecutó en esta sesión
        const animationPlayed = sessionStorage.getItem('logo-animation-played');
        if (animationPlayed) {
            // Si ya se ejecutó, mostrar el estado final directamente
            logoContainerRef.current?.classList.add('rotate-a', 'rotate-d');

            // Mostrar el botón de entrar inmediatamente
            const q = gsap.utils.selector(logoContainerRef);
            const enterCta = q('.logo-enter-cta');
            gsap.set(enterCta, { autoAlpha: 1, y: 0 });

            return;
        }

        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(logoContainerRef);

            const leftDot = q('.logo-edge-dot--left');
            const rightDot = q('.logo-edge-dot--right');
            const letters = q('.logo-letter');
            const aDots = q('.dot.letter-a');
            const dDots = q('.dot.letter-d');
            const enterCta = q('.logo-enter-cta');

            gsap.set([leftDot, rightDot], { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%' });
            gsap.set(letters, { autoAlpha: 0, y: 14, scaleY: 0.02, transformOrigin: '50% 100%' });

            gsap.set(enterCta, { autoAlpha: 0, y: 10 });

            // Importante: NO tocamos transform de los dots para no pisar el rotate() del CSS.
            gsap.set([aDots, dDots], { autoAlpha: 0 });

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.to(leftDot, { autoAlpha: 1, scale: 1, duration: 0.22 })
                .to(rightDot, { autoAlpha: 1, scale: 1, duration: 0.22 }, '+=0.06')
                .to(letters, {
                    autoAlpha: 1,
                    y: 0,
                    scaleY: 1,
                    duration: 0.3,
                    stagger: {
                        each: 0.05,
                        from: "random"
                    }
                }, '+=0.14')
                .to(aDots, { autoAlpha: 1, duration: 0.14, stagger: 0.09 }, '+=0.08')
                .add(() => {
                    logoContainerRef.current?.classList.add('rotate-a');
                })
                .to(dDots, { autoAlpha: 1, duration: 0.14, stagger: 0.09 }, '+=0.16')
                .add(() => {
                    logoContainerRef.current?.classList.add('rotate-d');
                })
                .to(enterCta, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power3.out' }, '+=0.1')
                .add(() => {
                    // Marcar que la animación se ha ejecutado
                    sessionStorage.setItem('logo-animation-played', 'true');
                });
        }, logoContainerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>


            <main className='main'>

                <div className='logo-container' ref={logoContainerRef}>
                    <svg width="367" height="59" viewBox="0 0 367 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle className="logo-edge-dot logo-edge-dot--left" cx="4.50209" cy="29.1552" r="4.50209" fill="#333333" />
                        <path className="logo-letter" d="M54.511 1.8038C25.7557 -3.20763 17.5251 17.1574 17.0041 27.9664L38.6227 27.9664C51.1249 26.4924 54.4242 9.91052 54.511 1.8038Z" fill="#333333" stroke="#333333" strokeWidth="0.521961" />
                        <path className="logo-letter" d="M54.511 56.5065C25.7557 61.5179 17.5251 41.1529 17.0042 30.3439L38.6227 30.3439C51.1249 31.8179 54.4242 48.3998 54.511 56.5065Z" fill="#333333" stroke="#333333" strokeWidth="0.521961" />
                        <path className="logo-letter" d="M66.861 6.07632C56.9564 15.3368 56.8052 43.6784 58.0557 56.8865H79.4407V37.2971C84.2429 56.5303 94.4476 58.3705 98.9497 56.8865C101.752 -3.27299 78.1162 -4.44694 66.861 6.07632Z" fill="#333333" />
                        <ellipse className="dot letter-a dot-1" cx="75.4171" cy="19.8486" rx="3.90613" ry="3.82464" fill="#F6F5F0" />
                        <ellipse className="dot letter-a dot-2" cx="81.2765" cy="19.8486" rx="3.90613" ry="3.82464" fill="#F6F5F0" />
                        <ellipse className="dot letter-a dot-3" cx="81.2765" cy="25.1073" rx="3.90613" ry="3.82464" fill="#F6F5F0" />
                        <ellipse className="dot letter-a dot-4" cx="75.4171" cy="25.1073" rx="3.90613" ry="3.82464" fill="#F6F5F0" />
                        <rect className="logo-letter" x="102.179" y="1.02393" width="15.7573" height="56.2624" rx="2" fill="#333333" />
                        <path className="logo-letter" d="M119.074 3.02392C119.074 1.91935 119.97 1.02393 121.074 1.02393H124.327C132.615 1.02393 139.334 7.74277 139.334 16.0309V57.041H121.074C119.97 57.041 119.074 56.1455 119.074 55.041V3.02392Z" fill="#333333" />
                        <rect className="logo-letter" x="142.334" y="1.02393" width="16" height="56" rx="2.85121" fill="#333333" />
                        <ellipse className="logo-letter" cx="168.423" cy="29.1551" rx="25.5" ry="28.1312" fill="#333333" />
                        <ellipse className="dot letter-d dot-1" cx="165.156" cy="27.4958" rx="3.90613" ry="3.77434" fill="#F6F5F0" />
                        <ellipse className="dot letter-d dot-2" cx="171.015" cy="27.4958" rx="3.90613" ry="3.77434" fill="#F6F5F0" />
                        <ellipse className="dot letter-d dot-3" cx="171.015" cy="32.6855" rx="3.90613" ry="3.77434" fill="#F6F5F0" />
                        <ellipse className="dot letter-d dot-4" cx="165.156" cy="32.6855" rx="3.90613" ry="3.77434" fill="#F6F5F0" />
                        <path className="logo-letter" d="M209.206 1.02393H241.471V17.3582H218.21C214.693 17.3582 214.318 22.3492 218.21 22.3492H241.471V36.8685H218.21C222.947 43.6745 232.466 42.1621 241.471 40.4984V57.2864H209.206C193.683 57.2864 196.2 36.2636 199.076 28.2477C193.073 10.0985 203.813 1.02393 209.206 1.02393Z" fill="#333333" stroke="#333333" strokeWidth="0.750348" />
                        <path className="logo-letter" d="M266.859 57.2864C271.148 14.1518 253.72 1.80535 244.47 1.02393L244.47 33.453C245.732 52.2071 259.922 57.1561 266.859 57.2864Z" fill="#333333" stroke="#333333" strokeWidth="0.616863" />
                        <path className="logo-letter" d="M291.913 29.6667C273.113 32.1218 267.822 49.1029 267.527 57.2865H291.913V29.6667Z" fill="#333333" stroke="#333333" strokeWidth="0.886775" />
                        <path className="logo-letter" d="M319.917 2.10779C295.258 3.04235 294.69 22.8193 296.267 29.674L329.803 28.403C348.287 27.7024 348.795 8.25697 348.521 1.02369L319.917 2.10779Z" fill="#333333" stroke="#333333" strokeWidth="1.97413" />
                        <path className="logo-letter" d="M319.935 30.6355C295.258 30.6355 293.942 50.3768 295.258 57.2862H328.818C347.316 57.2862 348.56 37.874 348.56 30.6355H319.935Z" fill="#333333" stroke="#333333" strokeWidth="1.97413" />
                        <circle className="logo-edge-dot logo-edge-dot--right" cx="362.033" cy="29.1552" r="4.50209" fill="#333333" />
                    </svg>


                    <Link href="/portfolio" className="nav-link logo-enter-cta">
                        <CircleChevronRight size={32} />
                    </Link>
                </div>

            </main>

        </>
    );
}
