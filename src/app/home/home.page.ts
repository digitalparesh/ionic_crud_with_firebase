import { Component } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";

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
  itemArr = [];
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection("item");
    this.itemsCollection.valueChanges().subscribe((item) => {
      // this.itemArr = item;
      // console.log(this.itemArr);
    });
    this.itemsCollection.snapshotChanges().subscribe((data) => {
      data.map((item) => {
        console.log({ [item.payload.doc.id]: item.payload.doc.data() });
      });
    });
  }

  addData() {
    console.log(this.item.value);
    // this.afs.collection("item").doc("Hello").update(this.item);
    this.afs.collection("item").add(this.item);
    this.item.value = "";
  }

  deleteItem(id) {
    this.afs.collection("item").doc(id).delete();
  }
}
