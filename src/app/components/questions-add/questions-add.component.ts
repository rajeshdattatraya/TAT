import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-questions-add',
  templateUrl: './questions-add.component.html',
  styleUrls: ['./questions-add.component.css']
})
export class QuestionsAddComponent implements OnInit {
  submitted = false;
  questionForm: FormGroup;
  userName: String = "admin";
  Skills:any = ['Java','Microservices','NodeJS','Angular','MongoDB'];
  Complexities:any = ['Complex', 'Medium', 'Simple'];
  QuestionTypes:any = ['SingleSelect','MultipleSelect'];
  

  constructor(public fb: FormBuilder,
                  private router: Router,
                  private ngZone: NgZone,
                  private apiService: ApiService) { this.mainForm();}

  ngOnInit() { }

  mainForm() {
      this.questionForm = this.fb.group({
        complexity: ['', [Validators.required]],
        skill: ['', [Validators.required]],
        questionType: ['', [Validators.required]],
        question: ['', [Validators.required]],
        option1: ['', [Validators.required]],
        option2: ['', [Validators.required]],
        option3: ['', [Validators.required]],
        option4: ['', [Validators.required]],
        option1checkbox:[],
        option2checkbox:[],
        option3checkbox:[],
        option4checkbox:[],
        answerID:[]
        
      })
    }

    // Getter to access form control
      get myForm(){
        return this.questionForm.controls;
      }
  // Choose skill with select dropdown
    updateSkills(e){
      this.questionForm.get('skill').setValue(e, {
      onlySelf: true
      })
    }

    // Choose QuestionType with select dropdown
    updateQuestionTypes(e){
      this.questionForm.get('questionType').setValue(e, {
      onlySelf: true
      })
    }

    // Choose complexity with select dropdown
    updateComplexity(e){
      this.questionForm.get('complexity').setValue(e, {
      onlySelf: true
      })
    }

    onSubmit() {
      console.log('Question add ts file');
        this.submitted = true;
        if (!this.questionForm.valid) {
          console.log('error part');
          return false;
        } else {      
          if(this.questionForm.value.option1checkbox){
          this.questionForm.value.answerID="1";}
          if(this.questionForm.value.option2checkbox){
            this.questionForm.value.answerID=this.questionForm.value.answerID+",2";}
            if(this.questionForm.value.option3checkbox){
              this.questionForm.value.answerID=this.questionForm.value.answerID+",3";}
              if(this.questionForm.value.option4checkbox){
                this.questionForm.value.answerID=this.questionForm.value.answerID+",4";}

          this.apiService.createQuestion(this.questionForm.value).subscribe(
            (res) => {
              console.log('Question successfully created!')
              this.ngZone.run(() => this.router.navigateByUrl('/candidates-list'))
            }, (error) => {
              console.log(error);
            });
        }
      }

}
