import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab4detallePage } from './tab4detalle.page';

describe('Tab4detallePage', () => {
  let component: Tab4detallePage;
  let fixture: ComponentFixture<Tab4detallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab4detallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab4detallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
