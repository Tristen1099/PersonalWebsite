import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroIntroComponent } from './hero-intro/hero-intro.component';
import { ProjectPortfolioComponent } from './project-portfolio/project-portfolio.component';
import { EducationHistoryComponent } from './education-history/education-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroIntroComponent,
    ProjectPortfolioComponent,
    EducationHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

