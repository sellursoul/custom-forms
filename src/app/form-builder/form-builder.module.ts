import {NgModule} from "@angular/core";
import {FormBuilderComponent} from "./form-builder-component/form-builder.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {BUILDER_STATE_NAME} from "./state/builder.selectors";
import {BuilderReducer} from "./state/builder.reducer";
import {PushModule} from "@ngrx/component";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';
import {CdkDrag, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import {MatButtonModule} from "@angular/material/button";
import {InputChangerComponent} from './options/input-changer/input-changer.component';
import {TextareaChangerComponent} from './options/textarea-changer/textarea-changer.component';
import {CheckboxChangerComponent} from './options/checkbox-changer/checkbox-changer.component';
import {SelectChangerComponent} from './options/select-changer/select-changer.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ButtonChangerComponent} from './options/button-changer/button-changer.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {GeneralStylesComponent} from './form-builder-component/general-area-styles/general-styles.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {InputFormComponent} from './form-builder-component/working-forms/input-form/input-form.component';
import {TextareaFormComponent} from './form-builder-component/working-forms/textarea-form/textarea-form.component';
import {ButtonFormComponent} from './form-builder-component/working-forms/button-form/button-form.component';
import {SelectFormComponent} from './form-builder-component/working-forms/select-form/select-form.component';
import {CheckboxFormComponent} from './form-builder-component/working-forms/checkbox-form/checkbox-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    FormBuilderComponent,
    InputChangerComponent,
    TextareaChangerComponent,
    CheckboxChangerComponent,
    SelectChangerComponent,
    ButtonChangerComponent,
    GeneralStylesComponent,
    InputFormComponent,
    TextareaFormComponent,
    ButtonFormComponent,
    SelectFormComponent,
    CheckboxFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(BUILDER_STATE_NAME, BuilderReducer),
    PushModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    RouterLink,
    RouterOutlet,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [],
  exports: []
})

export class FormBuilderModule {
}
