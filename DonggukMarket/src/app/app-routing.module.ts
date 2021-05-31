import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'main',loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)},
  { path: 'login',loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'sign',loadChildren: () => import('./sign/sign.module').then( m => m.SignPageModule)},
  { path: 'find',loadChildren: () => import('./find/find.module').then( m => m.FindPageModule)},
  { path: 'student-check',loadChildren: () => import('./check/student-check/student-check.module').then( m => m.StudentCheckPageModule)},
  { path: 'home',loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'alert',loadChildren: () => import('./alert/alert.module').then( m => m.AlertPageModule)},
  { path: 'my-profile',loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)},
  { path: 'profile-modify',loadChildren: () => import('./profile-modify/profile-modify.module').then( m => m.ProfileModifyPageModule)},
  { path:'board',loadChildren: () => import('./board/board.module').then(m =>m.boardPageModule)},
  { path:'chat-room/:you',loadChildren: () => import('./chat-room/chat-room.module').then(m =>m.ChatRoomPageModule)},
  { path:'post/:postkey/:writer',loadChildren: () => import('./post/post.module').then(m =>m.PostPageModule)},

  { path:'my-borrow',loadChildren: () => import('./my-borrow/my-borrow.module').then(m =>m.MyBorrowPageModule)},
  { path:'my-buy',loadChildren: () => import('./my-buy/my-buy.module').then(m =>m.MyBuyPageModule)},
  { path:'my-sell',loadChildren: () => import('./my-sell/my-sell.module').then(m =>m.MySellPageModule)},
  { path:'my-like',loadChildren: () => import('./my-like/my-like.module').then(m =>m.MyLikePageModule)},
  { path:'credit/:you',loadChildren: () => import('./credit/credit.module').then(m =>m.CreditPageModule)},

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
