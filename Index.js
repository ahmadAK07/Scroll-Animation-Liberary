document.addEventListener("DOMContentLoaded", () => {
    
    const elementsInView = new Set(); // Define the Set to track elements in view

    function setupObserver(elements, animationClass) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        elementsInView.add({ element: entry.target, animationClass }); // Track elements with their animation class
                    } else {
                        entry.target.classList.remove(animationClass); // Remove animation class when exiting view
                        elementsInView.forEach(item => {
                            if (item.element === entry.target) {
                                elementsInView.delete(item); // Remove from set when exiting
                            }
                        });
                    }
                });
            },
            { threshold: 0.5 }
        );

        elements.forEach((element) => observer.observe(element));
    }


    
    window.addEventListener('scroll', () => {
        elementsInView.forEach(({ element, animationClass }) => {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight - 50) {
                // Apply animation class when element has scrolled 100px within the view
                element.classList.add(animationClass);
            }
        });
    });


    let animatedComps = document.querySelectorAll(".animated-comp");

    setupObserver(animatedComps, "animate");

})