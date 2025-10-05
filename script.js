// ============================================
// JAVASCRIPT - VALIDACIONES Y MANEJO DE EVENTOS
// Hoja de Vida - Juliana Rodriguez Quinchia
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ===== VARIABLES GLOBALES =====
    const form = document.getElementById('contactForm');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const empresaInput = document.getElementById('empresa');
    const telefonoInput = document.getElementById('telefono');
    const correoInput = document.getElementById('correo');
    const motivoInput = document.getElementById('motivo');
    const horarioInput = document.getElementById('horario');
    const ciudadInput = document.getElementById('ciudad');
    const charCounter = document.getElementById('charCounter');
    const modal = document.getElementById('modalExito');
    const btnCerrarModal = document.getElementById('btnCerrarModal');

    // ===== EVENTO 1: CONTADOR DE CARACTERES =====
    motivoInput.addEventListener('input', function() {
        const length = this.value.length;
        charCounter.textContent = `${length} / 10 caracteres mínimos`;
        if (length < 10) {
            charCounter.classList.remove('valid');
            charCounter.classList.add('warning');
        } else {
            charCounter.classList.remove('warning');
            charCounter.classList.add('valid');
        }
    });

    // ===== EVENTOS DE VALIDACIÓN =====
    nombreInput.addEventListener('blur', () => validarCampoTexto(nombreInput, 'errorNombre', 'El nombre es obligatorio'));
    apellidoInput.addEventListener('blur', () => validarCampoTexto(apellidoInput, 'errorApellido', 'El apellido es obligatorio'));
    empresaInput.addEventListener('blur', () => validarCampoTexto(empresaInput, 'errorEmpresa', 'La empresa es obligatoria'));
    telefonoInput.addEventListener('blur', () => validarTelefono(telefonoInput));
    correoInput.addEventListener('blur', () => validarEmail(correoInput));
    motivoInput.addEventListener('blur', () => validarMotivo(motivoInput));
    horarioInput.addEventListener('blur', () => validarHorario(horarioInput));
    ciudadInput.addEventListener('blur', () => validarCiudad(ciudadInput));

    // ===== LIMPIAR ERRORES AL ENFOCAR =====
    const todosLosInputs = [nombreInput, apellidoInput, empresaInput, telefonoInput, correoInput, motivoInput, horarioInput, ciudadInput];
    todosLosInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.remove('error-input');
            const errorId = 'error' + this.id.charAt(0).toUpperCase() + this.id.slice(1);
            const errorElement = document.getElementById(errorId);
            if (errorElement) errorElement.classList.remove('show');
        });
    });

    // ===== ENVÍO DEL FORMULARIO =====
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        limpiarTodosLosErrores();
        let esValido = true;

        if (!validarCampoTexto(nombreInput, 'errorNombre', 'El nombre es obligatorio')) esValido = false;
        if (!validarCampoTexto(apellidoInput, 'errorApellido', 'El apellido es obligatorio')) esValido = false;
        if (!validarCampoTexto(empresaInput, 'errorEmpresa', 'La empresa es obligatoria')) esValido = false;
        if (!validarTelefono(telefonoInput)) esValido = false;
        if (!validarEmail(correoInput)) esValido = false;
        if (!validarMotivo(motivoInput)) esValido = false;
        if (!validarHorario(horarioInput)) esValido = false;
        if (!validarCiudad(ciudadInput)) esValido = false;

        if (esValido) {
            console.log('✅ FORMULARIO VÁLIDO - Enviando datos...');
            mostrarModalExito();
            form.reset();
            charCounter.textContent = '0 / 10 caracteres mínimos';
            charCounter.classList.remove('valid', 'warning');
        } else {
            const primerError = document.querySelector('.error-input');
            if (primerError) primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            console.log('❌ FORMULARIO INVÁLIDO - Corrige los errores marcados');
        }
    });

    // ===== BOTÓN Y CIERRE DEL MODAL =====
    if (btnCerrarModal) {
        btnCerrarModal.addEventListener('click', cerrarModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) cerrarModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') cerrarModal();
    });

    console.log('✅ Página cargada correctamente');
    console.log('✅ Sistema de validación de formulario activado');
    console.log('%c¡Bienvenido a mi Hoja de Vida!', 'color: #667eea; font-size: 20px; font-weight: bold;');
});

