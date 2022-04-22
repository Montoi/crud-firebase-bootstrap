import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private firestore: AngularFirestore) {}

  createEmployee(employee: any): Promise<any>{
    return this.firestore.collection('employees').add(employee);
  }

  getEmployees():Observable<any>{
    return this.firestore.collection('employees', ref => ref.orderBy('creationDate', 'asc')).snapshotChanges();
  }

  deleteEmployee(id: string){
    return this.firestore.collection('employees').doc(id).delete()
  }

  getEmployee(id:string): Observable<any>{
    return this.firestore.collection('employees').doc(id).snapshotChanges();
  }

  updateEmployee(id:string, data:any): Promise<any>{
    return this.firestore.collection('employees').doc(id).update(data);
  }
}
