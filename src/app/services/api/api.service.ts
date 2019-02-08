import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs:AngularFirestore) { }
  createProduct(data){
return this.afs.collection('products').add(data);
  }
  getSingleProduct(id){
return this.afs.doc('products/'+id).valueChanges();
  }
  getAllProducts(){
    return this.afs.collection('products').snapshotChanges();
  }
  updateProduct(id,data){
    return this.afs.doc('products/'+id).update(data);
  }
  deleteProduct(id){
    return this.afs.doc('products/'+id).delete();
  }
}
