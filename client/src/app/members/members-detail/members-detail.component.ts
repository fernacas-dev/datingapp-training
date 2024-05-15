import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { map } from 'rxjs';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrl: './members-detail.component.scss'
})
export class MembersDetailComponent implements OnInit {

  private readonly membersService = inject(MembersService);
  private readonly route = inject(ActivatedRoute);
  private readonly messageService = inject(MessageService);

  @ViewChild('memberTabs', { static: true }) memberTabs!: TabsetComponent;
  activeTab!: TabDirective;

  messages: Message[] = [];

  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false,
    }
  ];

  member$ = this.membersService.getMember(this.route.snapshot.paramMap.get('username')!)
  member?: Member;

  images$ = this.member$.pipe(
    map(member => member.photos?.map(photo => {
      return {
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      } as NgxGalleryImage
    })
    ));

  loadMessages() {
    if (this.member?.username) {
      this.messageService.getMessageThread(this.member?.username)
        .subscribe(message => {
          this.messages = message;
        });
    }
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.loadMessages();
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.member = data.member;
    });

    this.route.queryParamMap.subscribe(params => {
      params.get('tab') ? this.selectTab(parseInt(params.get('tab')!)) : this.selectTab(0);
    });
  }
}