// ============================================
// FUNCIONES DE VALIDACIÓN
// ============================================

function validarCampoTexto(input, errorId, mensaje) {
    const valor = input.value.trim();
    const errorElement = document.getElementById(errorId);
    if (valor === '') {
        mostrarError(input, errorElement, mensaje);
        return false;
    }
    ocultarError(input, errorElement);
    return true;
}

function validarEmail(input) {
    const valor = input.value.trim();
    const errorElement = document.getElementById('errorCorreo');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (valor === '') {
        mostrarError(input, errorElement, 'El correo electrónico es obligatorio');
        return false;
    }
    if (!emailRegex.test(valor)) {
        mostrarError(input, errorElement, 'Ingrese un correo electrónico válido (ejemplo@correo.com)');
        return false;
    }
    ocultarError(input, errorElement);
    return true;
}

function validarTelefono(input) {
    const valor = input.value.trim();
    const errorElement = document.getElementById('errorTelefono');
    if (valor === '') {
        mostrarError(input, errorElement, 'El teléfono es obligatorio');
        return false;
    }
    const telefonoRegex = /^[\d\s\+\-\(\)]+$/;
    if (!telefonoRegex.test(valor)) {
        mostrarError(input, errorElement, 'El teléfono solo puede contener números, espacios y símbolos + - ( )');
        return false;
    }
    const soloDigitos = valor.replace(/\D/g, '');
    if (soloDigitos.length < 7) {
        mostrarError(input, errorElement, 'El teléfono debe tener al menos 7 dígitos');
        return false;
    }
    ocultarError(input, errorElement);
    return true;
}

function validarMotivo(input) {
    const valor = input.value.trim();
    const errorElement = document.getElementById('errorMotivo');
    if (valor === '') {
        mostrarError(input, errorElement, 'El motivo de contacto es obligatorio');
        return false;
    }
    if (valor.length < 10) {
        mostrarError(input, errorElement, `El motivo debe tener al menos 10 caracteres. Actualmente tiene ${valor.length}`);
        return false;
    }
    ocultarError(input, errorElement);
    return true;
}

function validarHorario(input) {
    const valor = input.value.trim();
    const errorElement = document.getElementById('errorHorario');
    if (valor === '') {
        mostrarError(input, errorElement, 'El horario preferido es obligatorio');
        return false;
    }
    ocultarError(input, errorElement);
    return true;
}

function validarCiudad(input) {
    const valor = input.value;
    const errorElement = document.getElementById('errorCiudad');
    if (valor === '') {
        mostrarError(input, errorElement, 'Debe seleccionar una ciudad');
        return false;
    }
    ocultarError(input, errorElement);
    return true;
}

// ============================================
// FUNCIONES DE ERROR Y MODAL
// ============================================

function mostrarError(input, errorElement, mensaje) {
    input.classList.add('error-input');
    errorElement.textContent = mensaje;
    errorElement.classList.add('show');
}

function ocultarError(input, errorElement) {
    input.classList.remove('error-input');
    errorElement.classList.remove('show');
}

function limpiarTodosLosErrores() {
    document.querySelectorAll('.error-message').forEach(e => e.classList.remove('show'));
    document.querySelectorAll('.error-input').forEach(i => i.classList.remove('error-input'));
}

function mostrarModalExito() {
    const modal = document.getElementById('modalExito');
    if (!modal) {
        console.error('⚠️ No se encontró el modal con id "modalExito".');
        return;
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    console.log('✅ ¡FORMULARIO ENVIADO EXITOSAMENTE!');
}

function cerrarModal() {
    const modal = document.getElementById('modalExito');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Modal cerrado');
    }
}