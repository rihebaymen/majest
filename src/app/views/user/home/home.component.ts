import { Component, OnDestroy , OnInit, signal} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyModalComponent } from '../../../modal/user/add-company-modal/add-company-modal.component';
import { CompanyService } from '../../../services/user/company/company.service';
import { EMPTY, Subscription, Observable } from 'rxjs';
import { Article } from '../../../models/admin/Article';
import { ArticleService } from '../../../services/admin/article.service';
import { Company } from '../../../models/user/company';
import { Router } from '@angular/router';
import { Position } from '@cloudinary/url-gen/qualifiers';
import { ClientService } from '../../../services/admin/client.service';
import { ProviderService } from '../../../services/admin/provider.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy, OnInit{

  s! :Subscription
  has_company = false
  article$ : Observable<Article[]> = EMPTY
  company$ : Observable<Company[]> = EMPTY
  sig = signal(1)
  constructor(public dialog: MatDialog, private companyService : CompanyService, private articleService : ArticleService,
     private router : Router, private providerService : ProviderService, private clientService : ClientService){

  }

  ngOnInit(): void {
    this.sig.update(value => value+2)
    console.log(this.sig())
    this.check()
    this.getRandomArticleWithRandomCompany()
    this.getAllCompany()
    this.providerService.getMyProviderid()
    this.clientService.getMyClientId()
    this.companyService.getMyCompanyId()
  }

 

  openDialog() {
    let type = "add"
    const dialogRef = this.dialog.open(AddCompanyModalComponent,
      {
        data : {type},
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  getRandomArticleWithRandomCompany(){
    this.article$ = this.articleService.getRandomArticleWithRandomCompany()
  }
  check(){
    this.s= this.companyService.checkCompany().subscribe(x =>{
      if(x){

        this.has_company = x
        localStorage.setItem('has_company',x)
      }
    })
  }

  getCompanyById(){
    this.companyService.getCompanyById(1).subscribe(data=>console.log(data))
  }

  getAllCompany(){
   this.company$ =  this.companyService.getAllCompany()
  }

  toCompanyPage($event:any){
    this.router.navigate(['/user/company/'+$event.target.value])
    console.log($event.target.value)
  }
  ngOnDestroy(): void {
    if(this.s){
      this.s.unsubscribe()
    }
  }
}
