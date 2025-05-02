// pipeline-animation.js

function initializePipelineAnimation(pipelineData) {
    const steps = Object.entries(pipelineData);
    const canvas = document.getElementById('pipelineCanvas');
    
    if (!canvas.getContext) {
        showCanvasError();
        return;
    }

    const ctx = canvas.getContext('2d');
    const config = setupCanvasConfig(canvas);
    let animationState = initAnimationState(config, steps.length);

    // Iniciar animación si hay pasos
    if (steps.length > 0) {
        startAnimation(steps, ctx, config, animationState);
    }
}

function setupCanvasConfig(canvas) {
    return {
        width: canvas.width,
        height: canvas.height,
        boxWidth: 120,
        boxHeight: 60,
        dataBoxHeight: 50,
        gap: 40,
        startX: 30,
        arrowOffsetY: 15,
        dataPacketRadius: 8,
        animationSpeed: 1
    };
}

function initAnimationState(config, totalSteps) {
    return {
        currentStepIndex: 0,
        dataPacketX: config.startX - config.gap/2,
        dataPacketY: config.startY + config.boxHeight / 2,
        targetX: config.startX + config.boxWidth / 2,
        animating: true,
        totalSteps: totalSteps
    };
}

function startAnimation(steps, ctx, config, state) {
    const animate = () => {
        ctx.clearRect(0, 0, config.width, config.height);
        drawStaticElements(steps, ctx, config);
        updateDataPacketPosition(config, state);
        drawDataPacket(ctx, config, state);

        if (state.animating) {
            requestAnimationFrame(animate);
        }
    };
    animate();
}

function drawStaticElements(steps, ctx, config) {
    let currentX = config.startX;
    
    steps.forEach(([stepName, stepData], index) => {
        const displayName = shortenStepName(stepName);
        
        // Dibujar filtro
        drawFilterBox(ctx, currentX, config.startY, config.boxWidth, config.boxHeight, displayName);
        
        // Dibujar caja de datos
        drawDataText(
            ctx, 
            currentX, 
            config.startY + config.boxHeight + 10, 
            config.boxWidth, 
            config.dataBoxHeight, 
            stepData
        );
        
        // Dibujar flecha
        if (index < steps.length - 1) {
            drawArrow(
                ctx,
                currentX + config.boxWidth,
                config.startY + config.boxHeight / 2,
                currentX + config.boxWidth + config.gap,
                config.startY + config.boxHeight / 2
            );
        }
        
        currentX += config.boxWidth + config.gap;
    });
}

// ... (resto de funciones de dibujo: drawFilterBox, drawArrow, drawDataText, etc.)
// [Mantén las mismas funciones de dibujo que tenías, pero exportadas]

function showCanvasError() {
    const canvasContainer = document.querySelector('.canvas-container');
    if (canvasContainer) {
        canvasContainer.innerHTML += '<p style="color: red;">Tu navegador no soporta Canvas.</p>';
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (typeof pipelineData !== 'undefined') {
        initializePipelineAnimation(pipelineData);
    }
});
