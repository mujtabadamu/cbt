import styled from "styled-components";


/* -----------Header Styled------------- */
export const Head = styled.div`
    /* background:coral; */
    display:flex;
    align-items:center;
    justify-content:space-between;
    height:50px;
    color:#103979;

`
// Container styled Applied every where in the App 
export const Container = styled.div`
    width:90%;
    margin:auto; 
`;

// Landing Page Div container 
export const LandDiv = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:center ;
    height:90vh;
    h2{
        text-align:center;
    }
    ol{
        list-style:none;
        width:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
    }
    ol li{
        margin:7px auto;
        /* background: red; */
        width:40%;
        display:flex;
        align-items:center ;
        justify-content:center ;
    }
    ol li a{
        text-decoration:none;
        width: 100%;
        display:flex;
        align-items:center ;
        justify-content:center ;
        text-align:center;
        padding:5px;
        border-radius:5px;
    }
    .login{
        background:#103979;
        color:#7DF4D1;
        border:1px solid #103979;
    }
    .reg{
        border:1px solid #103979;
        color:#103979;
    }
`

export const Logo = styled.img`
    width:330px;
    /* height:auto; */
`

export const Input = styled.input`
    width: 100%;
    margin:10px 0px 30px auto;
    padding:10px 0px;
    font-size: 0.8rem; 
    transition:.4s;
    border:1px solid;
    border-left:none;
    border-top:none;  
    border-right:none ;
    border-bottom:1px solid;
    outline:none ;
    background:none;
     :focus{
        background:none ;
    }
    /* ------- DEKTOP VIEW --------*/
    @media screen and (min-width:600px){
        font-size: 1rem; 
        padding:10px 0px;
    } 
`;


export const InputForm = styled.input`
    width: 100%;
    margin:5px auto;
    padding:5px;
    font-size: 0.8rem; 
    transition:.4s;
    border-radius:2px;
    border:1px solid;
    border-left:none;
    border-top:none;  
    border-right:none ;
    border-bottom:1px solid;
    box-shadow:1px 1px 1px 1px lightgrey;
    outline:none ;
    background:none;
    cursor: pointer;
    
     :focus{
        background:none ;
    }
    /* ------- DEKTOP VIEW --------*/
    @media screen and (min-width:600px){
        font-size: 1rem; 
        padding:5px;
    } 
`
export const TextForm = styled.textarea`
  width: 100%;
  height: 70px;
  border: none;
  background:none;
  padding:5px ;
  border:1px solid #103979;
  box-shadow:1px 1px 1px 1px lightgrey;

`
export const InputQue = styled.input`
    width: 90%;
    margin:5px 8px 10px 0px;
    padding:5px;
    font-size: 0.8rem; 
    transition:.4s;
    border-radius:4px;
    /* border-left:none; */
    /* border-top:none;   */
    /* border-right:none ; */
    border:1px solid #103979;
    /* box-shadow:1px 1px 1px 1px lightgrey; */
    outline:none ;
    background:none;
    cursor: pointer;
    
     :focus{
        background:none ;
    }
    /* ------- DEKTOP VIEW --------*/
    @media screen and (min-width:600px){
        font-size: 1rem; 
        padding:5px;
    } 
`


export const Button = styled.button`
    background:#103979;
    width:100%;
    padding: 10px;
    border:none;
    color: #7DF4D1;
    border-radius:5px;
    font-weight:bold;
    cursor: pointer;

     /* ------- DEKTOP VIEW --------*/
     @media screen and (min-width:600px){
        font-size: 1rem; 
        padding: 10px;
    } 

`;

export const FlexDiv = styled.div`
    display:flex;
    flex-direction:column;
    margin:20px auto;
    position: relative;

    form{
        margin:20px auto;
        background:#fff;
        height:auto;
        padding:20px;
        border-radius:6px;
    }
    form h2{
        margin:30px 0px;
        color:#103979;
    }
    form a{
        display:block;
        margin-top: 50px;
        text-align:center;
    }
       /* ------- DEKTOP VIEW --------*/
       @media screen and (min-width:600px){
        width:500px;
    }
    select {
        /* background:red; */
        width:100%;
        margin:5px auto;
        padding: 10px;
    }
