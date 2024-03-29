import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AgePipe } from './pipes/age.pipe';
import { AppComponent } from './app.component';
import { WorkersService } from './services/workers.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './workers/home.component';
import { WorkerSearchComponent } from './workers.search/worker.search.component';
import { ConfirmationDialogComponent } from './confirmation.dialog/confirmation.dialog.component';
import { WorkerInputDialogComponent } from './worker-input-dialog/worker-input-dialog.component';
import { WorkersTableComponent } from './workers.table/workers.table.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/');
}
const navigatorLang = navigator.language.split('-')[0];
const supportedLang = ['pl'];
const lang = supportedLang.includes(navigatorLang) ? navigatorLang : 'en';
const materialsModules = [
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        WorkerSearchComponent,
        ConfirmationDialogComponent,
        WorkerInputDialogComponent,
        WorkersTableComponent,
        AgePipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            defaultLanguage: lang,
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        FormsModule,
        ReactiveFormsModule,
        ...materialsModules,
    ],
    providers: [WorkersService],
    bootstrap: [AppComponent],
})
export class AppModule {}
