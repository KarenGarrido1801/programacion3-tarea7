console.log("hola");

function handleSubmit(event)
{
    event.preventDefault();
    const personalForm = document.getElementById("form-personal");
    let datosPersonales = {
        nombre: personalForm.querySelector("#nombres")?.value || "",
        apellidos: personalForm.querySelector("#apellidos")?.value || "",
        fechaNacimiento: personalForm.querySelector("#fechaNacimiento")?.value || "",
        sexo: personalForm.querySelector('input[name="sexo"]:checked')?.value || "",
        estadoCivil: personalForm.querySelector("#estadoCivil")?.value || "",
        cedula: personalForm.querySelector("#celular")?.value || "",
        nacionalidad: personalForm.querySelector("#nacionalidad")?.value || "",
        lugarNacimiento: {
            pais: personalForm.querySelector("#paisNacimiento")?.value || "",
            provincia: personalForm.querySelector("#provinciaNacimiento")?.value || ""
        },
        direccion: personalForm.querySelector("#direccion")?.value || "",
        tipoSangre: personalForm.querySelector("#tipoSangre")?.value || "",
        padecimientoSioNo: personalForm.querySelector('#padecimientoSioNo:checked')? true : false,
        padecimiento: personalForm.querySelector("#padecimiento")?.value || "",
        contacto: {
            telefono: personalForm.querySelector("#telefono")?.value || "",
            correo: personalForm.querySelector("#correo")?.value || ""
        },
        contactoEmergencia: {
            nombre: personalForm.querySelector("#nombreDecontactoEmergencia")?.value || "",
            relacion: personalForm.querySelector("#relacionContactoEmergrncia")?.value || "",
            telefono: personalForm.querySelector("#telefonoEmergencia")?.value || "",
            direccion: personalForm.querySelector("#correoEmergencia")?.value || ""
        }
    };
    try {
        const raw = localStorage.getItem('data'); //raw = el valor almacenado en localStorage bajo la clave 'data'
        const existing = raw ? JSON.parse(raw) : {}; //existing = raw convertido de JSON a objeto; solo si raw tiene contenido.
        existing.formulario = existing.formulario || {}; //se asegura de que existing tenga una propiedad formulario
        existing.formulario.datosPersonales = datosPersonales;
        localStorage.setItem('data', JSON.stringify(existing));//Guarda el objeto actualizado en localStorage, convirtiéndolo a cadena JSON
    } catch (e) {
        console.error('Error guardando datosPersonales en localStorage', e); // si ocurre un error muestra un mensaje
        const data = { formulario: { datosPersonales } }; // y crea un nuevo objeto con datosPersonales y lo guarda en localStorage
        localStorage.setItem('data', JSON.stringify(data));
    }

    window.location.href = "../html/formFamiliar.html";
}

function clearForm(event) {
    event.preventDefault();
    localStorage.removeItem("data");
    document.getElementById("form-personal").reset();
}