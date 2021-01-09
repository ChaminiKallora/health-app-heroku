import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AnonymousGuard } from './core/guards/anonymous.guard';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { MainComponent } from './modules/main/main/main.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [{
      path: 'heart-disease-detection',
      loadChildren: () => import('./modules/heart-disease/heart-disease.module').then(m => m.HeartDiseaseModule),
    }, {
      path: 'stress-detection',
      loadChildren: () => import('./modules/stress/stress.module').then(m => m.StressModule),
    }, {
      path: 'diabetes-detection',
      loadChildren: () => import('./modules/diabetes/diabetes.module').then(m => m.DiabetesModule),
    }, {
      path: 'spondyloarthritis-detection',
      loadChildren: () => import('./modules/spondyloarthritis/spondyloarthritis.module').then(m => m.SpondyloarthritisModule),
    }, {
      path: 'dashboard',
      loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    }, {
      path: 'profile',
      loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
    }

    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    canActivate: [AnonymousGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule),
    canActivate: [AnonymousGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },

  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard],
  //   children: [{
  //     path: 'heart-disease-detection',
  //     loadChildren: () => import('./modules/heart-disease/heart-disease.module').then(m => m.HeartDiseaseModule),
  //   }, {
  //     path: 'stress-detection',
  //     loadChildren: () => import('./modules/stress/stress.module').then(m => m.StressModule),
  //   }, {
  //     path: 'diabetes-detection',
  //     loadChildren: () => import('./modules/diabetes/diabetes.module').then(m => m.DiabetesModule),
  //   }, {
  //     path: 'spondyloarthritis-detection',
  //     loadChildren: () => import('./modules/spondyloarthritis/spondyloarthritis.module').then(m => m.SpondyloarthritisModule),
  //   }, {
  //     path: '',
  //     loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
  //   }, ]
  // }






  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'forgotPassword',
  //   component: ForgotPasswordComponent
  // },
  // {
  //   path: 'resetPassword/:token',
  //   component: ResetPasswordComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
