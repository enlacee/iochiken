import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab1detallePage } from './tab1detalle.page';

describe('Tab1detallePage', () => {
  let component: Tab1detallePage;
  let fixture: ComponentFixture<Tab1detallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab1detallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1detallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
