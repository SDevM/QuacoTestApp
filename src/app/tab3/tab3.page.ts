import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';
import { audioService } from '../services/audio.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements AfterViewInit {
  @ViewChild('map') mapDiv: ElementRef<HTMLDivElement>;

  map: google.maps.Map;
  currentDirection: google.maps.DirectionsResult;
  markerA = new google.maps.Marker();
  markerB = new google.maps.Marker({
    draggable: true,
    label: 'D',
    animation: google.maps.Animation.DROP,
  });
  proxAlert = 30;

  constructor(
    private ngZone: NgZone,
    private audioPlayer: audioService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.audioPlayer.preload('proximity', 'assets/sounds/proximity.wav');
  }

  ngAfterViewInit() {
    this.initMap();
  }

  /**
   * Handler for updating directions in response to events
   * @param originQuery Address of origin
   * @param destinationQuery Address of destination
   */
  onChangeHandler: Function;

  /**
   * Checks the distance of markerB from markerA, if it's <= a set amount, an alert will play
   * @param distance Distance value in metric units
   */
  proximityCheck(distance: number) {
    if (distance <= this.proxAlert) {
      this.audioPlayer.play('proximity');
      //Alert
    }
  }

  /**
   * Initializes the map and related processes
   */
  initMap(): void {
    // Initialize the map using the div element and these options
    this.map = new google.maps.Map(this.mapDiv.nativeElement, {
      zoom: 15,
      center: { lng: -76.8019, lat: 17.9962 },
    });

    // Directions objects needed to create and manage the directions object
    const directionsService = new google.maps.DirectionsService();
    // Provides mad to renderer
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
    });

    console.log(this.userService.user);
    console.log('Hit!');

    this.calculateAndDisplayRoute(
      directionsService,
      directionsRenderer,
      this.userService.user.address,
      'Suite B11, 53 Lady Musgrave Rd, Kingston, Jamaica'
    );
  }

  /**
   * Prepare and render new route information
   * @param directionsService
   * @param directionsRenderer
   * @param origin Address of origin
   * @param destination Address of destination
   */
  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
    origin:
      | string
      | google.maps.LatLng
      | google.maps.LatLngLiteral
      | google.maps.Place,
    destination:
      | string
      | google.maps.LatLng
      | google.maps.LatLngLiteral
      | google.maps.Place
  ) {
    // Create the directions request
    directionsService
      .route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: true,
        optimizeWaypoints: true,
        drivingOptions: {
          departureTime: new Date(),
        },
      })
      .then((response) => {
        // Use directions response to set the direction values in the directions renderer
        directionsRenderer.setDirections(response);
        // Save latest directions response
        this.currentDirection = response;
        // Check proximity of directions destination
        this.proximityCheck(response.routes[0].legs[0].distance.value);
      })
      .catch((e) => console.log(e));
  }
}
