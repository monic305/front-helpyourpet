import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  unidadEdad: string;
  genero: string;
  tamano: string;
  descripcion: string;
  foto: string;
}

interface Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  edad: number;
  direccion: string;
  tipoDocumento: string;
  numDocumento: string;
  imagen: string;
}

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.scss'
})
export class PerfilUsuario implements OnInit {
  seccionActiva = 'dashboard';
  sidebarAbierto = false;
  darkMode = false;

  usuario: Usuario = {
    id: 1,
    nombres: 'Juan Carlos',
    apellidos: 'Pérez García',
    correo: 'juan.perez@email.com',
    telefono: '+57 320 456 7890',
    edad: 28,
    direccion: 'Calle 15 #10-20, Duitama, Boyacá',
    tipoDocumento: 'Cédula de Ciudadanía',
    numDocumento: '1052345678',
    imagen: ''
  };

  mascotas: Mascota[] = [
    {
      id: 1,
      nombre: 'Max',
      especie: 'Perro',
      raza: 'Golden Retriever',
      edad: 3,
      unidadEdad: 'años',
      genero: 'M',
      tamano: 'grande',
      descripcion: 'Amigable y juguetón, le encanta correr.',
      foto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      nombre: 'Luna',
      especie: 'Gato',
      raza: 'Siamés',
      edad: 2,
      unidadEdad: 'años',
      genero: 'F',
      tamano: 'pequeño',
      descripcion: 'Tranquila y cariñosa.',
      foto: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      nombre: 'Rocky',
      especie: 'Perro',
      raza: 'Bulldog Francés',
      edad: 1,
      unidadEdad: 'años',
      genero: 'M',
      tamano: 'pequeño',
      descripcion: 'Travieso y muy activo.',
      foto: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=200&fit=crop'
    }
  ];

  // Modal state
  showAddPetModal = false;
  showEditPetModal = false;
  editingPet: Mascota | null = null;

  // New pet form
  newPet: Partial<Mascota> = {
    nombre: '', especie: '', raza: '', edad: 0,
    unidadEdad: 'años', genero: 'M', tamano: '', descripcion: ''
  };

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit(): void {
    this.darkMode = this.themeService.isDarkMode;
    this.themeService.darkMode$.subscribe(dark => this.darkMode = dark);
  }

  cambiarSeccion(seccion: string): void {
    this.seccionActiva = seccion;
    this.cerrarSidebar();
  }

  toggleSidebar(): void {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

  cerrarSidebar(): void {
    this.sidebarAbierto = false;
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

  irAInicio(): void {
    this.router.navigate(['/inicio']);
  }

  cerrarSesion(): void {
    this.themeService.setDarkMode(false);
    this.router.navigate(['/login']);
  }

  // Pet CRUD
  openAddPetModal(): void {
    this.newPet = {
      nombre: '', especie: '', raza: '', edad: 0,
      unidadEdad: 'años', genero: 'M', tamano: '', descripcion: ''
    };
    this.showAddPetModal = true;
  }

  closeAddPetModal(): void {
    this.showAddPetModal = false;
  }

  guardarMascota(): void {
    if (!this.newPet.nombre || !this.newPet.especie) return;
    const newId = Math.max(...this.mascotas.map(m => m.id), 0) + 1;
    this.mascotas.push({
      id: newId,
      nombre: this.newPet.nombre!,
      especie: this.newPet.especie!,
      raza: this.newPet.raza || 'Mestizo',
      edad: this.newPet.edad || 0,
      unidadEdad: this.newPet.unidadEdad || 'años',
      genero: this.newPet.genero || 'M',
      tamano: this.newPet.tamano || 'mediano',
      descripcion: this.newPet.descripcion || '',
      foto: ''
    });
    this.showAddPetModal = false;
  }

  openEditPetModal(mascota: Mascota): void {
    this.editingPet = { ...mascota };
    this.showEditPetModal = true;
  }

  closeEditPetModal(): void {
    this.showEditPetModal = false;
    this.editingPet = null;
  }

  guardarEdicionMascota(): void {
    if (!this.editingPet) return;
    const idx = this.mascotas.findIndex(m => m.id === this.editingPet!.id);
    if (idx >= 0) {
      this.mascotas[idx] = { ...this.editingPet };
    }
    this.closeEditPetModal();
  }

  eliminarMascota(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta mascota?')) {
      this.mascotas = this.mascotas.filter(m => m.id !== id);
    }
  }

  getEdadTexto(mascota: Mascota): string {
    if (mascota.unidadEdad === 'meses') {
      return mascota.edad === 1 ? '1 mes' : `${mascota.edad} meses`;
    }
    return mascota.edad === 1 ? '1 año' : `${mascota.edad} años`;
  }

  getGeneroTexto(genero: string): string {
    switch (genero) {
      case 'M': return 'Macho';
      case 'F': return 'Hembra';
      default: return 'Desconocido';
    }
  }

  guardarPerfil(): void {
    alert('✅ Perfil actualizado correctamente (simulado).');
  }

  irAAdopciones(): void {
    this.router.navigate(['/adopcion']);
  }

  irATienda(): void {
    this.router.navigate(['/tienda']);
  }
}
