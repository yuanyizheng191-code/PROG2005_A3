import { Component, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-help-widget',
  templateUrl: './help-widget.component.html',
  styleUrls: ['./help-widget.component.scss'],
  standalone: false
})
export class HelpWidgetComponent {
  @Input() pageName: string = '';

  constructor(private alertController: AlertController) {}

  async showHelp() {
    const helpContent = this.getHelpContent();

    const alert = await this.alertController.create({
      header: `${this.pageName} Help`,
      message: helpContent,
      buttons: ['Got it']
    });
    await alert.present();
  }

  private getHelpContent(): string {
    const helpTexts: { [key: string]: string } = {
      'List': 'Use the search bar to find specific items by name. You can view all inventory items in the list below.',
      'Add': 'Fill in all required fields to add a new item. Featured items are displayed on this page.',
      'Manage': 'Search for an item by name to update or delete it. Note: The "Laptop" item cannot be deleted.',
      'Privacy': 'This page explains the privacy and security measures implemented in our application.'
    };
    return helpTexts[this.pageName] || 'No help available for this page.';
  }
}
