document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('informes-container');
    const raw = localStorage.getItem('data');

    if (!raw) {
        container.innerHTML = '<p>No hay datos guardados aún. Complete los formularios y regrese aquí.</p>';
        return;
    }

    let data;
    try {
        data = JSON.parse(raw);
    } catch (e) {
        container.innerHTML = '<p>Datos corruptos en localStorage.</p>';
        console.error('Error parseando localStorage data:', e);
        return;
    }

    // Esperamos la estructura: { formulario: { datosPersonales?, datosFamiliares?, datosAcademicos?, datosExtracurriculares? } }
    const formulario = (data && data.formulario) ? data.formulario : data;

    if (!formulario || Object.keys(formulario).length === 0) {
        container.innerHTML = '<p>No se encontraron secciones de formulario en los datos guardados.</p>';
        return;
    }

    const titleMap = {
        datosPersonales: 'Datos Personales',
        datosFamiliares: 'Datos Familiares',
        datosAcademicos: 'Datos Académicos',
        datosExtracurriculares: 'Datos Extracurriculares'
    };

    function humanTitle(key) {
        // Mapea claves conocidas, si no existe devuelve la clave tal cual
        return titleMap[key] || key;
    }

    function renderObject(obj) { // muestra los datos como una tabla
        const table = document.createElement('table');
        table.className = 'informes-table';
        for (const [k, v] of Object.entries(obj)) {
            const tr = document.createElement('tr');
            const tdKey = document.createElement('td');
            tdKey.style.fontWeight = 'bold';
            tdKey.textContent = k;
            const tdVal = document.createElement('td');
            if (v === null || v === undefined || v === '') { //Si el valor es null, undefined o vacío, muestra -.
                tdVal.textContent = '-';
            } else if (typeof v === 'object') {// si es array u objeto, lo convertimos a JSON legible
                tdVal.textContent = Array.isArray(v) ? v.join(', ') : JSON.stringify(v);
            } else {
                tdVal.textContent = v;
            }
            tr.appendChild(tdKey);
            tr.appendChild(tdVal);
            table.appendChild(tr);
        }
        return table;
    }

    // Renderizar cada sección encontrada dentro de `formulario`
    for (const sectionKey of Object.keys(formulario)) {
        const sectionData = formulario[sectionKey];
        const sectionDiv = document.createElement('section');
        sectionDiv.className = 'informe-section';

        const h2 = document.createElement('h2');
        h2.textContent = humanTitle(sectionKey);
        sectionDiv.appendChild(h2);

        if (!sectionData || Object.keys(sectionData).length === 0) {
            const p = document.createElement('p');
            p.textContent = 'Sin datos en esta sección.';
            sectionDiv.appendChild(p);
        } else {
            sectionDiv.appendChild(renderObject(sectionData));
        }

        container.appendChild(sectionDiv);
    }
});

// este script es deliberadamente simple y muestra cualquier clave/valor
// presente en el objeto guardado en localStorage bajo la llave "data".
// Si quieres estilos, añade reglas en `styles/form.css` o crea un archivo nuevo.
