document.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.getElementById('image-container');
    const referenceList = document.getElementById('reference-list').children;

    // Función para añadir un punto interactivo
    function addPoint(xPercent, yPercent, index) {
        const point = document.createElement('div');
        point.classList.add('point');
        point.style.left = `${xPercent}%`;
        point.style.top = `${yPercent}%`;
        point.dataset.index = index;
        point.textContent = index + 1; // Añadir número al punto

        // Evento de hover para el punto
        point.addEventListener('mouseenter', () => {
            // Resaltar la referencia correspondiente
            for (let i = 0; i < referenceList.length; i++) {
                referenceList[i].classList.remove('highlight');
            }
            referenceList[index].classList.add('highlight');
        });

        // Evento cuando se sale del punto
        point.addEventListener('mouseleave', () => {
            // Limpiar el resaltado de la referencia
            referenceList[index].classList.remove('highlight');
        });

        imageContainer.appendChild(point);
    }

    // Añadir puntos iniciales (puedes añadir tantos como necesites)
    addPoint(55, 8, 0); // Coordenadas relativas al contenedor (en porcentajes) y su índice en la lista
    addPoint(82, 45, 1);
    addPoint(76, 43, 2);

    // Evento para resaltar una referencia al hacer clic en la lista
    for (let i = 0; i < referenceList.length; i++) {
        referenceList[i].addEventListener('click', function () {
            // Resaltar la referencia seleccionada
            for (let j = 0; j < referenceList.length; j++) {
                referenceList[j].classList.remove('highlight');
            }
            this.classList.add('highlight');

            // Opcional: Hacer algo con el punto correspondiente
            const pointIndex = this.dataset.point;
            const points = document.querySelectorAll('.point');
            for (let point of points) {
                point.classList.remove('highlight');
            }
            points[pointIndex].classList.add('highlight');
        });

        // Evento para cambiar el color del punto al hacer hover en la referencia
        referenceList[i].addEventListener('mouseenter', function () {
            const pointIndex = this.dataset.point;
            const point = document.querySelector(`.point[data-index="${pointIndex}"]`);
            point.style.color = 'black';
        });

        // Evento para volver al color original al salir del hover en la referencia
        referenceList[i].addEventListener('mouseleave', function () {
            const pointIndex = this.dataset.point;
            const point = document.querySelector(`.point[data-index="${pointIndex}"]`);
            point.style.color = 'white';
        });
    }

    // Reposicionar los puntos cuando la imagen cambia de tamaño
    window.addEventListener('resize', () => {
        const points = document.querySelectorAll('.point');
        points.forEach(point => {
            const xPercent = parseFloat(point.style.left);
            const yPercent = parseFloat(point.style.top);
            point.style.left = `${xPercent}%`;
            point.style.top = `${yPercent}%`;
        });
    });
});
