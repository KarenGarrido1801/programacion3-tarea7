
function handleSubmit(event)
{
    event.preventDefault();
    const familiarForm = document.getElementById("form-familiar");
    let datosFamiliares = {
        nombreMadre: familiarForm.querySelector("#nombreMadre")?.value || "",
        telefonoMadre: familiarForm.querySelector("#telefonoMadre")?.value || "",
        ocupacionMadre: familiarForm.querySelector("#ocupacionMadre")?.value || "",
        nivelAcademicoMadre: familiarForm.querySelector("#nivelAcademicoMadre")?.value || "",

        nombrePadre: familiarForm.querySelector("#nombrePadre")?.value || "",
        telefonoPadre: familiarForm.querySelector("#telefonoPadre")?.value || "",
        ocupacionPadre: familiarForm.querySelector("#ocupacionPadre")?.value || "",
        nivelAcademicoPadre: familiarForm.querySelector("#nivelAcademicoPadre")?.value || "",

        nombreTutor: familiarForm.querySelector("#nombreTutor")?.value || "",
        telefonoTutor: familiarForm.querySelector("#telefonoTutor")?.value || "",
        ocupacionTutor: familiarForm.querySelector("#ocupacionTutor")?.value || "",
        nivelAcademicoTutor: familiarForm.querySelector("#nivelAcademicoTutor")?.value || "",
        direccionTutor: familiarForm.querySelector("#direccionTutor")?.value || "",
        relacionTutor: familiarForm.querySelector("#relacionTutor")?.value || ""
    }
    try {
        const raw = localStorage.getItem('data');
        const existing = raw ? JSON.parse(raw) : {};
        existing.formulario = existing.formulario || {};
        existing.formulario.datosFamiliares = datosFamiliares;
        localStorage.setItem('data', JSON.stringify(existing));
    } catch (e) {
        console.error('Error guardando datosFamiliares en localStorage', e);
        const data = { formulario: { datosFamiliares } };
        localStorage.setItem('data', JSON.stringify(data));
    }

    // Use relative path to the next form
    window.location.href = "../html/formAcademico.html";
}

function clearForm(event) {
    event.preventDefault();
    localStorage.removeItem("data");
    document.getElementById("form-familiar").reset();
}

// console.log removed to avoid ReferenceError in global scope

