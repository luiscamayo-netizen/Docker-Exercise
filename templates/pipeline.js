document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("pipelineCanvas");
    const ctx = canvas.getContext("2d");

    const etapas = Object.keys(pipelineData);
    const resultados = Object.values(pipelineData);

    const ancho = canvas.width;
    const alto = canvas.height;
    const pasoX = ancho / (etapas.length + 1);
    const pasoY = alto / 2;

    ctx.clearRect(0, 0, ancho, alto);
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    etapas.forEach((etapa, i) => {
        const x = pasoX * (i + 1);
        const y = pasoY;

        // Dibuja el nodo
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, 2 * Math.PI);
        ctx.fillStyle = "#007bff";
        ctx.fill();
        ctx.strokeStyle = "#003366";
        ctx.stroke();

        // Etiqueta del nodo
        ctx.fillStyle = "#fff";
        ctx.fillText(etapa, x, y);

        // Texto debajo (resumen de resultado)
        const texto = resultados[i];
        const resumen = texto.length > 25 ? texto.substring(0, 25) + "..." : texto;
        ctx.fillStyle = "#000";
        ctx.fillText(resumen, x, y + 50);

        // Flecha al siguiente nodo
        if (i < etapas.length - 1) {
            const xFinal = pasoX * (i + 2);
            ctx.beginPath();
            ctx.moveTo(x + 30, y);
            ctx.lineTo(xFinal - 30, y);
            ctx.strokeStyle = "#555";
            ctx.stroke();

            // Dibujo de flecha
            ctx.beginPath();
            ctx.moveTo(xFinal - 35, y - 5);
            ctx.lineTo(xFinal - 30, y);
            ctx.lineTo(xFinal - 35, y + 5);
            ctx.fillStyle = "#555";
            ctx.fill();
        }
    });
});
