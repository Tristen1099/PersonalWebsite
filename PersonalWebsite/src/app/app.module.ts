import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroIntroComponent } from './hero-intro/hero-intro.component';
import { ProjectPortfolioComponent } from './project-portfolio/project-portfolio.component';
import { EducationHistoryComponent } from './education-history/education-history.component';
import { WorkHistoryComponent } from './work-history/work-history.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { GameComponent } from './game-page/game.component';
import { MainSiteDataComponent } from './main-site-data/main-site-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroIntroComponent,
    ProjectPortfolioComponent,
    EducationHistoryComponent,
    WorkHistoryComponent,
    ContactMeComponent,
    GameComponent,
    MainSiteDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}


