import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import Antenas from '../../antenasMoviles.json';

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
    mapTypeId: 'hybrid',
    maxZoom: 25,
    minZoom: 5,
  };
  title = "Antenas móviles de España"
  markerPositions: google.maps.LatLngLiteral[] = [];
  infoContent = '';
  antenas = Antenas;
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    this.addMarker(this.antenas)
    // Create markers.
  // for (let i = 0; i < this.markerPositions.length; i++) {
  //   const marker = new google.maps.Marker({
  //     position: this.markerPositions[i].position,
  //     this.map
  //   });
  // }
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
    var coordenadas = antenas.map(f => [f.Gis_Latitud, f.Gis_Longitud])
    this.markerPositions.push(coordenadas);
  }
  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.info.open(marker);
  }
}
