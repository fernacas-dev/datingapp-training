import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { map, take } from 'rxjs';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { Member } from '../../_models/member';
import { PresenceService } from '../../_services/presence.service';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrl: './members-detail.component.scss'
})
export class MembersDetailComponent implements OnInit, OnDestroy {

  private readonly membersService = inject(MembersService);
  private readonly route = inject(ActivatedRoute);
  private readonly messageService = inject(MessageService);
  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);
  public presence = inject(PresenceService);

  user?: User;

  @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
  activeTab!: TabDirective;

  messages: Message[] = [];

  constructor() {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user!;
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

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
    if (this.memberTabs) {
      this.memberTabs!.tabs[tabId].active = true;
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.messageService.createHubConnection(this.user!, this.member?.username!);
    } else {
      this.messageService.stopHubConnection();
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

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}
