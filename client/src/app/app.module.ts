import "reflect-metadata";
import "hammerjs";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RouterModule, Routes } from "@angular/router";

import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from "@angular/material/input";

import { NgReduxModule } from "@angular-redux/store";

// Components
import { AppComponent } from "./app.component";

// Meta
import { AppContext } from "./app.context";

// Store
import { NavigationActions } from "./../store/action/core/navigation.action";

import { UserComponent } from "./pages/core/user/user.component";
import { RegisterComponent } from "./pages/core/register/register.component";
import { Service } from "../services/core/service";
import { LoginComponent } from "./pages/core/login/login.component";
import { SearchComponent } from "./pages/core/search/search.component";
import { InformationComponent } from "./pages/information/information.component";
import { UserActions } from "../store/action/core/user.action";
import { ProgressComponent } from "./pages/progress/progress.component";
import { TextEditorComponent } from "./pages/text-editor/text-editor.component";
import { NewLinePipe } from "./pipes/new-line.pipe";
import { NumberToArrayPipe } from "./pipes/number-to-array.pipe";

const appRoutes: Routes = [
  { path: "progress", component: ProgressComponent },
  { path: "", component: InformationComponent },
  { path: "**", redirectTo: "progress" }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    BrowserAnimationsModule,
    NgReduxModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    // Components
    UserComponent,
    RegisterComponent,
    LoginComponent,
    SearchComponent,
    // Directives
    InformationComponent,
    ProgressComponent,
    NewLinePipe,
    TextEditorComponent,
    NumberToArrayPipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, RegisterComponent, TextEditorComponent],
  providers: [
    AppContext,
    // Store
    NavigationActions,
    UserActions,
    // Services
    Service
  ]
})
export class AppModule {}
