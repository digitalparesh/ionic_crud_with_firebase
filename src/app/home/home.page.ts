import { Component } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  private itemsCollection: AngularFirestoreCollection;
  item;
  itemArr = [];
  constructor(
    private afs: AngularFirestore,
    public alertController: AlertController
  ) {
    // this.itemsCollection = afs.collection("item");
    // this.itemsCollection.valueChanges().subscribe((item) => {
    //   this.itemArr = item;
    // });
    this.itemsCollection.snapshotChanges().subscribe((data) => {
      data.map((item) => {
        console.log({ [item.payload.doc.id]: item.payload.doc.data() });
      });
    });
    this.afs
      .collection("item")
      .doc("itemdoc")
      .valueChanges()
      .subscribe((item) => {
        this.itemArr = item["value"];
        // console.log(item);
      });
  }

  addData() {
    // console.log(this.item.value);
    // // this.afs.collection("item").doc("Hello").update(this.item);
    // this.afs.collection("item").add(this.item);
  }

  deleteItem(id) {}

  updateItem(id) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Update Item",
      subHeader: "",
      inputs: [
        {
          name: "item",
          type: "text",

          placeholder: "update item",
        },
      ],
      message: "This is an alert message.",
      buttons: ["Update"],
      mode: "ios",
    });

    await alert.present();
  }
}
