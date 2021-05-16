import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatRoomPageRoutingModule } from './chat-room-routing.module';
import { ChatRoomPage } from './chat-room.page';
import { AngularFirestore } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatRoomPageRoutingModule
  ],
  declarations: [ChatRoomPage],
  providers:[AngularFirestore]
})
export class ChatRoomPageModule {}




