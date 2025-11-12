
function handleSubmit(event) 
{
  event.preventDefault();
  const extracurricularForm = document.getElementById("form-extracurricular");

  const datosExtracurriculares = {
    practicaDeporte: extracurricularForm.querySelector("#deportes")?.value || "", 
    participaActividades: extracurricularForm.querySelector("#actividades")?.value || "", 
    clubes: extracurricularForm.querySelector('input[name="clubes"]:checked')?.value || "",
    idioma: extracurricularForm.querySelector("#idioma")?.value || "",
    nivelIdioma: extracurricularForm.querySelector("#nivelIdioma")?.value || "",
    habilidadesTecnologicas: extracurricularForm.querySelector("#HabilidadesInf")?.value || "",
    pasatiempo: extracurricularForm.querySelector("#pasatiempo")?.value || ""
  };
  try {
    const raw = localStorage.getItem('data');
    const existing = raw ? JSON.parse(raw) : {};
    existing.formulario = existing.formulario || {};
    existing.formulario.datosExtracurriculares = datosExtracurriculares;
    localStorage.setItem('data', JSON.stringify(existing));
  } catch (e) {
    console.error('Error guardando datosExtracurriculares en localStorage', e);
    const data = { formulario: { datosExtracurriculares } };
    localStorage.setItem('data', JSON.stringify(data));
  }

  window.location.href = "../html/informes.html";
}

function clearForm(event) {
    event.preventDefault();
    localStorage.removeItem("data");
    document.getElementById("form-extracurricular").reset();
}


