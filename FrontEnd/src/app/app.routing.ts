import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { ProviderAuthGuard } from "./guards/auth-provider.guard";
import { ClientAuthGuard } from "./guards/auth-client.guard";
// import { AppComponent } from './app.component';
import { ContractorOrdersComponent } from "./pages/contractor-orders/contractor-orders.component";
import { ContractorPublicProfileComponent } from "./pages/contractor-public-profile/contractor-public-profile.component";
import { SearchComponent } from "./pages/search/search.component";
import { RegisterComponent } from "./pages/register/register.component";
import { RegisterContractorComponent } from "./pages/register-contractor/register-contractor.component";
import { FAQComponent } from "./pages/faq/faq.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeProviderComponent } from "./pages/home-provider/home-provider.component";
import { HomeClientComponent } from "./pages/home-client/home-client.component";
import { MessagesClientComponent } from "./pages/messages-client/messages-client.component";
import { MessagesProviderComponent } from "./pages/messages-provider/messages-provider.component";

const APP_ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "busca", component: SearchComponent },
  { path: "busca/:categorie", component: SearchComponent },
  {
    path: "contatar/prestador/:id",
    component: ContractorPublicProfileComponent,
  },
  { path: "cadastro", component: RegisterComponent },
  {
    path: "cadastro-prestador",
    canActivate: [ProviderAuthGuard],
    component: RegisterContractorComponent,
  },
  { path: "login", component: LoginComponent },
  { path: "login/:user", component: LoginComponent },
  {
    path: "home-prestador",
    canActivate: [ProviderAuthGuard],
    component: HomeProviderComponent,
  },
  {
    path: "home-cliente",
    canActivate: [ClientAuthGuard],
    component: HomeClientComponent,
  },
  {
    path: "mensagens-cliente",
    canActivate: [ClientAuthGuard],
    component: MessagesClientComponent,
  },
  {
    path: "mensagens-cliente/:chat",
    canActivate: [ClientAuthGuard],
    component: MessagesClientComponent,
  },
  {
    path: "mensagens-prestador",
    canActivate: [ProviderAuthGuard],
    component: MessagesProviderComponent,
  },
  {
    path: "mensagens-prestador/:chat",
    canActivate: [ProviderAuthGuard],
    component: MessagesProviderComponent,
  },
  { path: "como-funciona", component: FAQComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
