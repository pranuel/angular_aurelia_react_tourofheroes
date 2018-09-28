import { autoinject } from 'aurelia-dependency-injection';
import { MessageService } from 'tour-of-heroes-shared';

@autoinject
export class MessagesComponent {

  constructor(public messageService: MessageService) {}

}
