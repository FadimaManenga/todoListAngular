import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers:[TodoService] 
})
export class TodoComponent implements OnInit {

  // Création et initialisation du conteneur liste des tâches
  toDoListArray: any[];

  constructor(private toDoService: TodoService) { }

  ngOnInit() {

// soubscription au service ToDoService
this.toDoService.getToDolist().snapshotChanges()
.subscribe(item => {
  this.toDoListArray = [];
  item.forEach(element => {
    var x =  element.payload.toJSON();
    x["$key"] = element.key;
    this.toDoListArray.push(x);
  })

    // sort array isChecked false -> true
    this.toDoListArray.sort((a,b) => {
      return a.isChecked - b.isChecked;
      })
    });
  }

  // ajout de tâche
  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  // tâche validé
  alterCheck($key: string,isChecked){
    this.toDoService.checkOrUnCheckTitle($key,!isChecked);
  }

  // suppression de tâche
  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }
}
