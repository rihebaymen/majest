import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AdminComponent } from '../../../../modal/admin/admin/admin.component';
import { Invoice } from '../../../../models/admin/invoice';
import { InvoiceService } from '../../../../services/admin/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoices$!:Observable<Invoice[]>
  invoices!:Observable<Invoice[]>
  me = false
  provider = true
  constructor(private dialog : MatDialog, private invoiceService: InvoiceService){
   
  }

  ngOnInit(): void {
    this.getAllInvoices()
    this.getAllMyInvoicesAsProvider()
  }
  
  getAllInvoices(){
    this.invoices$ = this.invoiceService.getAllInvoices()
    this.me = false
    this.invoices$.subscribe(data =>console.log(data))
  
  }

  getAllMyInvoice(){
    this.provider = true
    this.ngOnInit()
  }
  getAllMyInvoicesAsProvider(){
    this.invoices = this.invoiceService.getAllInvoiceAsProvider()
  }
  openInvoiceModal(invoice : Invoice|null){
    let type = 'invoice'
    const dialogRef = this.dialog.open(AdminComponent,
      {
        data: { invoice, type },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
     dialogRef.afterClosed().subscribe(result => {
      if (result !== "undefined") {
        this.getAllInvoices()
      }
     });
  }

  getInvoiceAsClient(){
    this.provider = false
    this.invoices = this.invoiceService.getInvoiceAClient()
    console.log("clicked"+this.invoices$)

  }

  updateInvoiceServer(invoice : Invoice){
    this.invoiceService.update = true
    console.log(invoice.id)
    this.openInvoiceModal(invoice)
  }

   deleteInvoiceServer( name: number, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
       this.invoiceService.deleteInvoice(id).subscribe(data =>{
         this.getAllInvoices()

       })
    }

  }



}
