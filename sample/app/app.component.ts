import { Component } from '@angular/core';
import { TaggerService } from '@sedeh/tagger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tagger';
  events: any[] = [];

  myAudioUrl="https://google.github.io/tacotron/publications/tacotron2/demos/gan_or_vae.wav";
  myVideoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
  myImageUrl="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?h=350&auto=compress&cs=tinysrgb";

  constructor(private taggerService: TaggerService) {

  }

  itemTagUpdate(event: any) {
    if (event.taggedItem) {
      const list = this.taggerService.getTaggedItems(event.tagger);
      event['items'] = list;
      this.events.push(event);
    } else {
      const list = this.taggerService.getTaggedItems(event);
      this.events.push({eventId: event, items: list});
    }
  }
}
