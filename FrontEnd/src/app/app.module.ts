import { ProviderAuthGuard } from "./guards/auth-provider.guard";
import { ClientAuthGuard } from "./guards/auth-client.guard";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { ModalModule, BsModalRef } from "ngx-bootstrap/modal";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";

// COMPONENTS
import { FooterComponent } from "./components/layout-components/footer/footer.component";
import { JoinUsComponent } from "./components/layout-components/join-us/join-us.component";
import { HowItWorksComponent } from "./components/layout-components/how-it-works/how-it-works.component";
import { CarouselImagesComponent } from "./components/layout-components/carousel-images/carousel-images.component";
import { NavbarComponent } from "./components/layout-components/navbar/navbar.component";
import { BackgroundComponent } from "./components/layout-components/background/background.component";
import { CepModalComponent } from "./components/cep-modal/cep-modal.component";
import { RequestFormComponent } from "./components/request-form/request-form.component";

// PAGES
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { ContractorOrdersComponent } from "./pages/contractor-orders/contractor-orders.component";
import { ContractorPublicProfileComponent } from "./pages/contractor-public-profile/contractor-public-profile.component";
import { FAQComponent } from "./pages/faq/faq.component";
import { RegisterContractorComponent } from "./pages/register-contractor/register-contractor.component";
import { RegisterComponent } from "./pages/register/register.component";
import { HomeProviderComponent } from "./pages/home-provider/home-provider.component";
import { SearchComponent } from "./pages/search/search.component";
import { VideoChatComponent } from './components/video-chat/video-chat.component';
import { HomeClientComponent } from './pages/home-client/home-client.component';
import { MessagesClientComponent } from './pages/messages-client/messages-client.component';
import { MessagesProviderComponent } from './pages/messages-provider/messages-provider.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    JoinUsComponent,
    HowItWorksComponent,
    CarouselImagesComponent,
    HomeProviderComponent,
    NavbarComponent,
    BackgroundComponent,
    ContractorOrdersComponent,
    ContractorPublicProfileComponent,
    FAQComponent,
    RegisterContractorComponent,
    RegisterComponent,
    SearchComponent,
    CepModalComponent,
    RequestFormComponent,
    VideoChatComponent,
    HomeClientComponent,
    MessagesClientComponent,
    MessagesProviderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    routing,
    FormsModule,
    ModalModule.forRoot(),
  ],
  providers: [ProviderAuthGuard, ClientAuthGuard, BsModalRef],
  bootstrap: [AppComponent],
  entryComponents: [CepModalComponent, RequestFormComponent],
  exports: [
    CarouselImagesComponent,
    HowItWorksComponent,
    NavbarComponent,
    BackgroundComponent,
    CepModalComponent,
    RequestFormComponent,
  ],
})
export class AppModule {}
