import { Component } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  private itemsCollection: AngularFirestoreCollection;
  item = {
    value: "",
  };
  item$: Observable<any[]>;
  constructor(private afs: AngularFirestore) {
    this.item$ = afs
      .collection("item")
      .snapshotChanges()
      .pipe(
        map((data) =>
          data.map((item: any) => {
            const itemdata = item.payload.doc.data();
            const id = item.payload.doc.id;
            return { id, ...itemdata };
          })
        )
      );

    this.item$.subscribe((data) => {
      console.log(data);
      data.map((item) => {
        console.log(item.id);
      });
    });
  }

  addItem() {
    this.afs.collection("item").add(this.item);
  }

  deleteItem(id) {
    this.afs.collection("item").doc(id).delete();
  }

  updateItem(id, value) {
    console.log(value);

    this.afs.collection("item").doc(id).update({
      value: value,
    });
  }
}
