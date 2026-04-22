import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: false
})
export class PrivacyPage {

  privacyTopics = [
    {
      title: 'Data Collection',
      content: 'Our app collects only the minimum data necessary for inventory management functionality. This includes item details, quantities, and supplier information. We do not collect personal user data beyond what is required for the application to function.',
      icon: 'database-outline'
    },
    {
      title: 'Data Storage',
      content: 'Inventory data is stored securely on remote servers. Each item must have a unique name, and special notes are optional to protect sensitive business information from unnecessary exposure.',
      icon: 'server-outline'
    },
    {
      title: 'API Security',
      content: 'All communications with our RESTful API use standard web protocols. The API endpoint is secured and only accepts properly formatted JSON data. DELETE operations for critical items like "Laptop" are restricted to prevent accidental data loss.',
      icon: 'shield-outline'
    },
    {
      title: 'User Authentication',
      content: 'While this app does not implement user authentication, in a production environment, strong authentication mechanisms such as OAuth 2.0 or JWT tokens should be implemented to ensure only authorized users can access and modify inventory data.',
      icon: 'lock-closed-outline'
    },
    {
      title: 'Input Validation',
      content: 'All user inputs are validated both on the client-side (within the Ionic app) and server-side. This includes validating text fields for names, numeric-only validation for quantities and prices, and enum validation for categories and stock statuses.',
      icon: 'checkmark-circle-outline'
    },
    {
      title: 'Privacy Best Practices',
      content: 'Mobile applications should minimize data collection, provide clear privacy policies, allow users to understand what data is being stored, and implement secure data transmission protocols.',
      icon: 'eye-off-outline'
    }
  ];

  securityRequirements = [
    'Implement HTTPS for all network communications',
    'Use input validation to prevent injection attacks',
    'Store sensitive data securely using device keychain/storage',
    'Implement proper session management',
    'Regular security updates and patches',
    'Data encryption at rest and in transit',
    'Access controls and user permissions',
    'Audit logging for sensitive operations'
  ];

  constructor() {}
}
