import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadChildren: () => import('../pages/list/list.module').then(m => m.ListPageModule)
      },
      {
        path: 'add',
        loadChildren: () => import('../pages/add/add.module').then(m => m.AddPageModule)
      },
      {
        path: 'manage',
        loadChildren: () => import('../pages/manage/manage.module').then(m => m.ManagePageModule)
      },
      {
        path: 'privacy',
        loadChildren: () => import('../pages/privacy/privacy.module').then(m => m.PrivacyPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
