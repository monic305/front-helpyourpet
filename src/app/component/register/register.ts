import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  isTermsModalOpen = false;
  isSubmitting = false;

  formData = {
    nombres: '',
    apellidos: '',
    tipoDocumento: '',
    numDocumento: '',
    celular: '',
    edad: null,
    correo: '',
    password: '',
    confirmPassword: '',
    acepto: false
  };

  showPassword = false;
  showConfirmPassword = false;

  placeholderDoc = 'Número de documento';
  patternDoc = '';

  constructor(private router: Router) {}

  openTerms(event: Event) {
    event.preventDefault();
    this.isTermsModalOpen = true;
  }

  closeTerms() {
    this.isTermsModalOpen = false;
  }

  onDocumentTypeChange() {
    switch (this.formData.tipoDocumento) {
      case 'Cédula':
        this.placeholderDoc = 'Ej: 12345678';
        this.patternDoc = '[0-9]{6,12}';
        break;
      case 'DNI':
        this.placeholderDoc = 'Ej: 12345678';
        this.patternDoc = '[0-9]{7,9}';
        break;
      case 'Pasaporte':
        this.placeholderDoc = 'Ej: AB123456';
        this.patternDoc = '[A-Z0-9]{6,12}';
        break;
      default:
        this.placeholderDoc = 'Número de documento';
        this.patternDoc = '';
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirm') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  socialLogin(provider: string, event: Event) {
    event.preventDefault();
    alert(`🔄 Funcionalidad de ${provider} en desarrollo`);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    
    if (!this.formData.acepto) {
      alert('⚠️ Debes aceptar los Términos y Condiciones para continuar.');
      return;
    }

    if (this.formData.edad! < 18) {
      alert('⚠️ Debes ser mayor de 18 años para registrarte.');
      return;
    }

    if (!this.formData.tipoDocumento) {
      alert('⚠️ Debes seleccionar un tipo de documento.');
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      alert('⚠️ Las contraseñas no coinciden.');
      return;
    }

    if (this.formData.password.length < 6) {
      alert('⚠️ La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    this.isSubmitting = true;
    // Simulación de registro - cuando conectes backend, reemplaza el setTimeout
    // con tu llamada HTTP y mantén el router.navigate en el callback de éxito
    setTimeout(() => {
      alert('✅ ¡Registro completado exitosamente! Serás redirigido al inicio de sesión.');
      this.isSubmitting = false;
      this.router.navigate(['/login']);
    }, 2000);
  }
}