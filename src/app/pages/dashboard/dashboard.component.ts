import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
name:string;
price:number;
status:string;
description:string;
prd;
id;
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.getProducts();
    this.resetForm();
  }
createProduct(){
  let data={
    name:this.name,
    price:this.price,
    status:this.status,
    description:this.description
  }
  this.api.createProduct(data).then(res=>{
    console.log("product created");
    this.resetForm();
  })
}
getProducts(){

  this.api.getAllProducts().pipe(map(list => list.map(item => {
    let data = item.payload.doc.data();
    let id = item.payload.doc.id;
    return { id, ...data };
  }))).subscribe(res => {
    this.prd = res;
    console.log(res);
  })
 
}
onClick(item){
  this.name=item.name;
  this.price=item.price;
  this.status=item.status;
  this.description=item.description;
  this.id=item.id;
}
updateProduct(){
  let data={
    name:this.name,
    price:this.price,
    status:this.status,
    description:this.description
  }
  let id=this.id;
  this.api.updateProduct(id,data).then(res=>{
    console.log("updated");
    this.resetForm();
  })
}
deleteProduct(){
  let id=this.id;
  this.api.deleteProduct(id).then(res=>{
    console.log("deleted");
    this.resetForm();
  })
}
resetForm(){
  this.name='';
  this.price=0;
  this.status='';
  this.description='';
}
}
