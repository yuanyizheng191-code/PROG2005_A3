import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inventory-list',
        loadComponent: () => import('../inventory-list/inventory-list.page').then(m => m.InventoryListPage),
      },
      {
        path: 'add-item',
        loadComponent: () => import('../add-item/add-item.page').then(m => m.AddItemPage),
      },
      {
        path: 'edit-delete',
        loadComponent: () => import('../edit-delete/edit-delete.page').then(m => m.EditDeletePage),
      },
      {
        path: 'privacy',
        loadComponent: () => import('../privacy/privacy.page').then(m => m.PrivacyPage),
      },
      {
        path: '',
        redirectTo: '/tabs/inventory-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/inventory-list',
    pathMatch: 'full',
  },
];