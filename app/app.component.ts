import { Component, OnInit } from '@angular/core';
import { Observable, catchError, flatMap, forkJoin, from, map, mergeAll, mergeMap, of, switchMap } from 'rxjs';
import { IPerson } from './Interfaces/person/IPerson';
import { MyserviceService } from './services/myservice.service';
import { response } from 'express';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'observable-demo';
  public details:IPerson[]=[];

  constructor(private employeeService:MyserviceService){}

  ngOnInit(): void {
    
    this.fetchDetails()
    .pipe(
      mergeMap(persons => this.updateSalaries(persons)) 
    )
    .subscribe({
      next:(updatedPersons) => {
        this.details = updatedPersons;
      },
      error:(error) => {
        console.log(error);
      }
    });

    /**
     * Second Approach
     */

    // this.fetchDetails().subscribe({
    //   next:(persons)=>{
    //     console.log("Person Details before Update");
    //     persons.forEach(person => {
    //       console.log(`${person.name} / ${person.email} / ${person.employment.salary}`);
    //     })
    //     this.updateSalaries(persons);
    //   },
    //   error:(error)=>{
    //     console.log(error);
    //   }
    // })
    

  }

  public fetchDetails(): Observable<IPerson[]>{
    return this.employeeService.fetchDetails();
  }

  private updateSalaries(persons: IPerson[]): Observable<IPerson[]>{
    const updateSalaryObservables = persons.map(person => 
      this.employeeService.updateSalary(person.id).pipe(
        map(newSalary => {
          person.employment.salary = newSalary;
          console.log(`${person.name} / ${person.email} / ${person.employment.salary}`);
          return person;
        })
      )
    );

    return forkJoin(updateSalaryObservables);
  }

 
   /**
     * Second Approach using forEach
     */


  // private updateSalaries(persons: IPerson[]):void{
  //   console.log("Person Details After update");
  //   persons.forEach((person,index) => {
  //     this.employeeService.updateSalary(person.id).subscribe({
  //       next:(newSalary)=>{
  //         persons[index].employment.salary = newSalary;
          
  //         if(index === persons.length-1){
  //           this.details = persons;
  //         }
          
  //         console.log(`${person.name} / ${person.email} / ${person.employment.salary}`);
  //       },
  //       error:(error)=>{
  //         console.log(error);
  //       }
  //     });
  //   });
  // }



  // this.fetchDetails().subscribe({
    //   next:(persons)=>{
    //     console.log("Person Details before Update");
    //     persons.forEach(person => {
    //       console.log(`${person.name} / ${person.email} / ${person.employment.salary}`);
    //     })
    //     this.updateSalaries(persons);
    //   },
    //   error:(error)=>{
    //     console.log(error);
    //   }
    // })

  

}
