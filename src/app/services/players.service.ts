import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Player } from '../commons/interfaces/player.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private readonly firestore: Firestore) {}
  /**
   * Add a new player to the database
   * @param player Player
   * @returns Promise<>
   */
  addPlayer(player: Player) {
    const playerRef = collection(this.firestore, 'players');
    return addDoc(playerRef, player);
  }
  /**
   * Get all players or one player from the database
   * @param filter string
   * @returns Observable<Player[]>
   */
  getPlayer(filter = '') {
    const playerRef = collection(this.firestore, 'players');
    let q = query(playerRef);
    if (filter) {
      q = query(playerRef, where('name', '==', filter));
    }
    return collectionData(q);
  }
}
