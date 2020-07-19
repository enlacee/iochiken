import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
declare var google;

@Component({
  selector: 'app-tab4detalle',
  templateUrl: './tab4detalle.page.html',
  styleUrls: ['./tab4detalle.page.scss'],
})
export class Tab4detallePage implements OnInit {

	map;
	@ViewChild('mapElement') mapElement;

	constructor() { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.map = new google.maps.Map(
			this.mapElement.nativeElement,
			{
				center: { lat:  51.673858, lng: 7.815982 },
				zoom: 8
			}
		);
	}

}