`;

export const DivError = styled.div`
    .error{
        display: block;
        margin-top:-14px;
        font-size:12px;

        @media screen and (min-width: 660px){
            font-size:17px;
        }
    }
`;

export const IconFiled = styled.span`
    position:absolute ;
    right:10px;
    margin-top:12px;  
`;
export const DashBoard = styled.div`
    /* background: red; */

    ul{
       display:flex;
       justify-content:space-around;
       /* background:#fff; */
    }
    li{
        list-style:none;
        width:33%;
        text-align:center;
    }
    li a{
        text-decoration:none;
        color: #a1d2f8;
        /* background:coral; */
        width:100%;
        display:block;
        padding:11px;
        font-weight:bold;
        border-bottom:2px solid ;
        border-radius:3px;
      }
    li a:hover{
        /* background:#fff; */
        color:#103979;
    }

    .headContent{
        background:#fff;
        display:flex;
        justify-content:space-between ;
        align-items:center;
        padding:20px;
        position:relative;
        height:180px;
        border-radius:5px ;
    }
    .headContent .newExamBtn{
        position: absolute;
        right:0;
        bottom:-20px;
        background:#103979;
        color:#7DF4D1;
        padding:10px;
        text-decoration:none;
        border-radius:5px;
    }
`;

export const Scheduled = styled.div`
    .scheduledHead{
        margin:20px auto;
    }

    .scheduledBody{
        display:flex;
        justify-content:space-between;
        flex-wrap: wrap;
    }
    .scheduledBody div{
        /* border:1px solid; */
        margin:5px 0px;
    }
   .scheduledBody button{
    background:none;
    width:100%;
    /* border:; */
    /* background:#e05c5c; */
    /* background:#103979 ; */
    color:#103979;
    font-weight:bold;
    cursor: pointer;
    padding:4px;
    border-radius:3px;
}
`;

export const Exam = styled.div`
  

    a{
    text-decoration:none ;
    color:#000;
    background:#fff;
    height:130px;
    display:flex;
    flex-direction: column;
    width:300px;
    justify-content:space-around;
    border-radius:5px;
    padding:13px;
    line-height:23px;
    position:relative ;
    font-size:14px ;
    };
   p:first-child{
    display:flex;
    justify-content:space-between;
    color:#103979 ;
   }   
   p:nth-child(2){
    color:#40793B;
    background:#D2F8DE;
    padding:0px 5px;
    border-radius:100px;
    display:flex ;
    justify-content:center;
    align-self:flex-end;
   }
   p:nth-child(3){
    color:#B9311B;
    background:#F7D3D4;
    padding:0px 5px;
    bottom:27px ;
    border-radius:100px;
    /* width:50%; */
    display:flex ;
    justify-content:center;
    align-self:flex-start;
    position:absolute;
   }
   p:nth-child(4){
    color:#103979;
    background:#E0D4FE;
    padding:0px 5px;
    display:flex ;
    justify-content:center;
    align-self:flex-end;
    border-radius:100px;
    /* width:130px; */
   }

   
`
export const ExamDetails = styled.div`
    p{
        margin:8px 0px;
    }
    
    header{
        display:flex;
        background:#fff;
        justify-content:space-between;
        align-items:center;
        padding:0px 30px ;
        height:120px;
        border:4px;
        .exam-info{
            /* background:red; */
            display:flex;
            flex-direction:column;
            justify-content:space-around;
            height:100%;
        }
        button{
            width:100px;
            margin:4px;
            border:none;
            height:50px;
            background:none;
        }
        button:hover{
            cursor: pointer;
            background:#d3d3d333 ;
        }
        .add{
            color:#103979;
        }
        .edit{
            color:#000;
        }
        .delete{
            color:red;
        }
    }

    main{
        background:#fff;
        padding:0px 30px ;
        height:160px;
        border:4px;
        border-radius:4px;
        margin:8px 0px;
        display:flex;
        flex-direction:column;
        line-height:28px;
        p:first-child{
            text-transform:uppercase;
        }
        p{
            margin:5px 0px ;
        }
    }

`

