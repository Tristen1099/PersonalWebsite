import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroIntroComponent } from './hero-intro/hero-intro.component';
import { ProjectPortfolioComponent } from './project-portfolio/project-portfolio.component';
import { EducationHistoryComponent } from './education-history/education-history.component';
import { WorkHistoryComponent } from './work-history/work-history.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { MainSiteDataComponent } from './main-site-data/main-site-data.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    AppComponent,
    HeroIntroComponent,
    ProjectPortfolioComponent,
    EducationHistoryComponent,
    WorkHistoryComponent,
    ContactMeComponent,
    MainSiteDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}


