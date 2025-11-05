// Datos de los ejercicios
const exercises = [
    {
        area: "Gastronomía",
        description: "Construye un prompt efectivo para obtener información sobre técnicas culinarias.",
        fragments: [
            { text: "Actúa como un chef experto en gastronomía mediterránea", correct: "role" },
            { text: "Crea una receta sobre la paella original", correct: "task" },
            { text: "Utiliza formato de receta profesional: (ingredientes + pasos numerados)", correct: "format" },
            { text: "Para nuevos emprendedores en el mundo gastronómico", correct: "context" }
        ]
    },
    {
        area: "Ventas",
        description: "Construye un prompt para mejorar las técnicas de ventas de un equipo comercial.",
        fragments: [
            { text: "Eres un director de ventas con 15 años de experiencia", correct: "role" },
            { text: "Desarrolla un plan de 30 días para aumentar las ventas", correct: "task" },
            { text: "Presenta la información en una tabla con fechas y responsables", correct: "format" },
            { text: "Para un equipo de 10 vendedores en el sector tecnológico", correct: "context" }
        ]
    },
    {
        area: "Educación",
        description: "Construye un prompt para crear material educativo sobre historia universal.",
        fragments: [
            { text: "Eres un profesor de historia especializado en la Edad Media", correct: "role" },
            { text: "Diseña una lección interactiva sobre las Cruzadas", correct: "task" },
            { text: "Incluye una línea de tiempo, personajes clave y actividades", correct: "format" },
            { text: "Para estudiantes de primer año de universidad", correct: "context" }
        ]
    },
    {
        area: "Productividad",
        description: "Construye un prompt para optimizar la gestión del tiempo en una empresa.",
        fragments: [
            { text: "Actúa como un consultor de productividad empresarial", correct: "role" },
            { text: "Identifica 5 técnicas para reducir reuniones innecesarias", correct: "task" },
            { text: "Proporciona una lista numerada con explicaciones detalladas", correct: "format" },
            { text: "Para una startup con 25 empleados en crecimiento rápido", correct: "context" }
        ]
    },
    {
        area: "Marketing Digital",
        description: "Construye un prompt para desarrollar una estrategia de redes sociales.",
        fragments: [
            { text: "Eres un especialista en marketing digital con foco en Instagram", correct: "role" },
            { text: "Crea un calendario de contenidos para los próximos 3 meses", correct: "task" },
            { text: "Organiza por semanas con temas, formatos y hashtags sugeridos", correct: "format" },
            { text: "Para una marca de ropa sostenible dirigida a millennials", correct: "context" }
        ]
    },
    {
        area: "Diseño Web",
        description: "Construye un prompt para mejorar la experiencia de usuario en un sitio web.",
        fragments: [
            { text: "Eres un diseñador UX/UI con certificación en accesibilidad", correct: "role" },
            { text: "Propón mejoras para la navegación de un sitio de e-commerce", correct: "task" },
            { text: "Describe cada mejora con justificación y ejemplos visuales", correct: "format" },
            { text: "Para un sitio con alta tasa de abandono en el carrito de compra", correct: "context" }
        ]
    },
    // NUEVOS EJERCICIOS AGREGADOS
    {
        area: "Salud y Bienestar",
        description: "Construye un prompt para crear un plan de ejercicios personalizado.",
        fragments: [
            { text: "Eres un entrenador personal certificado con especialización en fitness", correct: "role" },
            { text: "Diseña una rutina de ejercicios para mejorar la resistencia cardiovascular", correct: "task" },
            { text: "Proporciona una tabla semanal con ejercicios, series y repeticiones", correct: "format" },
            { text: "Para una persona de 35 años que trabaja en oficina y tiene poco tiempo", correct: "context" }
        ]
    },
    {
        area: "Tecnología",
        description: "Construye un prompt para explicar conceptos de programación avanzada.",
        fragments: [
            { text: "Actúa como un ingeniero de software senior especializado en Python", correct: "role" },
            { text: "Explica los principios de la programación orientada a objetos", correct: "task" },
            { text: "Usa analogías de la vida real y ejemplos de código prácticos", correct: "format" },
            { text: "Para estudiantes de bootcamp que están comenzando en programación", correct: "context" }
        ]
    },
    {
        area: "Finanzas Personales",
        description: "Construye un prompt para crear un plan de ahorro e inversión.",
        fragments: [
            { text: "Eres un asesor financiero con experiencia en planificación patrimonial", correct: "role" },
            { text: "Desarrolla una estrategia de inversión a 5 años con diversificación", correct: "task" },
            { text: "Presenta un plan paso a paso con porcentajes y instrumentos financieros", correct: "format" },
            { text: "Para jóvenes profesionales que quieren comenzar a invertir", correct: "context" }
        ]
    },
    {
        area: "Recursos Humanos",
        description: "Construye un prompt para mejorar procesos de reclutamiento.",
        fragments: [
            { text: "Actúa como un headhunter especializado en talento tecnológico", correct: "role" },
            { text: "Crea un proceso de selección para puestos de desarrollador full-stack", correct: "task" },
            { text: "Diseña etapas con pruebas técnicas, entrevistas y criterios de evaluación", correct: "format" },
            { text: "Para una empresa de scale-up que necesita crecer su equipo rápidamente", correct: "context" }
        ]
    }
];

