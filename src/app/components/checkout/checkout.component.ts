import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
	public chain_image = '/assets/images/rose-chain.png';
	public params;
  public totalPrice = 0;
  constructor(private route: ActivatedRoute) {
  	this.params = JSON.parse(this.route.snapshot.params.queryParams);
  	this.params =  _.orderBy(this.params, ['position'],['asc']);
    console.log(this.route.snapshot.params.chain_image);
    this.chain_image = this.route.snapshot.params.chain_image;
    this.totalPrice = 0;

    for(let i=0; i<this.params.length; i++){
        this.totalPrice = this.totalPrice + Number(this.params[i].price);
    }
  }

  ngOnInit() {
  }

}
