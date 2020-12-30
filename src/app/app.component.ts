import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

interface Food {
  value: string;

  price:number;

}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  selectedfood: string;
  selecteduser: string;
  selectedsearch:string;
  searchText:string;
  Quantity:number;
  today:any;
  order:any[]=[];
  price;
  total;
  table:any[] = [];
  constructor() {}
  // edit(product){
  //   var orderrv = JSON.parse(localStorage.getItem('order'));
  //   const removeitem = orderrv.findIndex(s => s.product === product);
  //   //if Productid matched remove taht particulat item from local-strg table
    
  //     localStorage.setItem('order', JSON.stringify(orderrv));
     
    
  //   console.log(orderrv);
  //   this.table = JSON.parse(localStorage.getItem('order'));
  // }
  delete(product){
    var orderrv = JSON.parse(localStorage.getItem('order'));
			const removeitem = orderrv.findIndex(s => s.product === product);
			//if Productid matched remove taht particulat item from local-strg table
				orderrv.splice(removeitem, 1);
        localStorage.setItem('order', JSON.stringify(orderrv));
      console.log(orderrv);
      this.table = JSON.parse(localStorage.getItem('order'));
      this.selected = this.table;
  }
add(){
  this.order = this.table;
  this.price = ( this.foods.filter(foods => foods.value === this.selectedfood));
  this.today = new Date().toLocaleString();
  this.price=this.price[0].price;
  this.total=this.price*this.Quantity;
  if(this.Quantity >= 3 && (this.selectedfood == 'pepsi' || this.selectedfood == 'cola')){
    this.total = this.total - (this.total * (20/100)) ;
  }
  this.order.push({'user':this.selecteduser,
    'product':this.selectedfood,
    'price':this.price,
    'quantity':this.Quantity ,
    'total':this.total,'date':this.today});
    localStorage.setItem('order',JSON.stringify( this.order));
    console.log(this.order);
}
searchfn(searchText)
{
  this.selected =  this.table.filter(table => table.user === searchText || table.product === searchText);
  if(searchText == null || searchText == undefined || searchText == ''){
    this.selected = this.table;
  }
  // console.log(this.table);

}
selected:any;
fn(value){
  if(value == "All time"){
    this.selected = this.table;
    console.log(this.selected);
  }
  else if(value == "Last 7 days"){
    var date = new Date().toLocaleString();
    var pastDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleString();
    this.selected = this.table.filter(table => table.date > pastDate);
    console.log(this.selected);
  }
  else if(value == "Today"){
    var d = new Date();
    d.setHours(0,0,0,0);
    var date = new Date().toLocaleDateString();
    console.log(date);
    this.selected = this.table.filter(table => table.date > date);
    console.log(this.selected);
  }
}
  ngOnInit(){
    this.selectedsearch = 'All time';
    this.table = JSON.parse( localStorage.getItem('order')) || [];
    this.selected = this.table;
    //Get today's date using the JavaScript Date object.
    var ourDate = new Date();
    //Change it so that it is 7 days in the past.
    var pastDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleString();
    //Log the date to our web console.
    console.log(ourDate);
}
 
  foods: Food[] = [
    {value: 'pepsi',price:200},
    {value: 'cola',price:120},
    {value: 'fanta',price:150}
  ];
  
  username = [
    { value : 'john' },
    {  value : 'mike' },
    {  value : 'peter' },
    {  value : 'nick' },
    { value : 'charls' },

  ];
  search = [
    { value : 'All time' },
    { value : 'Last 7 days' },
    { value : 'Today' },


  ];
}