// Función para mezclar un array (algoritmo Fisher-Yates)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const fragmentsList = document.getElementById('fragments-list');
    const components = document.querySelectorAll('.component');
    const verifyBtn = document.getElementById('verify-btn');
    const nextBtn = document.getElementById('next-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultDiv = document.getElementById('result');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const exerciseArea = document.getElementById('exercise-area');
    const exerciseDescription = document.getElementById('exercise-description');
    const completedPrompt = document.getElementById('completed-prompt');
    const promptPreview = document.getElementById('prompt-preview');
    
    // Variables para el seguimiento del estado
    let currentExercise = 0;
    let userAnswers = {};
    let draggedFragment = null;
    
    // Cargar el ejercicio actual
    function loadExercise(exerciseIndex) {
        const exercise = exercises[exerciseIndex];
        
        // Actualizar información del ejercicio
        exerciseArea.textContent = exercise.area;
        exerciseDescription.textContent = exercise.description;
        
        // Actualizar barra de progreso
        const progress = ((exerciseIndex + 1) / exercises.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Ejercicio ${exerciseIndex + 1} de ${exercises.length}`;
        
        // Mezclar los fragmentos automáticamente
        const shuffledFragments = shuffleArray(exercise.fragments);
        
        // Limpiar fragmentos anteriores
        fragmentsList.innerHTML = '';
        
        // Cargar nuevos fragmentos (en orden aleatorio)
        shuffledFragments.forEach((fragment, index) => {
            const fragmentElement = document.createElement('div');
            fragmentElement.className = 'fragment';
            fragmentElement.textContent = fragment.text;
            fragmentElement.setAttribute('draggable', 'true');
            fragmentElement.setAttribute('data-correct', fragment.correct);
            fragmentElement.setAttribute('data-index', index);
            
            fragmentsList.appendChild(fragmentElement);
        });
        
        // Reiniciar componentes
        components.forEach(component => {
            component.classList.remove('correct', 'incorrect', 'highlight');
            const dropZone = component.querySelector('.drop-zone');
            dropZone.textContent = '[Arrastra aquí el fragmento correspondiente]';
            dropZone.classList.remove('filled');
        });
        
        // Reiniciar variables
        userAnswers = {};
        
        // Ocultar resultado y prompt completado
        resultDiv.textContent = '';
        resultDiv.className = 'result';
        resultDiv.style.display = 'none';
        completedPrompt.classList.add('hidden');
        
        // Configurar botones
        verifyBtn.disabled = true;
        nextBtn.classList.add('hidden');
        verifyBtn.classList.remove('hidden');
        
        // Configurar eventos para los nuevos fragmentos
        setupFragmentEvents();
    }
    
    // Configurar eventos para los fragmentos
    function setupFragmentEvents() {
        const fragments = document.querySelectorAll('.fragment');
        
        fragments.forEach(fragment => {
            fragment.addEventListener('dragstart', function(e) {
                draggedFragment = this;
                this.classList.add('dragging');
                e.dataTransfer.setData('text/plain', this.getAttribute('data-correct'));
            });
            
            fragment.addEventListener('dragend', function() {
                this.classList.remove('dragging');
                draggedFragment = null;
            });
        });
    }
    
    // Configurar eventos para los componentes (zonas de destino)
    components.forEach(component => {
        component.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('highlight');
        });
        
        component.addEventListener('dragleave', function() {
            this.classList.remove('highlight');
        });
        
        component.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('highlight');
            
            if (!draggedFragment) return;
            
            const componentType = this.getAttribute('data-component');
            const fragmentType = draggedFragment.getAttribute('data-correct');
            const dropZone = this.querySelector('.drop-zone');
            
            // Actualizar la zona de destino
            dropZone.textContent = draggedFragment.textContent;
            dropZone.classList.add('filled');
            
            // Marcar el fragmento como usado
            draggedFragment.classList.add('used');
            draggedFragment.setAttribute('draggable', 'false');
            
            // Guardar la respuesta del usuario
            userAnswers[componentType] = fragmentType;
            
            // Verificar si todas las respuestas están completas
            checkAllAnswers();
        });
    });
    
    // Función para verificar si todas las respuestas están completas
    function checkAllAnswers() {
        const allComponents = Array.from(components);
        const allAnswered = allComponents.every(component => {
            const componentType = component.getAttribute('data-component');
            return userAnswers[componentType];
        });
        
        verifyBtn.disabled = !allAnswered;
    }
    
    // Configurar el botón de verificación
    verifyBtn.addEventListener('click', function() {
        let correctCount = 0;
        const totalComponents = components.length;
        
        // Verificar cada respuesta
        components.forEach(component => {
            const componentType = component.getAttribute('data-component');
            const userAnswer = userAnswers[componentType];
            
            if (userAnswer === componentType) {
                component.classList.add('correct');
                correctCount++;
            } else {
                component.classList.add('incorrect');
            }
        });
        
        // Mostrar resultado
        if (correctCount === totalComponents) {
            resultDiv.textContent = `¡Excelente! Has asociado correctamente todos los componentes (${correctCount}/${totalComponents}).`;
            resultDiv.className = 'result success';
            
            // Mostrar el prompt completado
            showCompletedPrompt();
            
            // Si no es el último ejercicio, mostrar botón de siguiente
            if (currentExercise < exercises.length - 1) {
                nextBtn.classList.remove('hidden');
            } else {
                // Mensaje final cuando se completan todos los ejercicios
                resultDiv.textContent = '¡Excelente! Has completado todos los ejercicios. Ya estás entrenado para seguir perfeccionando los prompts.';
                resultDiv.className = 'result success';
                resultDiv.style.fontSize = '1.1rem';
                resultDiv.style.padding = '25px';
                
                // Ocultar el botón de siguiente
                nextBtn.classList.add('hidden');
                
                // Mostrar mensaje de felicitación adicional
                setTimeout(() => {
                    const celebrationDiv = document.createElement('div');
                    celebrationDiv.className = 'result success';
                    celebrationDiv.style.marginTop = '15px';
                    celebrationDiv.style.backgroundColor = '#d4edda';
                    celebrationDiv.style.color = '#155724';
                    celebrationDiv.style.padding = '15px';
                    celebrationDiv.style.borderRadius = '8px';
                    celebrationDiv.style.textAlign = 'center';
                    celebrationDiv.innerHTML = `
                        <h3 style="margin-bottom: 10px;">🎉 ¡Felicidades! 🎉</h3>
                        <p>Has dominado los componentes esenciales para crear prompts efectivos.</p>
                        <p style="margin-top: 10px; font-weight: bold;">Continúa practicando y perfeccionando tus habilidades.</p>
                    `;
                    resultDiv.parentNode.insertBefore(celebrationDiv, resultDiv.nextSibling);
                }, 1000);
            }
        } else {
            resultDiv.textContent = `Tienes ${correctCount} de ${totalComponents} correctos. Revisa las respuestas incorrectas (marcadas en rojo) e inténtalo de nuevo.`;
            resultDiv.className = 'result error';
        }
        
        // Deshabilitar el botón de verificación
        verifyBtn.disabled = true;
    });
    
    // Función para mostrar el prompt completado
    function showCompletedPrompt() {
        const exercise = exercises[currentExercise];
        let promptText = "";
        
        // Construir el prompt en el orden correcto
        components.forEach(component => {
            const componentType = component.getAttribute('data-component');
            const dropZone = component.querySelector('.drop-zone');
            if (dropZone.classList.contains('filled')) {
                promptText += `${component.querySelector('strong').textContent} ${dropZone.textContent}\n`;
            }
        });
        
        promptPreview.textContent = promptText;
        completedPrompt.classList.remove('hidden');
    }
    
    // Configurar el botón de siguiente ejercicio
    nextBtn.addEventListener('click', function() {
        currentExercise++;
        loadExercise(currentExercise);
    });
    
    // Configurar el botón de reinicio
    resetBtn.addEventListener('click', function() {
        loadExercise(currentExercise);
    });
    
    // Inicializar con el primer ejercicio
    loadExercise(currentExercise);
});