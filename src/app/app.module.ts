import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { I18NextModule, ITranslationService, I18NEXT_SERVICE, I18NextTitle, defaultInterpolationFormat } from 'angular-i18next';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export function appInit(i18next: ITranslationService) {
  return () => 
    i18next
      .use(XHR)
      .use(LanguageDetector)
      .init({
        whitelist: ['en', 'es', 'da', 'pt'],
        fallbackLng: 'en',
        debug: true,
        returnEmptyString: false,
        ns: [
          'translation',
          'validation',
          'error'
        ],
        interpolation: {
          format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
        },
        backend: {
          loadPath: 'assets/locales/{{lng}}.{{ns}}.json'
        },
        detection: {
          order: ['querystring', 'cookie'],
          lookupCookie: 'lang',
          lookupQuerystring: 'lng',
          caches: ['localStorage', 'cookie'],
          cookieMinutes: 10080,
        },
        

      });
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    I18NextModule.forRoot()
  ],
  providers: [
    I18N_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
