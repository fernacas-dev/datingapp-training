import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Message } from '../../_models/message';
import { MembersService } from '../../_services/members.service';
import { MessageService } from '../../_services/message.service';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.scss'
})
export class MemberMessagesComponent implements OnInit {

  @ViewChild('messageForm') messageForm!: NgForm;
  @Input() messages: Message[] = [];
  @Input() username?: string;
  messageContent?: string;

  public readonly messageService = inject(MessageService);

  ngOnInit(): void {

  }

  sendMessage() {
    this.messageService.sendMessage(this.username!, this.messageContent!).then(() => {
      this.messageForm.reset();
    });
  }
}
