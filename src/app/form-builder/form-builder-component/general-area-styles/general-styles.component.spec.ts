import {GeneralStylesComponent} from "./general-styles.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Store, StoreModule} from "@ngrx/store";
import {State} from "../../../store";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {setGeneralStyles} from "../../state/builder.actions";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


describe('GeneralStyles Component', () => {
  let component: GeneralStylesComponent
  let fixture: ComponentFixture<GeneralStylesComponent>
  let store: Store<State>
  let dispatchSpy : jasmine.Spy

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule
      ],
      declarations:[
        GeneralStylesComponent
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralStylesComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    dispatchSpy = spyOn(store, 'dispatch')
    fixture.detectChanges()
  })

  it('should dispatch setGeneralStyles action on submit',  () => {
    const generalStyle = component.generalStylesForm.value
    component.submit()
    expect(dispatchSpy).toHaveBeenCalledWith(setGeneralStyles({generalStyle}))
  });

  it('should set default values', () => {
    expect(component.generalStylesForm.get('borderStyle').value).toEqual('dotted');
    expect(component.color.get('red').value).toEqual(245);
    expect(component.color.get('blue').value).toEqual(245);
    expect(component.color.get('green').value).toEqual(245);
  });
})
