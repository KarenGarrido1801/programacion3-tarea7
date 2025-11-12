
function handleSubmit(event)
{
    event.preventDefault();
    const academicForm = document.getElementById("form-academic")
    let datosAcademicos = {
        nombreInstitucion: academicForm.querySelector("#nombreInstitucion")?.value || "",
        tipoInstitucion: academicForm.querySelector('input[name="institucion"]:checked')?.value || "",

        anioBachillerato: academicForm.querySelector("#anioBachillerato")?.value || "",
        promedio: academicForm.querySelectorAll('input[type="text"]')[1]?.value || "", 
        cursoRepetido: academicForm.querySelector('input[name="curso"]:checked')?.value || "",
        carrera: academicForm.querySelector("#carrera")?.value || "",
        motivoCarrera: academicForm.querySelectorAll('input[type="text"]')[2]?.value || "", 
        turno: academicForm.querySelector("#turno")?.value || ""
    }

    try {
        const raw = localStorage.getItem('data');
        const existing = raw ? JSON.parse(raw) : {};
        existing.formulario = existing.formulario || {};
        existing.formulario.datosAcademicos = datosAcademicos;
        localStorage.setItem('data', JSON.stringify(existing));
    } catch (e) {
        console.error('Error guardando datosAcademicos en localStorage', e);
        const data = { formulario: { datosAcademicos } };
        localStorage.setItem('data', JSON.stringify(data));
    }

    window.location.href = "../html/formExtracurricular.html";
}

function clearForm(event) {
    event.preventDefault();
    localStorage.removeItem("data");
    document.getElementById("form-academic").reset();
}