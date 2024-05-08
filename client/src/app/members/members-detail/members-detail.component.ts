import { Component, OnInit, inject } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { map, startWith } from 'rxjs';


@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrl: './members-detail.component.scss'
})
export class MembersDetailComponent {
  private readonly membersService = inject(MembersService);
  private readonly route = inject(ActivatedRoute);
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

  images$ = this.member$.pipe(
    map(member => member.photos?.map(photo => {
      return {
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      } as NgxGalleryImage
    })
    )
  )
}
