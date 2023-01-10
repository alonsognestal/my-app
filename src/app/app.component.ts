import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import antenas from '../../antenasMoviles.json';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})


export class AppComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    mapTypeId: 'roadmap',
    maxZoom: 25,
    minZoom: 1,
  };
  title = "Antenas móviles de España"
  markers = [];
  
  infoContent = '';

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.addMarker(antenas)
    });
  }
  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }
  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }
  click(event: google.maps.MapMouseEvent) {
    console.log(event);
  }
  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }
 
  addMarker(antenas) {
    antenas.forEach((f) => { 
      this.markers.push({
        position: {lat: Number(f.Gis_Latitud), lng: Number(f.Gis_Longitud)},
        title: f.Gis_Codigo,
        optimized: true
      })
  });
}}
