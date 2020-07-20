import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HistoriaClinica } from '../models/interfaces';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HistoriaClinicaDTO } from '../models/objects';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  columnasMostradas: string[] = [
    'dni',
    'apellido',
    'nombre',
    'sexo',
    'fechaDeNacimiento',
    'ver'
  ];
  model;
  modelo: HistoriaClinicaDTO = new HistoriaClinicaDTO();
  editar = false;
  dataSource: MatTableDataSource<HistoriaClinica>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private modalService: NgbModal) {
    // Crea 100 historias clinicas
    const historiasClinicas = Array.from({ length: 100 }, (_) =>
      crearHistoriaClinica()
    );

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(historiasClinicas);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Cantidad de filas';
    this.modelo.dni = '12.345.678';
    this.modelo.apellido = 'NN';
    this.modelo.nombre = 'NN';
    this.modelo.sexo = 'F';
    this.modelo.fechaDeNacimiento = '00/00/0000';
    this.modelo.quirurgicos = 'Ninguno';
    this.modelo.transfusionales = 'Ninguno';
    this.modelo.alergias = 'Ninguna';
    this.modelo.fisiologicos = 'Ninguno';
    this.modelo.hospitalizacionesPrevias = 'Ninguna';
    this.modelo.habitosToxicos = 'Fumar';
    this.modelo.otros = 'Lorem ipsum dolor sit amet, consectetur adipiscing.';
    this.modelo.padecimientoActual = 'Lorem ipsum dolor sit amet, consectetur adipiscing.';
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abrirModal(content) {
    this.modalService.open(content, {
      size: 'lg'
    });
  }

  modoEditar() {
    this.editar = !this.editar;
    // Feather.replace();
  }

  cerrarModal() {
    this.modalService.dismissAll();
    this.editar = false;
  }

}

// JavaScript

function crearHistoriaClinica(): HistoriaClinica {
  return {
    dni: generarDNI(),
    apellido: 'NN',
    nombre: 'NN',
    fechaDeNacimiento: '00/00/0000',
    sexo: asignarSexo()
  };
}

function generarDNI(): string {
  var num = Math.round(Math.floor(Math.random() * 6)) + Math.round(Math.floor(Math.random() * 50000000) + 10000000) + ''
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function asignarSexo() {
  var result = '';
  var characters = 'FM';
  var charactersLength = characters.length;
  for (var i = 0; i < 1; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}