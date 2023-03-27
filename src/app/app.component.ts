import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import antenas from '../../antenasMoviles250323, 20-33-39.json';
import { MarkerClusterer } from "@googlemaps/markerclusterer";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})


export class AppComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  zoom = 13;
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
   
  movistar = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };

  orange = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "orange",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };

  vodafone = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "red",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };

  masmovil = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "yellow",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };
  markerClustererImagePath = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: 36.45,
        lng: -6.30,
      };

      this.addMarker(antenas)   
      this.cambiarIconos()
      this.anadirMarkerClusterer(this.map, this.markers)  

      // Add a marker clusterer to manage the markers.
      
      // var mar = new MapMarker(this.map, null);
      // var icon = mar.options.
      // console.log(this.markers.slice(0,1));
      // var m = new MarkerClusterer({a, this.markers, renderer});

    });
  }
  // zoomIn() {
  //   if (this.zoom < this.options.maxZoom) this.zoom++;
  // }
  // zoomOut() {
  //   if (this.zoom > this.options.minZoom) this.zoom--;
  // }
  click(event: google.maps.MapMouseEvent) {
    console.log(event);
  }

  drag()
  {
    console.log("Hola")
  }
  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }
 
anadirMarkerClusterer(map: any, markers){
  var markclust = new MarkerClusterer({map, markers});
}

  addMarker(antenas) {
    antenas.forEach((f) => { 
      this.markers.push({
        position: {lat: Number(f.Gis_Latitud), lng: Number(f.Gis_Longitud)},
        title: f.Gis_Codigo,
        // label: {
        //   color: 'black',
        //   text: f.Gis_Codigo.charAt(0).toUpperCase(),
        // },
        optimized: true,
        options: { animation: google.maps.Animation.DROP, icon: this.movistar},
        clickable: true,
      })    
  });
}

cambiarIconos() {
  var latAnterior, lngAnterior = 0.0
  var latitud, longitud = 0.0
  var esAntenaRepetida = false
  var incremento = 0.00001
  var contMovistar = 0, contOrange = 0, contVodafone = 0, contYoigo = 0
  this.markers.forEach(function(antena) {
    if (antena.title.includes('TELEFONICA'))
    {
      contMovistar ++;
      // console.log(antena.marker)
      
      // antena.options.icon(this.movistar)
      // antena.setIcon('https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png')
    }
    else if (antena.title.includes('VODAFONE'))
    {
      contVodafone ++;
      // antena.seticon(this.vodafone)
    }
    else if (antena.title.includes('ORANGE'))
    {
      contOrange++;
      // antena.seticon(this.orange)
    }
    else if (antena.title.includes('XFERA'))
    {
      contYoigo++;
      // antena.seticon(this.masmovil)
    }
    else{
      console.log(antena.title)
    }
    //----
    // console.log("Posición real: ")
    // console.log(antena.position)
    // latitud = antena.position.lat
    // longitud = antena.position.lng
    // if (latAnterior == latitud && lngAnterior == longitud)
    // {
    //   latAnterior = antena.position.lat
    //   lngAnterior = antena.position.lng
    //   if (esAntenaRepetida)
    //   {
    //     incremento += 0.00001
    //     antena.position.lat += incremento
    //     antena.position.lng += incremento
    //   }
    //   else{
    //     incremento = 0.00001
    //     antena.position.lat += incremento
    //     antena.position.lng += incremento
    //   }      
    //   console.log("Posición actualizada: ")
    //   console.log(antena.position)
    //   latAnterior = latitud
    //   lngAnterior = longitud
    //   esAntenaRepetida = true
    // }
    // else
    // {
    //   latAnterior = latitud
    //   lngAnterior = longitud
    //   esAntenaRepetida = false
    // }
  })
  console.log("Número de antenas por operador: ")
  console.log("Movistar: ")
  console.log(contMovistar)
  console.log("Vodafone: ")
  console.log(contVodafone)
  console.log("Orange: ")
  console.log(contOrange)
  console.log("Yoigo/MásMóvil: ")
  console.log(contYoigo)
}

}

// this.markers.forEach((f) => f.seticon)