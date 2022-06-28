import React, { Fragment } from 'react'


function QuestionList({questions, setQuestions}) {

  function handleDelete({id}){
    setQuestions(questions.filter((q)=> q.id !== id));
} 

function handleUpdate(question, updateQuestion) {
  // here we are mapping over the todos array - the idea is check if the todo.id matches the id we pass into the function
  // if the id's match, use the second parameter to pass in the updated todo object
  // otherwise just use old todo
  const updatedItem = question.map((todo) => {
    return todo.id === question.id ? updateQuestion : question;
  });
  // set editing to false because this function will be used inside a onSubmit function - which means the data was submited and we are no longer editing
  // setIsEditing(false);
  // update the todos state with the updated todo
  setQuestions(updatedItem);
}



 

return (
    <div className='list_of_ques'>

    <h3>Questions {questions.length}</h3>
   
    
    <table border='1px'>
      <thead>
        <tr>
        <th>S/N</th>
          <th>Questions</th>
          <th>Answer</th>
          <th>Point</th>
          <th>options</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody> 

      {questions.map((question)=>{
        return <Fragment key={question.id}>
        <tr>
            <td>{question.id }</td>
            <td>{question.text}</td>
            <td>{question.answer}</td>
            <td>{question.point}</td>
            <td>{ `${question.options}` } </td>
            
            <td><button onClick={()=>{handleDelete(question)}}>Delete</button></td>
        </tr>
        </Fragment>
      })}
        
      </tbody> 

  </table>


  
    </div>  
  )
}

export default QuestionList