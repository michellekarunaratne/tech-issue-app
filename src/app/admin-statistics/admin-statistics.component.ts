import { Component, OnInit } from '@angular/core';
import { StoreStatusService} from '../store-status.service';
import { AdminService } from '../admin.service';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import Complaint from '../complaint';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.scss']
})
export class AdminStatisticsComponent implements OnInit {

  constructor(
    public storeStatusService:StoreStatusService,
    public adminService:AdminService
  ) { }

  date;
  public years=[]
  public currentYear=new FormControl('',Validators.required);
  allocatedComplaintsArray
  unallocatedComplaintsArray
  newData=false
  public allocatedComplaintsCount=[0,0,0,0,0,0,0,0,0,0,0,0];
  public unallocatedComplaintsCount=[0,0,0,0,0,0,0,0,0,0,0,0];
  public createdReportCount=[0,0,0,0,0,0,0,0,0,0,0,0];
  
  
  public createYears(yearsArray : number[])
  {
    for (let i = 2019-10; i < 2030; i++) {
     yearsArray.push(i)
    }
    return yearsArray
  }

  public countAllocatedComplaints(allocatedComplaintsArray:Array<Complaint>,allocatedComplaintCount:Array<number>)
  {
    allocatedComplaintCount=[0,0,0,0,0,0,0,0,0,0,0,0]
    if(allocatedComplaintsArray.length>0)
    {
      for(let i=0;i<allocatedComplaintsArray.length;i++)
        {
          allocatedComplaintCount[parseInt(allocatedComplaintsArray[i].dateSep.month)-1]+=1;
        }
        this.chartDatasetsComplaint[0]={data:allocatedComplaintCount,label:'Allocated Complaints'}
        this.chartDatasetsReport[1]={data:allocatedComplaintCount,label:'Allocated Complaints'}
    }
    else
    {
     
      this.chartDatasetsComplaint[0]={data:[0,0,0,0,0,0,0,0,0,0,0,0],label:'Allocated Complaints'}
      this.chartDatasetsReport[1]={data:[0,0,0,0,0,0,0,0,0,0,0,0],label:'Allocated Complaints'}
    }
     
  }

  public countUnallocatedComplaints(unallocatedComplaintsArray:Array<Complaint>,unallocatedComplaintCount:Array<number>)
  {
    unallocatedComplaintCount=[0,0,0,0,0,0,0,0,0,0,0,0]
    if(unallocatedComplaintsArray.length>0)
    {
      for(let i=0;i<unallocatedComplaintsArray.length;i++)
      {
        unallocatedComplaintCount[parseInt(unallocatedComplaintsArray[i].dateSep.month)-1]+=1;

      }
      this.chartDatasetsComplaint[1]={data:unallocatedComplaintCount,label:'Unallocated Complaints'}
    }
    else
    {
      this.chartDatasetsComplaint[1]={data:[0,0,0,0,0,0,0,0,0,0,0,0],label:'Unallocated Complaints'}
    }
     

  }

  public countCreatedReport(allocatedComplaintsArray:Array<Complaint>,reportCount:Array<number>)
  {
    reportCount=[0,0,0,0,0,0,0,0,0,0,0,0]
    if(allocatedComplaintsArray.length>0)
    {
      for(let i=0;i<allocatedComplaintsArray.length;i++)
        {
          if(allocatedComplaintsArray[i].report)
          {
            reportCount[parseInt(allocatedComplaintsArray[i].dateSep.month)-1]+=1;
          }
          this.chartDatasetsReport[0]={data:reportCount,label:'Created Reports'}
        }
    }
    else
    {
      this.chartDatasetsReport[0]={data:[0,0,0,0,0,0,0,0,0,0,0,0],label:'Created Reports'}
    }

    
    this.newData=true

  }
     
  

  ngOnInit() {

    this.date = moment(new Date()).format('YYYY');
    this.currentYear.setValue(this.date)
    this.storeStatusService.setLoginStatus()
    this.years=this.createYears(this.years)
    this.adminService.getUnallocatedComplaintsByYear(this.currentYear.value)
    .subscribe(unallocatedComplaints=>{
      this.unallocatedComplaintsArray=unallocatedComplaints;
      this.countUnallocatedComplaints(this.unallocatedComplaintsArray,this.unallocatedComplaintsCount)
    })
    this.adminService.getAllocatedComplaintsByYear(this.currentYear.value)
    .subscribe(allocatedComplaints=>{
      this.allocatedComplaintsArray=allocatedComplaints;
      this.countAllocatedComplaints(this.allocatedComplaintsArray,this.allocatedComplaintsCount)
      this.countCreatedReport(this.allocatedComplaintsArray,this.createdReportCount)
    }) 
  }

  onSubmit()
  {

   this.newData=false;

   //this.chartDatasetsComplaint=[{data:[1,1,1,1,1,1,0,0,0,0,0,0],label:'Allocated complaint'}]

    this.adminService.getUnallocatedComplaintsByYear(this.currentYear.value)
    .subscribe(unallocatedComplaints=>{
      this.unallocatedComplaintsArray=unallocatedComplaints;
      this.countUnallocatedComplaints(this.unallocatedComplaintsArray,this.unallocatedComplaintsCount)
    })

    this.adminService.getAllocatedComplaintsByYear(this.currentYear.value)
    .subscribe(allocatedComplaints=>{
      this.allocatedComplaintsArray=allocatedComplaints;
      this.countAllocatedComplaints(this.allocatedComplaintsArray,this.allocatedComplaintsCount)
      this.countCreatedReport(this.allocatedComplaintsArray,this.createdReportCount)
    })
  
  }

  public chartTypeComplaint: string = 'bar';
  
  public chartDatasetsComplaint: Array<any> = [
    { data: this.allocatedComplaintsCount, label: 'Allocated Complaints' },
    { data: this.unallocatedComplaintsCount, label: 'Unallocated Complaints' },
  ];

  public chartLabelsComplaint: Array<any> = ['Jan', 'Feb', 'Mar','Apr','May', 'Jun', 'July','Aug','Sep','Oct','Nov','Dec'];

  public chartColorsComplaint: Array<any> = [
    {
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)'

      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 2,

  }
  ,
  {
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)'

    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)'
    ],
    borderWidth: 2,

}

];

  public chartOptionsComplaint: any = {
    responsive: true
  };

  public chartTypeReport: string = 'bar';

  public chartDatasetsReport: Array<any> = [
    { data: this.createdReportCount, label: 'Created Reports' },
    { data: this.allocatedComplaintsCount, label: 'Allocated Complaints' },
  ];

  public chartLabelsReport: Array<any> = ['Jan', 'Feb', 'Mar','Apr','May', 'Jun', 'July','Aug','Sep','Oct','Nov','Dec'];

  public chartColorsReport: Array<any> = [
    {
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',

      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 2,

  }
  ,
  {
    backgroundColor: [
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)'

    ],
    borderColor: [
      'rgba(255, 206, 86, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 206, 86, 1)'
    ],
    borderWidth: 2,

}

];

  public chartOptionsReport: any = {
    responsive: true
  };  
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
