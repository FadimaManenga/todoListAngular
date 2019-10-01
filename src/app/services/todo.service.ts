import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/Fire/Database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  toDoList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) { }

  // méthode CRUD
  // Création de ttes les fonctionnalités nécessaire à la gestion des tâches, lié à la BDD firebase :


// récup de tâches depuis la BDD : méthode get()
  getToDolist() {
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;
  }

  // insertion de tâche dans la BDD : méthode add()
  addTitle(title: string) {
    this.toDoList.push ({
      title: title,
      isChecked: false
    });
  }

  // MAJ des tâche par la validation : méthode update()
  checkOrUnCheckTitle($key: string, flag:boolean) {
    this.toDoList.update($key, { isChecked:flag });
  }
  

  // suppression de tâche : méthode remove()
  removeTitle($key: string) {
    this.toDoList.remove($key);
  }

}


